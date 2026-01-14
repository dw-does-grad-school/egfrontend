"use client";

import Image from "next/image";
import { useMemo, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";

type QuizImage = {
  relativePath: string;
  embedding_index: number;
  rep_score: number;
  disc_score: number;
  quiz_weight: number;
};

type StyleBlock = { name: string; images: QuizImage[] };
type Manifest = { styles: StyleBlock[] };

type Level = "l1" | "l2" | "l3";

type PrefChoice = {
  q: number;
  left: { style: string; embedding_index: number; relativePath: string; quiz_weight: number };
  right: { style: string; embedding_index: number; relativePath: string; quiz_weight: number };
  picked: "left" | "right";
  ts: number;
};

const IMAGE_BASE = "/quiz_details/quiz_images";

const MOODS = [
  "Calm",
  "Curious",
  "Reflective",
  "Energized",
  "Joyful",
  "Melancholic",
  "Focused",
  "Dreamy",
] as const;

const COLORS = [
  { name: "Red", hex: "#D7263D" },
  { name: "Orange", hex: "#F46036" },
  { name: "Yellow", hex: "#F9C80E" },
  { name: "Lime", hex: "#A3D900" },
  { name: "Green", hex: "#2E8B57" },
  { name: "Teal", hex: "#1AA6B7" },
  { name: "Cyan", hex: "#2EC4B6" },
  { name: "Blue", hex: "#3A86FF" },
  { name: "Violet", hex: "#8338EC" },
  { name: "Magenta", hex: "#FF006E" },
] as const;

const LEVELS: Record<
  Level,
  {
    label: string;
    desc: string;
    questions: number; // target; L3 can stop after 40
    stylePickRule: { min: number; max: number | null; exact: number | null };
    baselineUpdateWeight: number;
    showEarlyFinishAt?: number;
  }
> = {
  l1: {
    label: "L1 · Quick",
    desc: "7 questions. For spur-of-the-moment gallery tours. Saves to profile with lower weight.",
    questions: 7,
    stylePickRule: { min: 2, max: 2, exact: 2 },
    baselineUpdateWeight: 0.25,
  },
  l2: {
    label: "L2 · Planned",
    desc: "20 questions. Ideal for planned museum trips. More interactive; average profile weight.",
    questions: 20,
    stylePickRule: { min: 4, max: 4, exact: 4 },
    baselineUpdateWeight: 0.6,
  },
  l3: {
    label: "L3 · Advanced",
    desc: "40–80 questions. Deep baseline calibration; heavy profile weight. Finish after 40 if desired.",
    questions: 80,
    stylePickRule: { min: 1, max: null, exact: null },
    baselineUpdateWeight: 1.0,
    showEarlyFinishAt: 40,
  },
};

function clamp(n: number, lo: number, hi: number) {
  return Math.max(lo, Math.min(hi, n));
}

function softmaxNormalize(rawByStyle: Record<string, number>, tau = 0.35) {
  const entries = Object.entries(rawByStyle);
  const vals = entries.map(([, v]) => v / tau);
  const max = Math.max(...vals);
  const exps = vals.map((v) => Math.exp(v - max));
  const sum = exps.reduce((a, b) => a + b, 0) || 1;

  const out: Record<string, number> = {};
  entries.forEach(([k], i) => (out[k] = exps[i] / sum));
  return out;
}

function downloadJson(filename: string, obj: unknown) {
  const blob = new Blob([JSON.stringify(obj, null, 2)], { type: "application/json" });
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  a.download = filename;
  a.click();
  URL.revokeObjectURL(url);
}

function sampleOne<T>(arr: T[]) {
  return arr[Math.floor(Math.random() * arr.length)];
}

function distinctPair<T>(arr: T[]) {
  const a = sampleOne(arr);
  let b = sampleOne(arr);
  let guard = 0;
  while (b === a && guard++ < 10) b = sampleOne(arr);
  return [a, b] as const;
}

export default function UserTestClient({ manifest }: { manifest: Manifest }) {
  // ---------- STATE: pre-quiz ----------
  const [step, setStep] = useState<"level" | "mood" | "color" | "style" | "quiz" | "results">("level");
  const [level, setLevel] = useState<Level>("l1");
  const [moods, setMoods] = useState<string[]>([]);
  const [colors, setColors] = useState<string[]>([]);
  const [pickedStyles, setPickedStyles] = useState<string[]>([]);

  // ---------- QUIZ STATE ----------
  const [qIndex, setQIndex] = useState(0);
  const [choices, setChoices] = useState<PrefChoice[]>([]);
  const [rawByStyle, setRawByStyle] = useState<Record<string, number>>({});
  const [lastWhy, setLastWhy] = useState<string | null>(null);

  const styles = useMemo(() => manifest.styles.map((s) => s.name).sort(), [manifest]);

  const styleToImages = useMemo(() => {
    const map: Record<string, QuizImage[]> = {};
    for (const s of manifest.styles) {
      // For stability, sample from high quiz_weight first
      map[s.name] = [...s.images].sort((a, b) => (b.quiz_weight ?? 0) - (a.quiz_weight ?? 0));
    }
    return map;
  }, [manifest]);

  const cfg = LEVELS[level];

  function canAdvancePreQuiz() {
    if (step === "level") return true;
    if (step === "mood") return moods.length >= 1; // require at least 1 for test discipline
    if (step === "color") return colors.length >= 1;
    if (step === "style") {
      if (cfg.stylePickRule.exact != null) return pickedStyles.length === cfg.stylePickRule.exact;
      return pickedStyles.length >= cfg.stylePickRule.min;
    }
    return false;
  }

  function advance() {
    const order: typeof step[] = ["level", "mood", "color", "style", "quiz"];
    const i = order.indexOf(step as any);
    const next = order[i + 1];
    if (next) setStep(next);
  }

  // ---------- QUESTION GENERATION ----------
  const currentPair = useMemo(() => {
    if (step !== "quiz") return null;
    const eligibleStyles =
      pickedStyles.length > 0 ? pickedStyles : styles;

    const [leftStyle, rightStyle] =
      eligibleStyles.length >= 2 ? distinctPair(eligibleStyles) : [eligibleStyles[0], eligibleStyles[0]];

    const leftCandidates = styleToImages[leftStyle] ?? [];
    const rightCandidates = styleToImages[rightStyle] ?? [];

    // Pull from the top N to keep quiz signal strong; still randomize within top bucket
    const bucketSize = clamp(Math.min(12, leftCandidates.length), 4, 12);
    const left = sampleOne(leftCandidates.slice(0, bucketSize));

    const bucketSizeR = clamp(Math.min(12, rightCandidates.length), 4, 12);
    const right = sampleOne(rightCandidates.slice(0, bucketSizeR));

    if (!left || !right) return null;

    return {
      left: { style: leftStyle, ...left },
      right: { style: rightStyle, ...right },
    };
  }, [step, qIndex, pickedStyles, styles, styleToImages]);

  function applyPick(picked: "left" | "right") {
    if (!currentPair) return;

    const L = currentPair.left;
    const R = currentPair.right;

    const winner = picked === "left" ? L : R;
    const loser = picked === "left" ? R : L;

    setRawByStyle((prev) => {
      const next = { ...prev };
      next[winner.style] = (next[winner.style] ?? 0) + (winner.quiz_weight ?? 0);
      next[loser.style] = (next[loser.style] ?? 0) - (loser.quiz_weight ?? 0);
      return next;
    });

    setChoices((prev) => [
      ...prev,
      {
        q: qIndex,
        left: { style: L.style, embedding_index: L.embedding_index, relativePath: L.relativePath, quiz_weight: L.quiz_weight },
        right: { style: R.style, embedding_index: R.embedding_index, relativePath: R.relativePath, quiz_weight: R.quiz_weight },
        picked,
        ts: Date.now(),
      },
    ]);

    // Subtle “why” message immediately, but unobtrusive
    setLastWhy(
      `Selection updated style scores: +${winner.style} (${winner.quiz_weight.toFixed(2)}), −${loser.style} (${loser.quiz_weight.toFixed(2)}).`
    );

    const nextQ = qIndex + 1;

    // L3: allow early finish after 40
    if (level === "l3" && cfg.showEarlyFinishAt && nextQ >= cfg.questions) {
      // reached 80
      setStep("results");
      return;
    }

    if (level !== "l3" && nextQ >= cfg.questions) {
      setStep("results");
      return;
    }

    if (level === "l3" && nextQ >= cfg.questions) {
      setStep("results");
      return;
    }

    setQIndex(nextQ);
  }

  function finishEarlyL3() {
    setStep("results");
  }

  // ---------- RESULTS ----------
  const results = useMemo(() => {
    if (step !== "results") return null;

    const allStyleNames = pickedStyles.length ? pickedStyles : styles;
    const raw: Record<string, number> = {};
    for (const s of allStyleNames) raw[s] = rawByStyle[s] ?? 0;

    const dist = softmaxNormalize(raw);

    // Explainability: top positive/negative contributors by style
    const byStyle: Record<
      string,
      { pos: Array<{ rel: string; delta: number }>; neg: Array<{ rel: string; delta: number }>; rated: number }
    > = {};
    for (const s of allStyleNames) byStyle[s] = { pos: [], neg: [], rated: 0 };

    for (const c of choices) {
      const L = c.left;
      const R = c.right;
      const pickedSide = c.picked === "left" ? L : R;
      const otherSide = c.picked === "left" ? R : L;

      // winner contributes +w, loser contributes -w (style-level)
      byStyle[pickedSide.style].rated += 1;
      byStyle[otherSide.style].rated += 1;

      byStyle[pickedSide.style].pos.push({ rel: pickedSide.relativePath, delta: +pickedSide.quiz_weight });
      byStyle[otherSide.style].neg.push({ rel: otherSide.relativePath, delta: -otherSide.quiz_weight });
    }

    for (const s of allStyleNames) {
      byStyle[s].pos.sort((a, b) => b.delta - a.delta);
      byStyle[s].neg.sort((a, b) => a.delta - b.delta);
      byStyle[s].pos = byStyle[s].pos.slice(0, 5);
      byStyle[s].neg = byStyle[s].neg.slice(0, 5);
    }

    const stylesOut = allStyleNames
      .map((name) => ({
        name,
        score: dist[name],
        raw: raw[name],
        rated: byStyle[name].rated,
        pos: byStyle[name].pos,
        neg: byStyle[name].neg,
      }))
      .sort((a, b) => b.score - a.score);

    return {
      version: "user-test-prototype-v2",
      level,
      baseline_update_weight: cfg.baselineUpdateWeight,
      questions_answered: choices.length,
      questions_target: level === "l3" ? cfg.questions : cfg.questions,
      moods,
      colors,
      pickedStyles: allStyleNames,
      styles: stylesOut,
      choices,
    };
  }, [step, level, cfg.baselineUpdateWeight, cfg.questions, choices, rawByStyle, moods, colors, pickedStyles, styles]);

  // ---------- UI ----------
  return (
    <div className="space-y-4">
      {/* Header bar (subtle explainability always visible) */}
      <div className="rounded-2xl border border-neutral-200 bg-white p-4 shadow-sm">
        <div className="flex flex-wrap items-start justify-between gap-3">
          <div>
            <div className="text-sm font-medium text-neutral-900">Taste Test</div>
            <div className="mt-1 text-sm text-neutral-600">
              Inputs influence the recommender as priors: mood + color guide tone; style + selections shape your taste profile.
              <InlineInfo text="Prototype: mood/color are captured and surfaced for analysis; embeddings-based retrieval comes next." />
            </div>
          </div>

          <div className="flex items-center gap-2">
            {step === "quiz" && (
              <div className="text-sm text-neutral-700">
                <span className="font-mono">{qIndex + 1}</span>{" "}
                <span className="text-neutral-400">/</span>{" "}
                <span className="font-mono">{level === "l3" ? cfg.questions : cfg.questions}</span>
              </div>
            )}
            <button
              className="rounded-xl border border-neutral-200 px-3 py-2 text-sm hover:bg-neutral-50"
              onClick={() =>
                downloadJson("echogallery_user_test_state.json", {
                  step,
                  level,
                  moods,
                  colors,
                  pickedStyles,
                  qIndex,
                  rawByStyle,
                  choices,
                })
              }
            >
              Export
            </button>
          </div>
        </div>
      </div>

      {/* Step screens */}
      {step === "level" && (
        <Card>
          <h2 className="text-lg font-semibold">Select a quiz level</h2>
          <p className="mt-1 text-sm text-neutral-600">
            Level affects question count and how heavily results update your baseline taste profile.
            <InlineInfo text="We store a baseline_update_weight so the backend can blend this run into your long-term profile." />
          </p>

          <div className="mt-4 grid gap-3 md:grid-cols-3">
            {(["l1", "l2", "l3"] as Level[]).map((k) => (
              <button
                key={k}
                onClick={() => setLevel(k)}
                className={`rounded-2xl border p-4 text-left transition ${
                  level === k ? "border-neutral-900" : "border-neutral-200 hover:bg-neutral-50"
                }`}
              >
                <div className="text-sm font-semibold">{LEVELS[k].label}</div>
                <div className="mt-1 text-xs text-neutral-600">{LEVELS[k].desc}</div>
                <div className="mt-3 text-xs text-neutral-500">
                  Questions: <span className="font-mono">{LEVELS[k].questions === 80 ? "40–80" : LEVELS[k].questions}</span>
                  <br />
                  Profile weight: <span className="font-mono">{LEVELS[k].baselineUpdateWeight}</span>
                </div>
              </button>
            ))}
          </div>

          <FooterNav
            canNext={canAdvancePreQuiz()}
            onNext={() => {
              setStep("mood");
            }}
          />
        </Card>
      )}

      {step === "mood" && (
        <Card>
          <h2 className="text-lg font-semibold">1) Mood</h2>
          <p className="mt-1 text-sm text-neutral-600">
            Select up to 3. Used to bias recommendations toward tone and pacing.
            <InlineInfo text="Subtle influence: mood becomes a prior. It should never fully override your taste profile." />
          </p>

          <div className="mt-4 grid gap-2 sm:grid-cols-2 md:grid-cols-4">
            {MOODS.map((m) => {
              const active = moods.includes(m);
              return (
                <button
                  key={m}
                  className={`rounded-xl border px-3 py-2 text-sm transition ${
                    active ? "border-neutral-900 bg-neutral-900 text-white" : "border-neutral-200 hover:bg-neutral-50"
                  }`}
                  onClick={() => {
                    setMoods((prev) => {
                      if (prev.includes(m)) return prev.filter((x) => x !== m);
                      if (prev.length >= 3) return prev; // cap at 3
                      return [...prev, m];
                    });
                  }}
                >
                  {m}
                </button>
              );
            })}
          </div>

          <FooterNav canNext={canAdvancePreQuiz()} onNext={() => setStep("color")} onBack={() => setStep("level")} />
        </Card>
      )}

      {step === "color" && (
        <Card>
          <h2 className="text-lg font-semibold">2) Color</h2>
          <p className="mt-1 text-sm text-neutral-600">
            Select up to 3. Used to bias recommendations toward palette and atmosphere.
            <InlineInfo text="Prototype: we record your palette picks; later this can influence reranking using color features or captions." />
          </p>

          <div className="mt-4 grid grid-cols-2 gap-2 sm:grid-cols-5">
            {COLORS.map((c) => {
              const active = colors.includes(c.name);
              return (
                <button
                  key={c.name}
                  className={`rounded-2xl border p-3 text-left transition ${
                    active ? "border-neutral-900" : "border-neutral-200 hover:bg-neutral-50"
                  }`}
                  onClick={() => {
                    setColors((prev) => {
                      if (prev.includes(c.name)) return prev.filter((x) => x !== c.name);
                      if (prev.length >= 3) return prev;
                      return [...prev, c.name];
                    });
                  }}
                >
                  <div className="flex items-center gap-3">
                    <div className="h-8 w-8 rounded-xl border border-neutral-200" style={{ background: c.hex }} />
                    <div className="text-sm font-medium">{c.name}</div>
                  </div>
                </button>
              );
            })}
          </div>

          <FooterNav canNext={canAdvancePreQuiz()} onNext={() => setStep("style")} onBack={() => setStep("mood")} />
        </Card>
      )}

      {step === "style" && (
        <Card>
          <h2 className="text-lg font-semibold">3) Styles</h2>
          <p className="mt-1 text-sm text-neutral-600">
            Choose styles to focus the quiz.
            <InlineInfo
              text={`L1 requires exactly 2 styles; L2 requires exactly 4; L3 is unlimited (min 1). The quiz will sample images from your selection.`}
            />
          </p>

          <div className="mt-3 text-xs text-neutral-600">
            Selected: <span className="font-mono">{pickedStyles.length}</span>{" "}
            {cfg.stylePickRule.exact != null && (
              <>
                · Required: <span className="font-mono">{cfg.stylePickRule.exact}</span>
              </>
            )}
          </div>

          <div className="mt-4 grid gap-2 sm:grid-cols-2 md:grid-cols-3">
            {styles.map((s) => {
              const active = pickedStyles.includes(s);
              const locked =
                !active &&
                cfg.stylePickRule.exact != null &&
                pickedStyles.length >= cfg.stylePickRule.exact;

              return (
                <button
                  key={s}
                  disabled={locked}
                  onClick={() => {
                    setPickedStyles((prev) => {
                      if (prev.includes(s)) return prev.filter((x) => x !== s);
                      if (cfg.stylePickRule.exact != null && prev.length >= cfg.stylePickRule.exact) return prev;
                      return [...prev, s];
                    });
                  }}
                  className={`rounded-xl border px-3 py-2 text-left text-sm transition ${
                    active ? "border-neutral-900 bg-neutral-900 text-white" : "border-neutral-200 hover:bg-neutral-50"
                  } ${locked ? "opacity-50" : ""}`}
                >
                  {s}
                </button>
              );
            })}
          </div>

          <FooterNav
            canNext={canAdvancePreQuiz()}
            onNext={() => {
              // Initialize raw scores for the selected set
              const init: Record<string, number> = {};
              const set = pickedStyles.length ? pickedStyles : styles;
              for (const s of set) init[s] = 0;
              setRawByStyle(init);
              setQIndex(0);
              setChoices([]);
              setLastWhy(null);
              setStep("quiz");
            }}
            onBack={() => setStep("color")}
          />
        </Card>
      )}

      {step === "quiz" && currentPair && (
        <Card>
          <div className="flex flex-wrap items-start justify-between gap-3">
            <div>
              <div className="text-sm font-medium text-neutral-900">
                Pairwise preference
                <InlineInfo text="Choosing an image increases its style score and decreases the other style score, weighted by quiz_weight." />
              </div>
              <div className="mt-1 text-xs text-neutral-600">
                Click the image you prefer. The system learns from relative choices (more stable than likes alone).
              </div>
            </div>

            {level === "l3" && cfg.showEarlyFinishAt && qIndex + 1 >= cfg.showEarlyFinishAt && (
              <button
                className="rounded-xl border border-neutral-200 px-3 py-2 text-sm hover:bg-neutral-50"
                onClick={finishEarlyL3}
              >
                Finish now (40+)
              </button>
            )}
          </div>

          <div className="mt-4 grid gap-3 md:grid-cols-2">
            <ChoiceCard
              key={`L-${qIndex}-${currentPair.left.embedding_index}`}
              label={currentPair.left.style}
              src={`${IMAGE_BASE}/${currentPair.left.relativePath}`}
              onPick={() => applyPick("left")}
              animate={level !== "l1"}
            />
            <ChoiceCard
              key={`R-${qIndex}-${currentPair.right.embedding_index}`}
              label={currentPair.right.style}
              src={`${IMAGE_BASE}/${currentPair.right.relativePath}`}
              onPick={() => applyPick("right")}
              animate={level !== "l1"}
            />
          </div>

          <AnimatePresence>
            {lastWhy && (
              <motion.div
                initial={{ opacity: 0, y: 6 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 6 }}
                className="mt-3 text-xs text-neutral-600"
              >
                {lastWhy}
              </motion.div>
            )}
          </AnimatePresence>
        </Card>
      )}

      {step === "results" && results && (
        <div className="space-y-4">
          <Card>
            <div className="flex flex-wrap items-start justify-between gap-3">
              <div>
                <div className="text-lg font-semibold">Results</div>
                <div className="mt-1 text-sm text-neutral-600">
                  Level: <span className="font-mono">{results.level}</span> · Answers:{" "}
                  <span className="font-mono">{results.questions_answered}</span> · Baseline update weight:{" "}
                  <span className="font-mono">{results.baseline_update_weight}</span>
                </div>
                <div className="mt-2 text-xs text-neutral-600">
                  Mood: <span className="font-mono">{results.moods.join(", ")}</span> · Colors:{" "}
                  <span className="font-mono">{results.colors.join(", ")}</span>
                </div>
              </div>

              <div className="flex gap-2">
                <button
                  className="rounded-xl border border-neutral-200 px-3 py-2 text-sm hover:bg-neutral-50"
                  onClick={() => downloadJson("echogallery_user_test_results.json", results)}
                >
                  Export results JSON
                </button>
                <button
                  className="rounded-xl bg-neutral-900 px-3 py-2 text-sm font-medium text-white hover:bg-neutral-800"
                  onClick={() => {
                    setStep("level");
                    setQIndex(0);
                    setChoices([]);
                    setRawByStyle({});
                    setLastWhy(null);
                    setMoods([]);
                    setColors([]);
                    setPickedStyles([]);
                  }}
                >
                  Restart
                </button>
              </div>
            </div>
          </Card>

          {results.styles.map((s) => (
            <Card key={s.name}>
              <div className="flex flex-wrap items-center justify-between gap-3">
                <div>
                  <div className="text-base font-semibold">{s.name}</div>
                  <div className="mt-1 text-sm text-neutral-600">
                    score: <span className="font-mono">{(s.score * 100).toFixed(1)}%</span> · raw:{" "}
                    <span className="font-mono">{s.raw.toFixed(3)}</span>
                  </div>
                </div>

                <div className="w-56">
                  <div className="h-2 w-full rounded-full bg-neutral-100">
                    <div className="h-2 rounded-full bg-neutral-900" style={{ width: `${Math.max(1, s.score * 100)}%` }} />
                  </div>
                </div>
              </div>

              <div className="mt-4 grid gap-4 md:grid-cols-2">
                <ExplainBox
                  text={
                    "This score is derived from your pairwise selections. Each pick adds the chosen image’s quiz_weight to its style and subtracts the other image’s quiz_weight from its style."
                  }
                />

                <div className="space-y-3">
                  <EvidenceStrip title="Top positive evidence" items={s.pos} />
                  <EvidenceStrip title="Top negative evidence" items={s.neg} />
                </div>
              </div>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
}

/* ---------- UI building blocks ---------- */

function Card({ children }: { children: React.ReactNode }) {
  return <div className="rounded-2xl border border-neutral-200 bg-white p-4 shadow-sm">{children}</div>;
}

function InlineInfo({ text }: { text: string }) {
  return (
    <span className="ml-1 inline-flex items-center align-middle">
      <span className="group relative inline-flex h-5 w-5 items-center justify-center rounded-full border border-neutral-200 text-[11px] text-neutral-600">
        i
        <span className="pointer-events-none absolute right-0 top-6 z-10 hidden w-72 rounded-xl border border-neutral-200 bg-white p-3 text-xs text-neutral-700 shadow-sm group-hover:block">
          {text}
        </span>
      </span>
    </span>
  );
}

function FooterNav({
  canNext,
  onNext,
  onBack,
}: {
  canNext: boolean;
  onNext: () => void;
  onBack?: () => void;
}) {
  return (
    <div className="mt-6 flex items-center justify-between">
      {onBack ? (
        <button className="rounded-xl border border-neutral-200 px-3 py-2 text-sm hover:bg-neutral-50" onClick={onBack}>
          Back
        </button>
      ) : (
        <div />
      )}

      <button
        className={`rounded-xl px-3 py-2 text-sm font-medium ${
          canNext ? "bg-neutral-900 text-white hover:bg-neutral-800" : "bg-neutral-200 text-neutral-500"
        }`}
        onClick={onNext}
        disabled={!canNext}
      >
        Continue
      </button>
    </div>
  );
}

function ChoiceCard({
  label,
  src,
  onPick,
  animate,
}: {
  label: string;
  src: string;
  onPick: () => void;
  animate: boolean;
}) {
  const Wrapper = animate ? motion.button : ("button" as any);

  return (
    <Wrapper
      onClick={onPick}
      whileTap={animate ? { scale: 0.985 } : undefined}
      className="group overflow-hidden rounded-2xl border border-neutral-200 bg-white text-left hover:bg-neutral-50"
    >
      <div className="relative aspect-[4/3] w-full">
        <Image src={src} alt={label} fill className="object-cover" sizes="(max-width: 768px) 100vw, 50vw" />
      </div>

      <div className="flex items-center justify-between gap-2 p-3">
        <div className="text-sm font-medium text-neutral-900">{label}</div>
        <div className="text-xs text-neutral-500 opacity-0 transition group-hover:opacity-100">
          Click to choose
        </div>
      </div>
    </Wrapper>
  );
}

function ExplainBox({ text }: { text: string }) {
  return (
    <div className="rounded-2xl border border-neutral-200 bg-neutral-50 p-4 text-sm text-neutral-700">
      <div className="text-sm font-semibold text-neutral-900">Why this score?</div>
      <div className="mt-2 leading-relaxed">{text}</div>
      <div className="mt-2 text-xs text-neutral-600">
        Subtle note: mood and color are stored as priors; this prototype’s style distribution is driven by pairwise choices.
      </div>
    </div>
  );
}

function EvidenceStrip({
  title,
  items,
}: {
  title: string;
  items: Array<{ rel: string; delta: number }>;
}) {
  return (
    <div>
      <div className="text-sm font-semibold">{title}</div>
      {items.length === 0 ? (
        <div className="mt-1 text-sm text-neutral-600">No evidence captured.</div>
      ) : (
        <div className="mt-2 grid grid-cols-5 gap-2">
          {items.map((x, i) => (
            <div key={`${x.rel}-${i}`} className="rounded-xl border border-neutral-200 bg-white p-2">
              <div className="relative aspect-square w-full overflow-hidden rounded-lg">
                <Image src={`${IMAGE_BASE}/${x.rel}`} alt={x.rel} fill className="object-cover" sizes="120px" />
              </div>
              <div className="mt-2 text-[11px] text-neutral-700">
                <div className="font-mono">Δ {x.delta.toFixed(2)}</div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
