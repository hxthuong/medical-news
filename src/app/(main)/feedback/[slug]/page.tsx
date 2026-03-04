"use client";
import { useHeader } from "@/context/header";
import { useParams, useSearchParams } from "next/navigation";
import { FeedbackProps } from "@/types/page";
import { useEffect, useState } from "react";
import Loading from "@/components/loading";
import Link from "next/link";
import { ChevronRight, Star } from "lucide-react";
import CustomImage from "@/components/image";
import { srcImage } from "@/utils/addBaseUrlToSrc";

export default function FeedbackPage() {
  const { locale, setHeader } = useHeader();
  const [data, setData] = useState<FeedbackProps>();
  const params = useParams();
  const id = params.slug;
  const searchParams = useSearchParams();
  const page = Number(searchParams.get("page")) || 1;

  useEffect(() => {
    fetch(`/api/feedback?lang=${locale}`)
      .then(async (res) => {
        const text = await res.text();
        if (!text) throw new Error("Empty response from server");
        return JSON.parse(text);
      })
      .then((res) => {
        const item = res?.phanhoi.find((x) => x.ID === Number(id));
        setData(item);
      })
      .catch(console.error);
  }, [locale]);

  useEffect(() => {
    if (!data) return;

    setHeader({
      image: "/images/banner1.jpg",
      title: data?.CTEN ?? "",
    });
  }, [data]);

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
  }, [data, page]);

  useEffect(() => {
    window.scrollTo({
      top: 0,
      behavior: "smooth", // mượt mà
    });
  }, [locale]); // mỗi lần currentPage thay đổi sẽ scroll lên top

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
              href={`${locale === "eng" ? `/feedback?lang=eng` : "/feedback"}`}
              className="text-blue-600 hover:underline whitespace-nowrap"
            >
              {locale === "eng" ? "Feedback" : "Góc tri ân"}
            </Link>
          </li>
          <li>
            <ChevronRight width={16} height={16} />
          </li>
          <li className="text-gray-500 line-clamp-1">{data?.CTEN}</li>
        </ul>
      </nav>
      <div className="py-6">
        <h3 className="text-blue-800 uppercase text-3xl font-semibold mb-4">
          {data?.CTEN}
        </h3>
        {data?.CHINHANH && (
          <div className="flex flex-col mt-auto py-4 px-2 h-full text-center min-h-30">
            <div className="flex flex-row justify-center">
              {Array.from({ length: data?.IDANHGIA ?? 1 }).map((_, index) => (
                <Star
                  key={index}
                  size={24}
                  color="gold"
                  style={{ fill: "gold", stroke: "gold" }}
                />
              ))}
            </div>
            <div className="w-full flex justify-center mt-5">
              <CustomImage
                src={srcImage(data?.CHINHANH)}
                alt={data?.CTEN ?? ""}
                width={600}
                height={400}
                className="w-full! h-auto! view"
                onLoad={() => setShowLoading(false)}
              />
            </div>
          </div>
        )}
      </div>
    </>
  );
}
