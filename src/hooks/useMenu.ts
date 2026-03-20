"use client";

import { useMemo } from "react";
import { useConfig } from "./useConfig";
import { buildMenuTree } from "@/utils/buildMenuTree";

export function useMenu(position: string = "", lang: string = "vi") {
  const { menuConfig, refreshConfig, loading } = useConfig(lang);

  const menu = useMemo(() => {
    if (position === "top") {
      return buildMenuTree(menuConfig?.filter((x) => x.ITOP === 1) || [], lang);
    } else if (position === "left") {
      return buildMenuTree(
        menuConfig?.filter((x) => x.ILEFT === 1) || [],
        lang,
      );
    } else if (position === "bottom") {
      return buildMenuTree(
        menuConfig?.filter((x) => x.IBOTTOM === 1) || [],
        lang,
      );
    }
    return buildMenuTree(menuConfig || [], lang);
  }, [menuConfig, position, lang]);

  return { menu, loading, refreshConfig };
}
