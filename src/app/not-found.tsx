"use client";

import Footer from "@/components/ui/Footer";
import Header from "@/components/ui/Header";
import { useHeader } from "@/context/header";
import { baseUrl } from "@/utils/addBaseUrlToSrc";
import { ChevronLeft } from "lucide-react";
import Link from "next/link";
import { useEffect } from "react";

// app/not-found.tsx
export default function NotFound() {
  const { locale, setHeader } = useHeader();

  useEffect(() => {
    setHeader({
      image: "/images/banner1.jpg",
      title: "404",
      description: locale === "eng" ? "Not found" : "Không tìm thấy trang",
      size: 100,
      imageHeight: 600,
      children: (
        <Link
          href={`${baseUrl}${locale === "eng" ? "?lang=eng" : ""}`}
          rel="noopener noreferrer"
          className="mt-6 text-white flex flex-row items-center justify-center bg-blue-700 font-semibold p-4 rounded-3xl min-w-[160px] hover:bg-white hover:text-blue-700"
        >
          <ChevronLeft />
          <span className="ml-3">
            {locale === "eng" ? "Back to Home" : "Quay lại Trang chủ"}
          </span>
        </Link>
      ),
    });
  }, [setHeader]);

  return <></>;
}
