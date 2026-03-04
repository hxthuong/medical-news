"use client";
import { useHeader } from "@/context/header";
import { useParams, useRouter, useSearchParams } from "next/navigation";
import { PageProps } from "@/types/page";
import { useEffect, useState } from "react";
import Loading from "@/components/loading";
import Link from "next/link";
import { Building, ChevronRight, ChevronsRight } from "lucide-react";
import CustomImage from "@/components/image";
import { getImageSrc, srcImage } from "@/utils/addBaseUrlToSrc";
import Pagination from "@/components/pagination";
import PageDetail from "@/components/ui/PageDetail";
import findItemByID, { buildMenuTree } from "@/utils/buildMenuTree";
import { useConfig } from "@/hooks/useConfig";
import { mapping } from "@/config/mapping";
import { ListItem } from "@/components/ui/ListItem";

export default function OrganizationPage() {
  const { locale, setHeader } = useHeader();
  const { menuConfig } = useConfig(locale);
  const [data, setData] = useState<PageProps>();
  const router = useRouter();
  const params = useParams();
  const id = params.slug;
  const searchParams = useSearchParams();
  const page = Number(searchParams.get("page")) || 1;
  const menu =
    buildMenuTree(menuConfig?.filter((x) => x.ILEFT === 1) || [], locale).find(
      (x) => x.id === mapping.MENU["/organization"][locale],
    )?.children || [];

  useEffect(() => {
    if (locale) {
      fetch(`/api/news?lang=${locale}&ID=${id}&page=${page}`)
        .then(async (res) => {
          const text = await res.text();
          if (!text) throw new Error("Empty response from server");
          return JSON.parse(text);
        })
        .then(setData)
        .catch(console.error);
    }
  }, [locale, id, page]);

  useEffect(() => {
    if (!data) return;

    setHeader({
      image: "/images/banner1.jpg",
      title: data?.baiviet?.CMETAKEY,
    });
  }, [data]);

  useEffect(() => {
    window.scrollTo({
      top: 0,
      behavior: "smooth", // mượt mà
    });
  }, [page]); // mỗi lần currentPage thay đổi sẽ scroll lên top

  const nums = data?.phantrang?.match(/\d+/g);
  const totalPage = Number(nums ? nums[nums.length - 1] : 1);
  const parentLink =
    data?.parent?.ID === Number(mapping.MENU["/organization"][locale])
      ? ""
      : `/${data?.parent?.ID}`;
  const link = !data?.parent ? "/" : `/organization${parentLink}`;
  const item = findItemByID(menu, Number(id));
  const lastItem = !findItemByID(menu, Number(id))?.children?.find(
    (x) => x.children && x.children.length > 0,
  );

  const list = !lastItem ? item?.children : data?.baiviet_child;

  const createPageLink = (page: number) =>
    router.push(
      `/organization/${id}${locale === "eng" ? "?lang=eng&" : "?"}${page > 1 ? "page=" + page : ""}`,
    );

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
  }, [data, locale, page]);

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
              href={`${locale === "eng" ? `${link}?lang=eng` : link}`}
              className="text-blue-600 hover:underline whitespace-nowrap"
            >
              {!data?.parent
                ? `${locale === "eng" ? "Home" : "Trang chủ"}`
                : data?.parent?.CMETAKEY}
            </Link>
          </li>
          <li>
            <ChevronRight width={16} height={16} />
          </li>
          <li className="text-gray-500 line-clamp-1">
            {data?.baiviet?.CMETAKEY}
          </li>
        </ul>
      </nav>
      <div className="py-6">
        <h3 className="text-blue-800 uppercase text-3xl font-semibold mb-4">
          {data?.baiviet?.CMETAKEY}
        </h3>
        {list && list.length > 0 ? (
          <>
            <div className="grid grid-cols-2 gap-5 mt-10">
              {list.map((item, index) => {
                if (!lastItem)
                  return (
                    <ListItem
                      key={index}
                      icon={
                        <div className="bg-purple-100 p-5 rounded-2xl text-purple-800">
                          <Building />
                        </div>
                      }
                      item={item}
                    />
                  );
                return (
                  <div
                    key={index}
                    className="flex flex-col rounded-2xl shadow-xl group"
                  >
                    <div className="relative rounded-t-2xl after:rounded-t-2xl after:absolute after:inset-0 after:bg-blue-800/30 after:content-[''] after:opacity-0 group-hover:after:opacity-100 after:transition-all after:duration-500 after:ease-in-out">
                      <CustomImage
                        src={
                          `${srcImage(item.CHINHANH)}` ||
                          getImageSrc(item.CNOIDUNG) ||
                          ""
                        }
                        alt={item.CMETAKEY || ""}
                        width={230}
                        height={255}
                        fallbackSrcs={[
                          String(getImageSrc(item.CNOIDUNG)),
                          "/images/noImage.png", // fallback cuối cùng
                        ]}
                        className="w-full h-63.75 rounded-t-2xl object-cover"
                      />
                    </div>
                    <div className="flex flex-col rounded-b-2xl mt-auto py-4 px-4 h-full bg-white">
                      <Link
                        href={`/organization/${item.ID}`}
                        className="text-blue-800 text-xl font-semibold mb-3"
                      >
                        {item.CMETAKEY}
                      </Link>
                    </div>
                  </div>
                );
              })}
            </div>
            <Pagination
              currentPage={page}
              totalPage={totalPage}
              onPageChange={(p) => createPageLink(p)}
            />
          </>
        ) : (
          <PageDetail ID={data?.baiviet?.ID as string} type="organization" />
        )}
      </div>
    </>
  );
}
