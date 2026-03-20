import fs from "fs";
import path from "path";
import { NextResponse } from "next/server";

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);
  const url = searchParams.get("url");
  if (!url) {
    return NextResponse.json(
      { error: "Missing url query parameter" },
      { status: 400 },
    );
  }

  let sourceUrl: URL;
  try {
    sourceUrl = new URL(url);
  } catch (error) {
    return NextResponse.json({ error: "Invalid url format" }, { status: 400 });
  }

  const uploadsDir = path.join(process.cwd(), "uploads/images");
  fs.mkdirSync(uploadsDir, { recursive: true });

  const fileName = path.basename(sourceUrl.pathname) || "image.tmp";
  const filePath = path.join(uploadsDir, fileName);

  if (fs.existsSync(filePath)) {
    const file = fs.readFileSync(filePath);
    return new NextResponse(file, {
      headers: { "Content-Type": "image/*" },
    });
  }

  let res;
  try {
    res = await fetch(sourceUrl.toString());
  } catch (error) {
    return NextResponse.json(
      { error: "Failed to fetch remote image", detail: String(error) },
      { status: 502 },
    );
  }

  if (!res.ok) {
    return NextResponse.json(
      { error: "Remote image request failed", status: res.status },
      { status: 502 },
    );
  }

  const buffer = Buffer.from(await res.arrayBuffer());
  fs.writeFileSync(filePath, buffer);

  return new NextResponse(buffer, {
    headers: { "Content-Type": res.headers.get("content-type") || "image/*" },
  });
}
