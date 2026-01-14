import { NextResponse } from 'next/server';

export async function POST(req: Request) {
  const body = await req.json();
  const hfUrl = "https://dwcodes-echogallery-app.hf.space/search";

  const response = await fetch(hfUrl, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(body),
  });

  const data = await response.json();
  return NextResponse.json(data);
}