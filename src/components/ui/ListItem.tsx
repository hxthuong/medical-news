import { MenuProps } from "@/types/menu";
import Link from "next/link";
import { useState } from "react";

interface ListItemProps {
  item: MenuProps;
  type?: string;
  icon?: React.ReactNode;
  width?: number;
}

export const ListItem = ({ item, type, icon, width }: ListItemProps) => {
  // trạng thái mở/đóng cho từng child
  const [openChildren, setOpenChildren] = useState<{ [key: string]: boolean }>(
    {},
  );

  const toggleChild = (id: string) => {
    setOpenChildren((prev) => ({
      ...prev,
      [id]: !prev[id],
    }));
  };

  return (
    <div>
      <div className="listItem w-full text-blue-800 p-3 border border-gray-300 rounded-2xl shadow-xl text-left text-lg uppercase font-semibold">
        {item.href ? (
          <Link href={item.href} className="flex items-center space-x-3">
            {icon}
            <span> {item.name}</span>
          </Link>
        ) : (
          <div className="flex items-center space-x-3">
            {icon}
            <span> {item.name}</span>
          </div>
        )}
      </div>
    </div>
  );
};
