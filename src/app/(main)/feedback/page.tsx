"use client";
import { useHeader } from "@/context/header";
import Link from "next/link";
import { useEffect, useState } from "react";
import { FeedbackPageProps } from "@/types/page";
import { ChevronRight, ChevronsRight } from "lucide-react";
import { srcImage } from "@/utils/addBaseUrlToSrc";
import Loading from "@/components/loading";
import CustomImage from "@/components/image";

export default function FeedbackListPage() {
  const { locale, setHeader } = useHeader();
  const [data, setData] = useState<FeedbackPageProps>();

  useEffect(() => {
    fetch(`/api/feedback?lang=${locale}`)
      .then(async (res) => {
        const text = await res.text();
        if (!text) throw new Error("Empty response from server");
        return JSON.parse(text);
      })
      .then(setData)
      .catch(console.error);
  }, [locale]);

  const title = data?.home_box?.CTIEUDE ?? "";
  const desc = data?.home_box?.CMOTA ?? "";
  const list = data?.phanhoi || [];

  useEffect(() => {
    setHeader({
      image: "/images/banner1.jpg",
      title: title,
      description: desc,
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

  // useEffect(() => {
  //   if (data && !showLoading) window.scrollTo({ top: 0, behavior: "smooth" });
  // }, [data, showLoading]);

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
        <div className="grid grid-cols-2 gap-5 mt-10">
          {list &&
            list.map((item, index) => {
              return (
                <div
                  key={index}
                  className="flex flex-col rounded-2xl shadow-xl group"
                >
                  <div className="relative rounded-t-2xl after:rounded-t-2xl after:absolute after:inset-0 after:bg-blue-800/30 after:content-[''] after:opacity-0 group-hover:after:opacity-100 after:transition-all after:duration-500 after:ease-in-out">
                    <CustomImage
                      src={`${srcImage(item.CHINHANH ?? "")}` || ""}
                      alt={item.CTEN || ""}
                      width={230}
                      height={255}
                      fallbackSrcs={[
                        "/images/noImage.png", // fallback cuối cùng
                      ]}
                      className="w-full h-63.75 rounded-t-2xl object-cover"
                    />
                  </div>
                  <div className="flex flex-col rounded-b-2xl mt-auto py-4 px-4 h-full bg-white">
                    <Link
                      href={`/feedback/${item.ID}`}
                      className="text-blue-800 text-xl font-semibold mb-3"
                    >
                      {item.CTEN}
                    </Link>
                    <p className="text-gray-500 text-lg line-clamp-3">
                      {item.CMOTA || ""}
                    </p>
                  </div>
                  <Link
                    className="text-blue-700 text-lg p-4 ml-3 flex flex-row items-center space-x-1 justify-end mt-3 hover:text-blue-300"
                    href={`/feedback/${item?.ID}`}
                  >
                    <span>{locale === "eng" ? "View more" : "Xem thêm"}</span>
                    <ChevronsRight />
                  </Link>{" "}
                </div>
              );
            })}
        </div>
      </div>
    </>
  );
}
