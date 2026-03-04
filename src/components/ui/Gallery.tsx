import { useHeader } from "@/context/header";
import { useConfig } from "@/hooks/useConfig";
import Gallery from "../gallery";
import { buildMenuTree, flattenMenu } from "@/utils/buildMenuTree";
import { mapping } from "@/config/mapping";
import { useMemo } from "react";

export default function GalleryPage() {
  const { locale, setHeader } = useHeader();
  const { menuConfig } = useConfig(locale);
  const menu = buildMenuTree(
    menuConfig?.filter((x) => x.ILEFT === 1) || [],
    locale,
  ).find(
    (x) =>
      x.id ===
      mapping.MENU["/organization"][
        locale as keyof (typeof mapping.MENU)["/organization"]
      ],
  )?.children;

  const slides = useMemo(() => {
    return (flattenMenu(menu ?? []) || [])
      .map((item) => ({
        src: item?.image,
        description: item?.name ?? "",
      }))
      .filter((img): img is { src: string; description: string } =>
        Boolean(img.src),
      );
  }, [menu]);

  return <Gallery slides={slides} />;
}
