import { useEffect, useState } from "react";
import { PageProps } from "@/types/page";
import CustomImage from "@/components/image";
import Link from "next/link";
import { NewsProps } from "@/types/news";
import { ChevronsRight } from "lucide-react";
import { useHeader } from "@/context/header";
import { getImageSrc, srcImage } from "@/utils/addBaseUrlToSrc";
import { convertStringToDate } from "@/utils/dateTime";
import { useScreen } from "@/hooks/useScreen";

interface RelatedNewsProps {
  item: PageProps;
  type?: string;
}

export default function RelatedNews({ item, type }: RelatedNewsProps) {
  const [data, setData] = useState<PageProps>();
  const { locale } = useHeader();
  const { width } = useScreen();

  useEffect(() => {
    if (!type) return;

    fetch(
      `/api/${type === "activity" ? "news" : type}?ID=${
        item?.parent?.ID
      }&page=1`,
    )
      .then(async (res) => {
        const text = await res.text();
        if (!text) throw new Error("Empty response from server");
        return JSON.parse(text);
      })
      .then(setData)
      .catch(console.error);
  }, []);

  if (!data) return <></>;

  const list: NewsProps[] =
    data?.post
      ?.filter((x) => x.ID !== item?.baiviet?.ID)
      .sort((a: NewsProps, b: NewsProps) => {
        return (
          convertStringToDate(b.DDATE as string).getTime() -
          convertStringToDate(a.DDATE as string).getTime()
        );
      }) || [];

  const latestList = list && list.length > 0 ? list.slice(0, 5) : [];

  return list && list.length > 0 ? (
    <div className="space-y-3 border-t border-t-gray-300 pt-5 mt-5">
      <h4 className="text-gray-500 uppercase text-2xl font-semibold mb-4">
        {locale === "eng" ? "Related news" : "Tin liên quan"}
      </h4>
      {latestList &&
        latestList.map((post, index) => (
          <div
            key={index}
            className="flex related-item p-4 rounded-xl shadow-xl bg-white items-start hover:cursor-pointer border border-gray-200"
          >
            <CustomImage
              src={
                `${srcImage(post.CHINHANH as string)}` ||
                getImageSrc(post.CNOIDUNG as string) ||
                ""
              }
              alt={post.CMETAKEY || ""}
              width={230}
              height={width >= 940 ? 150 : 255}
              fallbackSrcs={[
                String(getImageSrc(post.CNOIDUNG as string)),
                "/images/noImage.png", // fallback cuối cùng
              ]}
              className={`${width >= 940 ? "w-57.5" : "w-full"} rounded-xl`}
            />
            <div className="flex flex-col px-3 h-full">
              <Link
                href={`/${type}/${post?.ID}`}
                className="text-blue-800 text-xl font-semibold hover:text-blue-500"
              >
                {post.CMETAKEY}
              </Link>
              {post.CMETADES !== post.CMETAKEY && (
                <p className="text-gray-500 text-sm line-clamp-4">
                  {post.CMETADES}
                </p>
              )}
            </div>
          </div>
        ))}
      {list && list.length > 5 && (
        <Link
          href={`/${type}/${item?.parent?.ID}`}
          className="text-blue-700 text-lg ml-3 flex flex-row items-center space-x-1 justify-end mt-6 hover:text-blue-300"
        >
          <span className="italic">
            {locale === "eng" ? "View more" : "Xem thêm"}
          </span>
          <ChevronsRight />
        </Link>
      )}
    </div>
  ) : (
    <></>
  );
}
