import { useHeader } from "@/context/header";
import { useConfig } from "@/hooks/useConfig";
import { MenuProps } from "@/types/menu";
import { buildMenuTree } from "@/utils/buildMenuTree";
import { ChevronRight } from "lucide-react";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";

export default function Sidebar() {
  const { locale } = useHeader();
  const { loading, menuConfig } = useConfig(locale);
  const menu = buildMenuTree(
    menuConfig?.filter((x) => x.ILEFT === 1) || [],
    locale,
  );

  menu.forEach((item) => {
    if (item.id === 20236) {
      item.children = [];
      const selfCopy: MenuProps = { ...item, children: [] };
      item.children?.push(selfCopy);
    }
  });

  return (
    <div className="sidebar-container flex justify-between items-start border-b border-white bg-white rounded-xl p-3">
      <div className="flex flex-col justify-end w-full">
        {menu.map((item) => (
          <div key={item.id}>
            <div className="w-full bg-blue-950 text-white p-3 text-left rounded-xl text-lg uppercase font-semibold">
              {item.name}
            </div>
            {item.children?.map((child) => (
              <SidebarItem
                key={child.id}
                item={child}
                firstItem={item.children?.indexOf(child) === 0}
              />
            ))}
          </div>
        ))}
      </div>
    </div>
  );
}

interface SidebarProps {
  item: MenuProps;
  openId?: number | null;
  setOpenId?: (id: number | null) => void;
  firstItem?: boolean;
}

const SidebarItem = ({ item, openId, setOpenId, firstItem }: SidebarProps) => {
  const [open, setOpen] = useState(openId === item.id || false);
  const [maxHeight, setMaxHeight] = useState("0px");
  const contentRef = useRef<HTMLDivElement>(null);

  const hasChildren = !!item.children?.length;

  const toggle = () => {
    if (!hasChildren) return;
    setOpen(!open);
    setOpenId?.(!open ? Number(item.id) : null);
  };

  // Cập nhật maxHeight sau khi render
  useEffect(() => {
    if (contentRef.current) {
      setTimeout(
        () =>
          setMaxHeight(open ? `${contentRef?.current?.scrollHeight}px` : "0px"),
        0,
      );
    }
  }, [open, item.children]);

  return (
    <div>
      {/* ITEM */}
      <div
        onClick={toggle}
        className={`sidebar-item p-3 flex items-center space-x-2 text-lg hover:bg-blue-100 hover:cursor-pointer ${!firstItem ? "border-t border-t-gray-300" : ""}`}
        style={{ marginLeft: ((Number(item.level) ?? 1) - 1) * 16 + 12 }}
      >
        <ChevronRight
          width={18}
          height={18}
          className={`text-blue-800 transition-transform duration-300 ease-in-out min-w-4.5 min-h-4.5 ${
            hasChildren ? (open ? "rotate-90" : "") : ""
          }`}
        />
        {item.href && !hasChildren ? (
          <Link href={item.href} onClick={() => setOpenId?.(null)}>
            {item.name}
          </Link>
        ) : (
          <span>{item.name}</span>
        )}
      </div>

      {/* CHILDREN */}
      <div
        ref={contentRef}
        className="sidebar-item overflow-hidden transition-[max-height] duration-300 ease-in-out"
        style={{ maxHeight }}
      >
        {hasChildren &&
          item.children!.map((child: MenuProps) => (
            <SidebarItem
              key={child.id}
              item={child}
              openId={openId}
              setOpenId={setOpenId}
            />
          ))}
      </div>
    </div>
  );
};
