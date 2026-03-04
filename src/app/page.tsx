"use client";
import { Button } from "@/components/button";
import Carousel from "@/components/carousel";
import CustomImage from "@/components/image";
import Loading from "@/components/loading";
import Modal from "@/components/modal";
import { letters } from "@/config/letters";
import { mapping } from "@/config/mapping";
import { useHeader } from "@/context/header";
import { useConfig } from "@/hooks/useConfig";
import useTranslate from "@/hooks/useTranslate";
import { HomeProps } from "@/types/home";
import addBaseUrlToSrc, { srcImage } from "@/utils/addBaseUrlToSrc";
import {
  Calendar,
  ChevronRight,
  ChevronsRight,
  PhoneCall,
  Send,
  Star,
} from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useRef, useState } from "react";

export default function Home() {
  const { setHeader } = useHeader();
  const { locale } = useHeader();
  const [data, setData] = useState<HomeProps | null>(null);
  const { config, keyword } = useConfig(locale);
  const router = useRouter();
  const targetRef = useRef<HTMLDivElement>(null);

  const [nameFAQ, setNameFAQ] = useState("");
  const [phoneFAQ, setPhoneFAQ] = useState("");
  const [emailFAQ, setEmailFAQ] = useState("");
  const [addressFAQ, setAddressFAQ] = useState("");
  const [contentFAQ, setContentFAQ] = useState("");

  const [nameBooking, setNameBooking] = useState("");
  const [phoneBooking, setPhoneBooking] = useState("");
  const [emailBooking, setEmailBooking] = useState("");
  const [contentBooking, setContentBooking] = useState("");

  useEffect(() => {
    setHeader({
      images: ["/images/banner1.jpg", "/images/banner2.png"],
      title: mapping.slogan[locale as keyof typeof mapping.slogan],
      children: (
        <div className="flex justify-center space-x-6 mt-4">
          <Button
            onClick={handleScroll}
            rel="noopener noreferrer"
            className="btn-header text-white flex flex-row items-center justify-center bg-blue-700 font-semibold px-6 py-4 rounded-4xl min-w-[160px] hover:bg-white hover:text-blue-700"
          >
            <Calendar />
            <span className="ml-3">
              {locale === "eng" ? "Schedule exam" : "Đặt lịch khám"}
            </span>
          </Button>
          <Button
            onClick={() =>
              (window.location.href = `/contact${locale === "eng" ? "?lang=" + locale : ""}`)
            }
            rel="noopener noreferrer"
            className="btn-header text-white flex flex-row items-center justify-center bg-blue-700 font-semibold px-6 py-4 rounded-4xl min-w-[160px] hover:bg-white hover:text-blue-700"
          >
            <PhoneCall />
            <span className="ml-3">
              {locale === "eng" ? "Contact us" : "Liên hệ"}
            </span>
          </Button>
        </div>
      ),
    });
  }, []);

  useEffect(() => {
    fetch(`/api/home?lang=${locale}`)
      .then(async (res) => {
        const text = await res.text();
        if (!text) throw new Error("Empty response from server");
        return JSON.parse(text);
      })
      .then(setData)
      .catch(console.error);
  }, []);

  const [showLoading, setShowLoading] = useState(
    !data || !config || data?.popup,
  );
  const [fadeOut, setFadeOut] = useState(false);
  const [open, setOpen] = useState(false);

  // Hiển thị loading page
  useEffect(() => {
    if (data && config) {
      setTimeout(() => setFadeOut(true), 0);

      const timer = setTimeout(() => {
        setShowLoading(false);
      }, 300); // phải khớp với CSS transition

      return () => clearTimeout(timer);
    }
  }, [data, config]);

  useEffect(() => {
    const handleLoad = () => {
      setShowLoading(false);
    };

    if (document.readyState === "complete") {
      setShowLoading(false);
    } else {
      window.addEventListener("load", handleLoad);
      return () => window.removeEventListener("load", handleLoad);
    }
  }, []);

  useEffect(() => {
    if (data && !showLoading) window.scrollTo({ top: 0, behavior: "smooth" });
  }, [data, showLoading]);

  useEffect(() => {
    if (data?.popup != null && !showLoading) {
      setTimeout(() => setOpen(true), 500);
    }
  }, [data, showLoading]);

  const {
    feedbackDescKey,
    scheduleKey,
    contentKey,
    sendMessageKey,
    fullNameKey,
    phoneKey,
    addressKey,
  } = useTranslate(locale);

  const handleScroll = () => {
    targetRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  const newsTitle = keyword.find((x) => x.TUKHOA === "TINMOI")?.NOIDUNG ?? "";
  const viewMore = keyword.find((x) => x.TUKHOA === "XEM_THEM")?.NOIDUNG ?? "";
  const about = data?.home_box?.find((x) => x.ID_MODUNLE === 2);
  const missions = data?.home_box?.filter((x) => x.ID_MODUNLE === 9);
  const homeSpecialties = data?.home_box?.filter((x) => x.ID_MODUNLE === 4);
  const facilities = data?.home_box?.filter((x) => x.ID_MODUNLE === 10);
  const feedback = data?.home_box?.find((x) => x.ID_MODUNLE === 8);

  const professional = data?.all_tintuc_box?.filter(
    (x) => x.ID_DANHMUC === 116 || x.ID_DANHMUC === 20150,
  );

  const featured = data?.all_tintuc_box?.filter(
    (x) => x.ID_DANHMUC === 120 || x.ID_DANHMUC === 20155,
  );

  const socialWork = data?.all_tintuc_box?.filter(
    (x) => x.ID_DANHMUC === 118 || x.ID_DANHMUC === 20152,
  );

  const isShow =
    (professional && professional.length > 0) ||
    (featured && featured.length > 0) ||
    (socialWork && socialWork.length > 0);

  return (
    <>
      {showLoading && (
        <div className={`loading ${fadeOut ? "fade-out" : ""}`}>
          <Loading />
        </div>
      )}
      {data && !showLoading && (
        <>
          <div className="space-y-10 px-1 py-4">
            <Carousel>
              {data?.marquee_news &&
                data?.marquee_news.map((slide, index) => (
                  <div className="embla__slide mr-4" key={index}>
                    <div className="embla__slide__inner">
                      <Link
                        href={`/news/${slide.ID}`}
                        className="flex flex-row items-center text-blue-700 hover:underline hover:cursor-pointer"
                      >
                        <ChevronRight />
                        <h3>{slide.CTIEUDE}</h3>
                      </Link>
                    </div>
                  </div>
                ))}
            </Carousel>
          </div>

          <div className="mx-15 mb-6 news-container grid grid-cols-3 items-stretch gap-x-5">
            <video
              src={`${srcImage(data?.banner ? data?.banner[0].CFILE : "")}`}
              autoPlay
              muted
              // controls
              preload="metadata" // chỉ tải metadata (thời lượng, kích thước) trước
              // poster="/images/poster.jpg"
              className="col-span-2 rounded-2xl object-cover grow"
              style={{ aspectRatio: "16 / 9" }}
              onLoad={() => setShowLoading(false)}
            />
            <div className="col-span-1 news-right">
              <h3 className="text-blue-800 border-b border-b-blue-800 pb-3 uppercase text-2xl font-semibold mb-4">
                {newsTitle}
              </h3>
              {data?.news &&
                data?.news.map((slide, index) => (
                  <div
                    key={index}
                    className="flex flex-row p-3 rounded-2xl items-start hover:cursor-pointer hover:bg-gray-100"
                  >
                    <CustomImage
                      src={`/api/image?url=${encodeURIComponent(srcImage(slide.CHINHANH ?? ""))}`}
                      alt={slide.CTIEUDE}
                      width={100}
                      height={75}
                      className="rounded-xl min-h-18.75"
                      onLoad={() => setShowLoading(false)}
                    />
                    <Link href="/" className="text-blue-800 ml-3">
                      {slide.CTIEUDE}
                    </Link>
                  </div>
                ))}
              <Link
                href={`/news/120`}
                className="text-blue-700 ml-3 flex flex-row items-center space-x-1 justify-end mt-3 hover:text-blue-300"
              >
                <span className="italic">Xem thêm</span>
                <ChevronsRight />
              </Link>
            </div>
          </div>

          {/* Giới thiệu */}
          <div className="bg-gray-100">
            <div className="mx-10 px-4 py-6">
              <h3 className="text-blue-800 uppercase text-3xl font-semibold mb-4">
                {about?.TEN_BOX ?? ""}
              </h3>
              <div
                className="content-html about-content"
                dangerouslySetInnerHTML={{
                  __html:
                    addBaseUrlToSrc(
                      about?.MOTA_BOX ?? "",
                      "https://bvtwhue.com.vn",
                    ) ?? "",
                }}
              />
            </div>
          </div>

          {/* Tin tức hoạt động */}
          {isShow && (
            <div className="pb-3">
              <div className="mx-10 px-4 py-6">
                <h3 className="text-blue-800 uppercase text-3xl font-semibold mb-4 text-center">
                  {locale === "eng" ? "Activity news" : "Tin tức hoạt động"}
                </h3>
                <div className="grid grid-cols-3 gap-5 mt-5">
                  {/* Hoạt động chuyên môn */}
                  {professional && professional.length > 0 && (
                    <div className="activity-news">
                      <h3 className="text-blue-800 border-b border-b-blue-800 pb-3 uppercase text-xl font-semibold mb-4">
                        {professional[0].TEN_DANHMUC ?? ""}
                      </h3>
                      {professional.map((slide, index) => (
                        <div
                          key={index}
                          className={`flex ${
                            index === 0
                              ? "flex-col items-start"
                              : "flex-row items-start"
                          } space-y-3 rounded-2xl  hover:cursor-pointer`}
                          onClick={() => router.push(`/activity/${slide.ID}`)}
                        >
                          <CustomImage
                            src={`/api/image?url=${encodeURIComponent(srcImage(slide.CHINHANH ?? ""))}`}
                            alt={slide.CTIEUDE}
                            className={`rounded-xl object-cover ${
                              index === 0 ? "w-full h-75" : "w-25 h-18.75"
                            }`}
                            width={index === 0 ? 370 : 100}
                            height={index === 0 ? 220 : 75}
                            onLoad={() => setShowLoading(false)}
                          />
                          <h5
                            className={`text-blue-800 ${
                              index === 0
                                ? "mb-3 font-semibold text-lg min-h-15"
                                : "ml-3"
                            }`}
                          >
                            {slide.CTIEUDE}
                          </h5>
                        </div>
                      ))}
                      <Link
                        href="/activity/116"
                        className="text-blue-700 ml-3 flex flex-row items-center space-x-1 justify-end mt-4 hover:text-blue-300"
                      >
                        <span className="italic">{viewMore}</span>
                        <ChevronsRight />
                      </Link>
                    </div>
                  )}

                  {/* Hoạt động nổi bật */}
                  {featured && featured.length > 0 && (
                    <div className="activity-news">
                      <h3 className="text-blue-800 border-b border-b-blue-800 pb-3 uppercase text-xl font-semibold mb-4">
                        {featured[0].TEN_DANHMUC ?? ""}
                      </h3>
                      {featured.map((slide, index) => (
                        <div
                          key={index}
                          className={`flex ${
                            index === 0
                              ? "flex-col items-start"
                              : "flex-row items-start"
                          } space-y-3 rounded-2xl  hover:cursor-pointer`}
                          onClick={() => router.push(`/news/${slide.ID}`)}
                        >
                          <CustomImage
                            src={`/api/image?url=${encodeURIComponent(srcImage(slide.CHINHANH ?? ""))}`}
                            alt={slide.CTIEUDE}
                            className={`rounded-xl object-cover ${
                              index === 0 ? "w-full h-75" : "w-25 h-18.75"
                            }`}
                            width={index === 0 ? 370 : 100}
                            height={index === 0 ? 220 : 75}
                            onLoad={() => setShowLoading(false)}
                          />
                          <h5
                            className={`text-blue-800 ${
                              index === 0
                                ? "mb-3 font-semibold text-lg min-h-15"
                                : "ml-3"
                            }`}
                          >
                            {slide.CTIEUDE}
                          </h5>
                        </div>
                      ))}
                      <Link
                        href="/news/120"
                        className="text-blue-700 ml-3 flex flex-row items-center space-x-1 justify-end mt-4 hover:text-blue-300"
                      >
                        <span className="italic">{viewMore}</span>
                        <ChevronsRight />
                      </Link>
                    </div>
                  )}

                  {/* Hoạt động công tác xã hội */}
                  {socialWork && socialWork.length > 0 && (
                    <div className="activity-news">
                      <h3 className="text-blue-800 border-b border-b-blue-800 pb-3 uppercase text-xl font-semibold mb-4">
                        {socialWork[0].TEN_DANHMUC ?? ""}
                      </h3>
                      {socialWork.map((slide, index) => (
                        <div
                          key={index}
                          className={`flex ${
                            index === 0
                              ? "flex-col items-start"
                              : "flex-row items-start"
                          } space-y-3 rounded-2xl  hover:cursor-pointer`}
                          onClick={() => router.push(`/activity/${slide.ID}`)}
                        >
                          <CustomImage
                            src={`/api/image?url=${encodeURIComponent(srcImage(slide.CHINHANH ?? ""))}`}
                            alt={slide.CTIEUDE}
                            className={`rounded-xl object-cover ${
                              index === 0 ? "w-full h-75" : "w-25 h-18.75"
                            }`}
                            width={index === 0 ? 370 : 100}
                            height={index === 0 ? 220 : 75}
                            onLoad={() => setShowLoading(false)}
                          />
                          <h5
                            className={`text-blue-800 ${
                              index === 0
                                ? "mb-3 font-semibold text-lg min-h-15"
                                : "ml-3"
                            }`}
                          >
                            {slide.CTIEUDE}
                          </h5>
                        </div>
                      ))}
                      <Link
                        href="/activity/118"
                        className="text-blue-700 ml-3 flex flex-row items-center space-x-1 justify-end mt-4 hover:text-blue-300"
                      >
                        <span className="italic">{viewMore}</span>
                        <ChevronsRight />
                      </Link>
                    </div>
                  )}
                </div>
              </div>
            </div>
          )}

          {/* Nhiệm vụ của chúng tôi */}
          <div className={`${isShow ? "bg-gray-100" : ""} pb-3`}>
            <div className="mx-10 px-4 py-6">
              <h3 className="text-blue-800 uppercase text-3xl font-semibold mb-4 text-center">
                {missions && missions[0]?.TEN_BOX}
              </h3>
              <div className="grid grid-cols-5 gap-5 justify-between items-stretch">
                {missions &&
                  missions.map((slide, index) => {
                    const id = slide.LINK?.match(/ID=(\d+)/)?.[1];

                    return (
                      <div
                        key={index}
                        className="flex flex-col rounded-2xl shadow-xl hover:cursor-pointer"
                        onClick={() => router.push(`/activity/${id}`)}
                      >
                        <CustomImage
                          src={`/api/image?url=${encodeURIComponent(srcImage(slide.ICON ?? ""))}`}
                          alt={slide.TIEUDE}
                          width={230}
                          height={255}
                          // priority={index === 0}
                          className="rounded-t-2xl w-full h-63.75 object-cover banner-image"
                          onLoad={() => setShowLoading(false)}
                        />
                        <div className="flex flex-col rounded-b-2xl mt-auto pt-3 px-2 h-full bg-white">
                          <h4 className="text-blue-800 uppercase text-xl font-semibold mb-4 text-center">
                            {slide.TIEUDE.replace("</br>", "")}
                          </h4>
                        </div>
                      </div>
                    );
                  })}
              </div>
            </div>
          </div>

          {/* Lĩnh vực đầu ngành */}
          <div className={`${!isShow ? "bg-gray-100" : ""} pb-3`}>
            <div className="mx-10 px-4 py-6">
              <h3 className="text-blue-800 uppercase text-3xl font-semibold mb-4 text-center">
                {homeSpecialties && homeSpecialties[0]?.TEN_BOX}
              </h3>
              <div className="grid grid-cols-5 gap-5">
                {homeSpecialties &&
                  homeSpecialties.map((slide, index) => {
                    const id = slide.LINK?.match(/ID=(\d+)/)?.[1];
                    return (
                      <div
                        key={index}
                        className="flex flex-col rounded-2xl shadow-xl hover:cursor-pointer"
                        onClick={() => router.push(`/activity/${id}`)}
                      >
                        <CustomImage
                          src={`/api/image?url=${encodeURIComponent(srcImage(slide.ICON ?? ""))}`}
                          alt={slide.TIEUDE}
                          width={230}
                          height={255}
                          // priority={index === 0}
                          className="rounded-t-2xl w-full h-63.75 object-cover"
                          onLoad={() => setShowLoading(false)}
                        />
                        <div className="flex flex-col rounded-b-2xl mt-auto pt-3 px-2 h-full bg-white text-center">
                          <h4 className="text-blue-800 uppercase text-xl font-semibold">
                            {slide.TIEUDE}
                          </h4>
                          <p className="px-3 pt-3 mb-3 text-gray-500 text-[16px] line-clamp-4">
                            {slide.MOTA}
                          </p>
                        </div>
                      </div>
                    );
                  })}
              </div>
            </div>
          </div>

          {/* Dịch vụ tiện ích */}
          <div className={`${isShow ? "bg-gray-100" : ""} pb-3`}>
            <div className="mx-10 px-4 py-6">
              <h3 className="text-blue-800 uppercase text-3xl font-semibold mb-4 text-center">
                {facilities && facilities[0]?.TEN_BOX}
              </h3>
              <div className="grid grid-cols-2 gap-5">
                {facilities &&
                  facilities.map((slide, index) => (
                    <div
                      key={index}
                      className="flex flex-row p-4 border border-gray-200 rounded-xl shadow-xl bg-white items-start"
                    >
                      <CustomImage
                        src={`/api/image?url=${encodeURIComponent(srcImage(slide.ICON ?? ""))}`}
                        alt={slide.TIEUDE}
                        width={120}
                        height={120}
                        // priority={index === 0}
                        className="rounded-xl max-h-30 object-cover"
                        onLoad={() => setShowLoading(false)}
                      />
                      <div className="flex flex-col mt-auto px-3 h-full">
                        <h5 className="text-blue-800 uppercase text-xl font-semibold">
                          {slide.TIEUDE}
                        </h5>
                        <p className="text-gray-500 text-sm">{slide.MOTA}</p>
                      </div>
                    </div>
                  ))}
              </div>
            </div>
          </div>

          {/* Hỏi đáp & góp ý - Đặt lịch khám */}
          <div
            className="w-full min-h-112.5 grid grid-cols-2 pb-3 bg-cover bg-center"
            style={{
              backgroundImage:
                "url('https://pixydrops.com/mediox-html/assets/images/shapes/multiple-sec-bg.png')",
            }}
          >
            <div className="mx-10 px-4 py-6">
              <h3 className="text-blue-800 uppercase text-3xl font-semibold mb-4">
                {feedback?.TEN_BOX}
              </h3>
              <p className="text-gray-500">{feedbackDescKey}</p>
              <div className="mt-5">
                <div className="grid grid-cols-2 gap-5 ">
                  <input
                    className="form-input"
                    type="text"
                    placeholder={`${fullNameKey} *`}
                    value={nameFAQ}
                    onChange={(e) => setNameFAQ(e.target.value)}
                  />
                  <input
                    className="form-input"
                    type="text"
                    placeholder={`${phoneKey}`}
                    value={phoneFAQ}
                    onChange={(e) => setPhoneFAQ(e.target.value)}
                  />
                  <input
                    className="form-input"
                    type="text"
                    placeholder="Email *"
                    value={emailFAQ}
                    onChange={(e) => setEmailFAQ(e.target.value)}
                  />
                  <input
                    className="form-input"
                    type="text"
                    placeholder={`${addressKey}`}
                    value={addressFAQ}
                    onChange={(e) => setAddressFAQ(e.target.value)}
                  />
                </div>
                <textarea
                  className="form-input mt-5 resize-none"
                  placeholder={`${contentKey}...`}
                  rows={3}
                  value={contentFAQ}
                  onChange={(e) => setContentFAQ(e.target.value)}
                />
                <Link
                  href=""
                  rel="noopener noreferrer"
                  className="text-white max-w-50 mt-3 flex flex-row items-center justify-center bg-blue-700 font-semibold p-4 rounded-3xl hover:bg-white hover:text-blue-700"
                >
                  <Send />
                  <span className="ml-3">{sendMessageKey}</span>
                </Link>
              </div>
            </div>
            <div className="mx-10 px-4 py-6" ref={targetRef}>
              <h3 className="text-blue-800 uppercase text-3xl font-semibold mb-4">
                {scheduleKey}
              </h3>
              <p className="text-gray-500">{`${contentKey}...`}</p>
              <div className="mt-5">
                <div className="grid grid-cols-2 gap-5 ">
                  <input
                    className="form-input"
                    type="text"
                    placeholder={`${fullNameKey} *`}
                    value={nameBooking}
                    onChange={(e) => setNameBooking(e.target.value)}
                  />
                  <input
                    className="form-input"
                    type="text"
                    placeholder={`${phoneKey}`}
                    value={phoneBooking}
                    onChange={(e) => setPhoneBooking(e.target.value)}
                  />
                </div>
                <input
                  className="form-input my-5"
                  type="text"
                  placeholder="Email *"
                  value={emailBooking}
                  onChange={(e) => setEmailBooking(e.target.value)}
                />
                <textarea
                  className="form-input resize-none"
                  placeholder={`${contentKey}...`}
                  rows={3}
                  value={contentBooking}
                  onChange={(e) => setContentBooking(e.target.value)}
                />
                <Link
                  href=""
                  rel="noopener noreferrer"
                  className="text-white max-w-50 mt-3 flex flex-row items-center justify-center bg-blue-700 font-semibold p-4 rounded-3xl hover:bg-white hover:text-blue-700"
                >
                  <Calendar />
                  <span className="ml-3">
                    {locale === "eng" ? "Schedule exam" : "Đặt lịch khám"}
                  </span>
                </Link>
              </div>
            </div>
          </div>

          <div className="bg-white pb-5">
            {/* Góc tri ân */}
            <div className="pb-3">
              <div className="max-w-4xl mx-auto px-4 py-6">
                <div className="text-center">
                  <h3 className="text-blue-800 uppercase text-3xl font-semibold mb-4">
                    {feedback?.TEN_BOX}
                  </h3>
                  <p className="text-gray-400">{feedback?.MOTA_BOX}</p>
                </div>
                <div className="space-y-10 my-5">
                  <Carousel delay={5000} hasDots={true} itemsToShow={1}>
                    {letters.map((slide, index) => (
                      <div
                        className="embla__slide flex flex-col justify-center items-center"
                        key={index}
                        // style={{ flex: "0 0 100%" }} // slide chiếm toàn bộ width Embla
                      >
                        <div className="flex flex-col mt-auto py-4 px-2 h-full text-center min-h-30">
                          <h4 className="text-blue-800 uppercase text-xl font-semibold">
                            {locale === "eng" ? slide.nameEng : slide.name}
                          </h4>
                          <div className="flex flex-row justify-center">
                            {[1, 2, 3, 4, 5].map((_, index) => (
                              <Star
                                key={index}
                                size={24}
                                color="gold"
                                style={{ fill: "gold", stroke: "gold" }}
                              />
                            ))}
                          </div>
                        </div>
                        <div className="embla__slide__inner w-full h-125 flex items-center justify-center bg-gray-100">
                          <CustomImage
                            src={slide.src}
                            alt={slide.name}
                            width={400}
                            height={400}
                            className="object-contain w-full h-full"
                            // priority={index === 0}
                            onLoad={() => setShowLoading(false)}
                          />
                        </div>
                      </div>
                    ))}
                  </Carousel>
                </div>
                <div className="text-center">
                  <Button
                    rel="noopener noreferrer"
                    className="text-lg btn-header text-white flex flex-row items-center justify-center bg-blue-700 font-semibold px-6 py-4 rounded-4xl min-w-[160px] hover:bg-white hover:text-blue-700"
                    onClick={() => {
                      router.push(
                        `/feedback${locale === "eng" ? "?lang=eng" : ""}`,
                      );
                      requestAnimationFrame(() => {
                        document.body.scrollTop =
                          document.documentElement.scrollTop = 0;
                      });
                    }}
                  >
                    {viewMore}
                  </Button>
                </div>
              </div>
            </div>

            {/* List logo */}
            <div className="space-y-10 mx-15 flex items-stretch space-x-4 h-20">
              <Carousel delay={3000}>
                {data?.lienket &&
                  data?.lienket.map((slide, index) => (
                    <div className="embla__slide mr-4" key={index}>
                      <div className="embla__slide__inner">
                        <Link href={slide.CLINK || "/"} target="_blank">
                          <CustomImage
                            src={`/api/image?url=${encodeURIComponent(srcImage(slide.CHINHANH ?? ""))}`}
                            alt={slide.CTEN || `Slide ${index + 1}`}
                            width={300}
                            height={80}
                            className="object-cover w-full h-full rounded-xl"
                            // priority={index === 0}
                            onLoad={() => setShowLoading(false)}
                          />
                        </Link>
                      </div>
                    </div>
                  ))}
              </Carousel>
            </div>
          </div>

          {!showLoading && (
            <Modal
              className="min-h-125 clickout"
              width="900px"
              data={[]}
              position="center"
              openModal={open}
              onClose={() => setOpen(false)}
            >
              <Link href={data?.popup?.LIENKET ?? "/"} target="_blank">
                <CustomImage
                  src={`/api/image?url=${encodeURIComponent(srcImage(data?.popup?.HINHANH ?? ""))}`}
                  alt={data?.popup?.TEN}
                  fill
                  // priority={index === 0}
                  className="rounded-xl min-h-18.75"
                  onLoad={() => setShowLoading(false)}
                />
              </Link>
            </Modal>
          )}
        </>
      )}
    </>
  );
}
