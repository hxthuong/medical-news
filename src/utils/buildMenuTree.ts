import { findMenuKeyByValue } from "@/config/mapping";
import { MenuProps } from "@/types/menu";
import { NewsProps } from "@/types/news";
import { getImageSrc, srcImage } from "./addBaseUrlToSrc";

export function buildMenuTree(
  data: NewsProps[],
  locale: string = "vi",
): MenuProps[] {
  const map = new Map<number, MenuProps>();
  const roots: MenuProps[] = [];

  // 1️⃣ Tạo tất cả node trước
  for (const item of data) {
    map.set(Number(item.ID), {
      id: item.ID,
      name: item.CMETAKEY,
      href: `${findMenuKeyByValue(Number(item.ID), locale)}`, // chỉnh theo routing của bạn
      type: findMenuKeyByValue(Number(item.ID), locale)?.replace("/", ""),
      icon: undefined, // có thể map từ item.ICON
      image: item.CHINHANH
        ? srcImage(item.CHINHANH)
        : item.CNOIDUNG
          ? getImageSrc(item.CNOIDUNG)
          : undefined,
      children: [],
    });
  }

  // 2️⃣ Gắn vào parent
  for (const item of data) {
    const node = map.get(Number(item.ID))!;

    if (item.IPARENT === 0) {
      roots.push(node);
    } else {
      const parent = map.get(Number(item.IPARENT));
      if (parent) {
        parent.children!.push(node);
      }
    }
  }

  // 3️⃣ DFS propagate type từ level 0
  function dfs(nodes: MenuProps[], level: number, inheritedKey?: string) {
    for (const node of nodes) {
      node.level = level;

      // Nếu là level 0 → tự quyết định key
      let currentKey = inheritedKey;

      if (level === 0) {
        const selfKey = findMenuKeyByValue(Number(node.id), locale as any);
        currentKey = selfKey ?? undefined;
      }

      let href = "";
      if (currentKey) {
        node.type = currentKey?.replace("/", "");
        href = currentKey.startsWith("http")
          ? currentKey
          : `${currentKey}/${node.id}`;
        if (level === 0)
          href = `${currentKey.startsWith("http") ? "" : "/"}${node.type}`;
      } else {
        href = `/page/${node.id}`;
      }

      node.href = `${href}${locale === "eng" ? "?lang=eng" : ""}`;

      if (node.children && node.children.length > 0) {
        dfs(node.children, level + 1, currentKey);
      } else {
        delete node.children;
      }
    }
  }

  dfs(roots, 0);

  return roots;
}

export function flattenMenu(tree: MenuProps[]): MenuProps[] {
  const result: MenuProps[] = [];

  function dfs(node: MenuProps) {
    result.push({
      id: node.id,
      name: node.name,
      href: node.href,
      type: node.type,
      icon: node.icon,
      image: node.image,
    });

    if (node.children) {
      for (const child of node.children) {
        dfs(child);
      }
    }
  }

  for (const root of tree) {
    dfs(root);
  }

  return result;
}

export default function findItemByID(
  menu: MenuProps[],
  id: string | number,
): MenuProps | null {
  for (const item of menu) {
    if (item.id === id) return item;
    if (item.children) {
      const found = findItemByID(item.children, id);
      if (found) return found;
    }
  }
  return null;
}
