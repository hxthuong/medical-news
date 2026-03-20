import fs from "fs";
import path from "path";
import { NextResponse } from "next/server";

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);
  const url = searchParams.get("url")!;
  const fileName = path.basename(url);

  const uploadsDir = path.join(process.cwd(), "uploads/videos");
  if (!fs.existsSync(uploadsDir)) fs.mkdirSync(uploadsDir, { recursive: true });

  const filePath = path.join(uploadsDir, fileName);

  if (!fs.existsSync(filePath)) {
    return NextResponse.json({ error: "File not found" }, { status: 404 });
  }

  // Node ReadStream -> Web ReadableStream
  const fileStream = fs.createReadStream(filePath);
  const readableStream = new ReadableStream({
    start(controller) {
      fileStream.on("data", (chunk) => controller.enqueue(chunk));
      fileStream.on("end", () => controller.close());
      fileStream.on("error", (err) => controller.error(err));
    },
  });

  return new NextResponse(readableStream, {
    headers: {
      "Content-Type": "video/mp4",
    },
  });
}
