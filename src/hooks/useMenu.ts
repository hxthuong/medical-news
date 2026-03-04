// "use client";

// import { useMemo } from "react";
// import listToMenuTree from "@/utils/buildTreeFromAPI";
// import { useConfig } from "./useConfig";

// export function useMenu(position: string = "", lang: string = "vi") {
//   const { menuConfig, refreshConfig, loading } = useConfig(lang);

//   const menu = useMemo(() => {
//     if (!menuConfig?.length) return [];

//     let list = menuConfig;

//     if (position === "left") list = menuConfig.filter((x) => x.ILEFT === 1);
//     else if (position === "right")
//       list = menuConfig.filter((x) => x.IRIGHT === 1);
//     else if (position === "top") list = menuConfig.filter((x) => x.ITOP === 1);
//     else if (position === "bottom")
//       list = menuConfig.filter((x) => x.IBOTTOM === 1);

//     return listToMenuTree(list, position === "left" ? position : "", lang);
//   }, [menuConfig, position, lang]);

//   return { menu, loading, refreshConfig };
// }
