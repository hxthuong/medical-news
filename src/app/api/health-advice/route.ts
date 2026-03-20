// app/api/health-advice/route.ts
import { fetchHealthAdvice } from "@/services/bvtwService";
import { NextResponse } from "next/server";

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const id = Number(searchParams.get("ID"));
  const lang = searchParams.get("lang") || "vi";

  try {
    const data = await fetchHealthAdvice(id, lang);
    return NextResponse.json(data);
  } catch (err: unknown) {
    if (err instanceof Error) {
      return NextResponse.json({ error: err.message }, { status: 500 });
    }
    return NextResponse.json({ error: String(err) }, { status: 500 });
  }
}
