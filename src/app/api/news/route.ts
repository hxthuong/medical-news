// app/api/news/route.ts
import { fetchNewById } from "@/services/bvtwService";
import { NextResponse } from "next/server";

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const id = Number(searchParams.get("ID"));
  const page = Number(searchParams.get("page")) || 1;
  const lang = searchParams.get("lang") || "vi";

  try {
    const data = await fetchNewById(id, page, lang);
    return NextResponse.json(data);
  } catch (err: unknown) {
    if (err instanceof Error) {
      return NextResponse.json({ error: err.message }, { status: 500 });
    }
    return NextResponse.json({ error: String(err) }, { status: 500 });
  }
}
