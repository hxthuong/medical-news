"use client";

import { useEffect, useState } from "react";
import { PageProps } from "@/types/page";
import addBaseUrlToSrc from "@/utils/addBaseUrlToSrc";
import Loading from "@/components/loading";
import CustomImage from "@/components/image";
import { useSearchParams } from "next/navigation";
import { format } from "date-fns";
import { BookMarked, Clock } from "lucide-react";
import { convertStringToDate } from "@/utils/dateTime";
import RelatedNews from "@/components/ui/RelatedNews";

export default function PageDetail({
  ID,
  type,
}: {
  ID: string;
  type?: string;
}) {
  const [data, setData] = useState<PageProps>();
  const searchParams = useSearchParams();
  const lang = searchParams.get("lang") || "vi";

  useEffect(() => {
    if (!ID) return;
    fetch(`/api/news?ID=${ID}&page=1`)
      .then(async (res) => {
        const text = await res.text();
        if (!text) throw new Error("Empty response from server");
        return JSON.parse(text);
      })
      .then(setData)
      .catch(console.error);
  }, [ID]);

  if (!data) return <Loading />;

  const date = format(
    convertStringToDate(String(data?.baiviet?.DDATE || "")),
    "HH:mm dd/MM/yyyy",
  );

  return (
    <div className="w-full">
      {data?.baiviet?.CNOIDUNG ? (
        <>
          <div className="flex space-x-4">
            <div className="flex space-x-1 items-center text-gray-400">
              <BookMarked className="w-5 h-5" />
              <span>{data?.parent?.CMETAKEY}</span>
            </div>
            <div className="flex space-x-1 items-center text-gray-400">
              <Clock className="w-5 h-5" />
              <span>{date}</span>
            </div>
          </div>
          <div
            className="content-html bg-white py-3 rounded-xl"
            dangerouslySetInnerHTML={{
              __html:
                addBaseUrlToSrc(
                  data?.baiviet?.CNOIDUNG ?? "",
                  "https://bvtwhue.com.vn",
                ) ?? "",
            }}
          />
        </>
      ) : (
        <div className="min-h-100 max-h-fit rounded-2xl flex flex-col items-center justify-center">
          <CustomImage src="/images/noData.jpg" width={200} height={200} />
          <p className="text-xl text-gray-300">
            {lang === "eng" ? "No data" : "Không có dữ liệu"}
          </p>
        </div>
      )}
      <RelatedNews item={data} type={type} />
    </div>
  );
}
