import he from "he";

export const baseUrl =
  typeof window !== "undefined"
    ? `${window.location.protocol}//${window.location.host}`
    : "";

export default function addBaseUrlToSrc(
  content: string,
  baseUrl: string = "https://bvtwhue.com.vn",
) {
  if (!content) return null;

  // 1️⃣ Decode HTML entities
  let decoded = he.decode(content);

  // 2️⃣ Thêm base URL cho img src="/..."
  decoded = decoded.replace(
    /<img\s+([^>]*?)src="\/(.*?)"([^>]*?)>/gi,
    (match, pre, srcPath, post) => {
      const fullUrl = `${baseUrl}/${srcPath}`;
      if (/onerror=/i.test(match)) {
        return `<img ${pre}src="${fullUrl}"${post}>`;
      } else {
        return `<img ${pre}src="${fullUrl}" onerror="this.onerror=null; this.src='/images/noImage.png'"${post}>`;
      }
    },
  );

  // 3️⃣ Thêm base URL cho href="/..."
  decoded = decoded.replace(/href="\/(.*?)"/gi, `href="${baseUrl}/$1"`);

  // 4️⃣ Thêm style flex cho thẻ chứa >=2 ảnh
  // Regex match tất cả thẻ <p ...>...</p> hoặc <div ...>...</div>
  const blockRegex = /<(p|div)([^>]*)>([\s\S]*?)<\/\1>/gi;

  decoded = decoded.replace(
    blockRegex,
    (fullMatch, tagName, attributes, innerHTML) => {
      const imgCount = (innerHTML.match(/<img\b/gi) || []).length;

      if (imgCount >= 2) {
        const styleFlex =
          "display:flex; justify-content:space-around; gap:10px;align-items: flex-start;";

        // Nối style cũ nếu có
        if (/style\s*=\s*"/i.test(attributes)) {
          attributes = attributes.replace(
            /style\s*=\s*"(.*?)"/i,
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
            (m: any, oldStyle: any) => {
              return `style="${oldStyle}; ${styleFlex}"`;
            },
          );
        } else {
          attributes += ` style="${styleFlex}"`;
        }

        return `<${tagName}${attributes}>${innerHTML}</${tagName}>`;
      }

      return fullMatch;
    },
  );

  return decoded;
}

export const srcImage = (
  src: string,
  url: string = "https://bvtwhue.com.vn",
): string => {
  if (!src.includes("http://") && !src.includes("https://"))
    return `${url}${src}`;
  return src;
};

export function getImageSrc(html: string = ""): string | null {
  if (!html) return "/images/noImage.png";

  const decoded = he.decode(html);

  const parser = new DOMParser();
  const doc = parser.parseFromString(decoded, "text/html");

  const img = doc.querySelector("img"); // lấy ảnh đầu tiên trong toàn bộ HTML

  return img
    ? `${srcImage(img.getAttribute("src") as string)}`
    : "/images/noImage.png";
}
