import { useHeader } from "@/context/header";
import { useConfig } from "@/hooks/useConfig";
import Gallery from "../gallery";
import { buildMenuTree, flattenMenu } from "@/utils/buildMenuTree";
import { mapping } from "@/config/mapping";
import { useMemo } from "react";
import { useMenu } from "@/hooks/useMenu";

export default function GalleryPage() {
  const { locale } = useHeader();
  const { menu: menuConfig } = useMenu("left", locale);
  const menu = menuConfig?.find(
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
