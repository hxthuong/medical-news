"use client";
import { useHeader } from "@/context/header";
import Link from "next/link";
import { useEffect, useState } from "react";
import { PageProps } from "@/types/page";
import { mapping } from "@/config/mapping";
import { Building, ChevronRight } from "lucide-react";
import addBaseUrlToSrc from "@/utils/addBaseUrlToSrc";
import { ListItem } from "@/components/ui/ListItem";
import Loading from "@/components/loading";
import { useMenu } from "@/hooks/useMenu";

export default function OrganizationListPage() {
  const { locale, setHeader } = useHeader();
  const [data, setData] = useState<PageProps>();
  const itemType = mapping.MENU["/organization"];
  const id = itemType[locale as keyof typeof itemType];
  const { menu } = useMenu("top", locale);
  const item = menu?.find((x) => x.id === id);

  useEffect(() => {
    fetch(`/api/news?ID=${id}&page=1`)
      .then(async (res) => {
        const text = await res.text();
        if (!text) throw new Error("Empty response from server");
        return JSON.parse(text);
      })
      .then(setData)
      .catch(console.error);
  }, [locale]);

  const title = item?.name ?? "";
  const list = item?.children || [];

  useEffect(() => {
    setHeader({
      image: "/images/banner1.jpg",
      title: title,
    });
  }, [title]);

  const [showLoading, setShowLoading] = useState(!data);
  const [fadeOut, setFadeOut] = useState(false);
  // Hiển thị loading page
  useEffect(() => {
    if (data) {
      setTimeout(() => setFadeOut(true), 0);

      const timer = setTimeout(() => {
        setShowLoading(false);
      }, 300); // phải khớp với CSS transition

      return () => clearTimeout(timer);
    }
  }, [data]);

  return (
    <>
      {showLoading && (
        <div className={`loading ${fadeOut ? "fade-out" : ""}`}>
          <Loading />
        </div>
      )}
      <nav aria-label="Breadcrumb">
        <ul className="flex items-center space-x-2 text-lg">
          <li>
            <Link
              href={`${locale === "eng" ? "/?lang=eng" : "/"}`}
              className="text-blue-600 hover:underline"
            >
              {locale === "eng" ? "Home" : "Trang chủ"}
            </Link>
          </li>
          <li>
            <ChevronRight width={16} height={16} />
          </li>
          <li className="text-gray-500">{title}</li>
        </ul>
      </nav>
      <div className="py-6">
        <h3 className="text-blue-800 uppercase text-3xl font-semibold mb-4 line-clamp-1">
          {title}
        </h3>
        {data?.baiviet?.CNOIDUNG && (
          <div
            className="content-html mt-10"
            dangerouslySetInnerHTML={{
              __html:
                addBaseUrlToSrc(
                  data?.baiviet?.CNOIDUNG ?? "",
                  "https://bvtwhue.com.vn",
                ) ?? "",
            }}
          />
        )}
        <div className="grid grid-cols-2 gap-5 mt-10">
          {list &&
            list.map((item, index) => (
              <ListItem
                key={index}
                icon={
                  <div className="bg-purple-100 p-5 rounded-2xl text-purple-800">
                    <Building />
                  </div>
                }
                item={item}
              />
            ))}
        </div>
      </div>
    </>
  );
}
