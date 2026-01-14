// app/visit/layout.tsx
import type { ReactNode } from "react";

export default function VisitLayout({ children }: { children: ReactNode }) {
  return (
    <div className="min-h-screen bg-white">
      {children}
    </div>
  );
}
