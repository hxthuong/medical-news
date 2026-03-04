import fs from "fs";
import path from "path";
import { NextResponse } from "next/server";

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);
  const url = searchParams.get("url")!;
  const fileName = path.basename(url);

  const uploadsDir = path.join(process.cwd(), "uploads/images");
  if (!fs.existsSync(uploadsDir)) fs.mkdirSync(uploadsDir, { recursive: true });

  const filePath = path.join(uploadsDir, fileName);

  // Nếu đã có, trả về
  if (fs.existsSync(filePath)) {
    const file = fs.readFileSync(filePath);
    return new NextResponse(file, {
      headers: { "Content-Type": "image/*" },
    });
  }

  // Nếu chưa có, tải về
  const res = await fetch(url);
  const buffer = Buffer.from(await res.arrayBuffer());
  fs.writeFileSync(filePath, buffer);

  return new NextResponse(buffer, {
    headers: { "Content-Type": "image/*" },
  });
}
