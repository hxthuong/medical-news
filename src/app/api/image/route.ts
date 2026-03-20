import fs from "fs";
import path from "path";
import { NextResponse } from "next/server";

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);
  let url = searchParams.get("url");
  if (!url) {
    return NextResponse.json(
      { error: "Missing url query parameter" },
      { status: 400 },
    );
  }

  // Nếu url đang bị double-encode (ví dụ: %2520), decode nhiều lần
  try {
    while (url.includes("%25")) {
      url = decodeURIComponent(url);
    }
  } catch (err) {
    // nếu decode fail thì dùng url hiện tại
  }

  // Loại bỏ khoảng trắng và normalize 2 dấu slash
  url = url.trim().replace(/(?<!https?:)\/\/+/, "/");

  let sourceUrl: URL;
  try {
    sourceUrl = new URL(url);
  } catch (error) {
    return NextResponse.json(
      { error: "Invalid url format", details: String(error), url },
      { status: 400 },
    );
  }

  if (!/^https?:$/i.test(sourceUrl.protocol)) {
    return NextResponse.json(
      { error: "Unsupported protocol", protocol: sourceUrl.protocol },
      { status: 400 },
    );
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
      {
        error: "Failed to fetch remote image",
        detail: String(error),
        url: sourceUrl.toString(),
      },
      { status: 502 },
    );
  }

  if (!res.ok) {
    return NextResponse.json(
      {
        error: "Remote image request failed",
        status: res.status,
        statusText: res.statusText,
        url: sourceUrl.toString(),
      },
      { status: 502 },
    );
  }

  const buffer = Buffer.from(await res.arrayBuffer());
  fs.writeFileSync(filePath, buffer);

  return new NextResponse(buffer, {
    headers: { "Content-Type": res.headers.get("content-type") || "image/*" },
  });
}
