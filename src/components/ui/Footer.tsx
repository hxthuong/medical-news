"use client";
import { useConfig } from "@/hooks/useConfig";
import { Calendar, ChevronRight, PieChart, User } from "lucide-react";
import localFont from "next/font/local";
import Link from "next/link";
import { buildMenuTree } from "@/utils/buildMenuTree";
import { MenuProps } from "@/types/menu";
import { useScreen } from "@/hooks/useScreen";
import CustomImage from "@/components/image";
import { useHeader } from "@/context/header";

const robotoSlab = localFont({
  src: [
    { path: "../../fonts/RobotoSlab-Regular.ttf", weight: "400" },
    { path: "../../fonts/RobotoSlab-Bold.ttf", weight: "700" },
  ],
  variable: "--font-roboto-slab",
});

interface MenuFooterProps extends MenuProps {
  value?: number;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  children?: any[];
  component?: React.ReactNode;
}

export default function Footer() {
  const { locale } = useHeader();
  const { menuConfig, visits, keyword } = useConfig(locale);
  const { width } = useScreen();
  const menu = buildMenuTree(
    menuConfig?.filter((x) => x.IBOTTOM === 1) || [],
    locale,
  );

  const menuFooter: MenuFooterProps[] = [
    ...menu,
    {
      id: "10",
      name: locale === "eng" ? "Statistical access" : "Thống kê truy cập",
      children: [
        {
          name: locale === "eng" ? "Online" : "Trực tuyến",
          value: visits?.DANG_ONLINE?.toLocaleString("de-DE"),
          visible: true,
          icon: <User className="w-5" />,
        },
        {
          name: locale === "eng" ? "Monthly visits" : "Trong tháng",
          value: visits?.TRUYCAP_THANG?.toLocaleString("de-DE"),
          visible: true,
          icon: <Calendar className="w-5" />,
        },
        {
          name: locale === "eng" ? "Total visits" : "Tổng truy cập",
          value: visits?.TRUYCAP_NAM?.toLocaleString("de-DE"),
          visible: true,
          icon: <PieChart className="w-5" />,
        },
      ],
    },
    {
      id: "11",
      name: keyword.find((x) => x.TUKHOA === "KETNOI")?.NOIDUNG ?? "",
      component: (
        <iframe
          src="https://www.facebook.com/plugins/likebox.php?href=https://www.facebook.com/bvtwhue/?fref=ts&amp;colorscheme=light&amp;show_faces=true&amp;header=false&amp;stream=false&amp;show_border=false"
          scrolling="no"
        ></iframe>
      ),
    },
  ];

  const copyrightKey =
    keyword.find((x) => x.TUKHOA === "FOOTER_BANQUYEN")?.NOIDUNG ?? "";

  const editorKey =
    keyword.find((x) => x.TUKHOA === "FOOTER_BIENTAP")?.NOIDUNG ?? "";

  return (
    <div
      className={`w-full bg-blue-950 p-5 text-white ${robotoSlab.className}`}
    >
      <div className="flex flex-col items-center">
        <div className="w-full max-w-7xl flex flex-wrap space-y-4 justify-between">
          {menuFooter &&
            menuFooter.length > 0 &&
            menuFooter.map((item) => (
              <div
                key={item.id}
                className={`${
                  width > 940 ? "" : "w-full"
                } flex flex-col items-start space-y-1`}
              >
                <h4 className="font-semibold text-xl mb-1">{item.name}</h4>
                <ul>
                  {item.component ? (
                    <div key={item.id}>{item.component}</div>
                  ) : (
                    item.children?.map((child, id) => {
                      return (
                        <li
                          key={id}
                          className={`text-white my-2 ${
                            child.href ? "hover:text-blue-400" : ""
                          }`}
                        >
                          {child.href ? (
                            <Link
                              href={child.href}
                              className="flex flex-row items-center space-x-2"
                            >
                              <ChevronRight width={16} height={16} />
                              <span>{child.name}</span>
                            </Link>
                          ) : (
                            <div className="flex flex-row items-center space-x-1">
                              <ChevronRight width={16} height={16} />
                              <span>
                                {child.name}
                                {child.value ? ":" : ""}
                              </span>
                              {child.value && (
                                <span className="font-semibold">
                                  {child.value}
                                </span>
                              )}
                            </div>
                          )}
                        </li>
                      );
                    })
                  )}
                </ul>
              </div>
            ))}
        </div>
        {/* Khối bản quyền + App Store/CH Play */}
        <div
          className={`pt-6 border-t border-t-blue-200 flex ${
            width > 940 ? "" : "flex-wrap"
          } justify-between items-start w-full max-w-7xl mt-3`}
        >
          {/* Bên trái */}
          <div className={width > 576 ? "flex-1" : "w-full"}>
            <h3 className="text-white font-semibold">{copyrightKey}</h3>
            <h3 className="text-white">{editorKey}</h3>
          </div>

          {/* Bên phải */}
          <div className="store-footer flex-1 flex justify-end">
            <div className="flex flex-row space-x-3">
              <Link
                href="https://apps.apple.com/"
                target="_blank"
                rel="noopener noreferrer"
                className="text-white flex flex-row items-center bg-blue-700 p-3 font-semibold rounded-3xl"
              >
                <CustomImage
                  src="/images/appstore.png"
                  alt="AppStore"
                  width={20}
                  height={20}
                />
                <span className="ml-1.5">App Store</span>
              </Link>
              <Link
                href="https://play.google.com/"
                target="_blank"
                rel="noopener noreferrer"
                className="text-white flex flex-row items-center bg-blue-700 p-3 font-semibold rounded-3xl"
              >
                <CustomImage
                  src="/images/chplay.png"
                  alt="CH Play"
                  width={20}
                  height={20}
                />
                <span className="ml-1.5">CH Play</span>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
