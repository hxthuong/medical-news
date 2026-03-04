"use client";
import { countries, useHeader } from "@/context/header";
import { useConfig } from "@/hooks/useConfig";
import { Clock, Mail, MapPin, Menu, Phone, Search } from "lucide-react";
import localFont from "next/font/local";
import Link from "next/link";
import CustomImage from "@/components/image";
import Carousel from "@/components/carousel";
import { useScreen } from "@/hooks/useScreen";
import Dropdown from "@/components/dropDown";
import { useEffect, useState } from "react";
import { buildMenuTree } from "@/utils/buildMenuTree";
import { MenuProps } from "@/types/menu";
import { Option } from "@/types/dropdown";
import MenuItem from "@/components/ui/MenuItem";
import Modal from "@/components/modal";
import { Button } from "@/components/button";
import { setLocale } from "@/app/actions/set-locale";
import { clearData } from "@/utils/secureStorage";
import { baseUrl } from "@/utils/addBaseUrlToSrc";
import { useSearchParams } from "next/navigation";
const robotoSlab = localFont({
  src: [
    { path: "../../fonts/RobotoSlab-Regular.ttf", weight: "400" },
    { path: "../../fonts/RobotoSlab-Bold.ttf", weight: "700" },
  ],
  variable: "--font-roboto-slab",
});

export default function Header() {
  const { width } = useScreen();
  const {
    image,
    images,
    imageHeight,
    title,
    size,
    description,
    children,
    locale,
  } = useHeader();

  const { config, menuConfig } = useConfig(locale);

  const menu = buildMenuTree(
    menuConfig?.filter((x) => x.ITOP === 1) || [],
    locale,
  );
  const menuHeader: MenuProps[] = [
    ...menu, // copy các phần tử có sẵn
    {
      id: "9",
      name: "",
      href: "",
      icon: <Search width={18} />,
    },
  ];

  const [openIndex, setOpenIndex] = useState<number | null>(null);
  const [open, setOpen] = useState(false);

  const [visibleFixed, setVisibleFixed] = useState(false);

  const searchParams = useSearchParams();

  useEffect(() => {
    const lang = searchParams.get("lang") || "vi";

    if (lang && lang !== locale) {
      // Gọi server action set cookie
      setLocale(lang)
        .then(() => {
          clearData("CONFIG_DATA"); // xóa cache config nếu cần
          // reload lại trang để áp dụng locale mới
          window.location.href =
            lang === "eng" ? `${baseUrl}?lang=eng` : baseUrl;
        })
        .catch(console.error);
    }
  }, [searchParams]);

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, [config]);

  useEffect(() => {
    const handleScroll = () => {
      setVisibleFixed(window.scrollY > 200);
    };

    window.addEventListener("scroll", handleScroll);
    return () => removeEventListener("scroll", handleScroll);
  }, []);

  async function handleSelect(locale: string) {
    await setLocale(locale); // set cookie
    // setLanguage(locale);
    clearData("CONFIG_DATA");
    window.location.href = locale === "eng" ? `${baseUrl}?lang=eng` : baseUrl;
  }

  return (
    <div className="w-full">
      <div className="bg-blue-950 pl-5 pr-2 py-1 text-white">
        {/* 🔹 Thanh thông tin liên hệ (trên cùng) */}
        <div className="relative flex flex-wrap justify-between items-center bg-blue-950 text-white text-sm">
          {width >= 940 ? (
            <div className="flex flex-wrap items-center space-x-5">
              {config?.info_site?.CDIACHI && (
                <div className="flex items-center space-x-2">
                  <MapPin className="text-blue-300" />
                  <span>{config?.info_site?.CDIACHI}</span>
                </div>
              )}
              {config?.info_site?.CSDT && (
                <div className="flex items-center space-x-2">
                  <Phone className="text-blue-300" />
                  <span>{config?.info_site?.CSDT}</span>
                </div>
              )}
              {config?.info_site?.CEMAIL && (
                <div className="flex items-center space-x-2">
                  <Mail className="text-blue-300" />
                  <span>{config?.info_site?.CEMAIL}</span>
                </div>
              )}
              {config?.info_site?.CTHOIGIAN_LAMVIEC && (
                <div className="flex items-center space-x-2">
                  <Clock className="text-blue-300" />
                  <span>{config?.info_site?.CTHOIGIAN_LAMVIEC}</span>
                </div>
              )}
            </div>
          ) : (
            <div className="hover:bg-blue-500 " onClick={() => setOpen(true)}>
              <Menu />
            </div>
          )}

          {/* Nút tải app */}
          <div className="flex space-x-3 mt-0 text-blue-800">
            <div className="store-header flex-1 flex justify-end">
              <div className="flex flex-row space-x-3">
                <Link
                  href="https://apps.apple.com/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-white flex flex-row items-center font-semibold rounded-3xl"
                >
                  <CustomImage
                    src="/images/appstore.png"
                    alt="AppStore"
                    width={28}
                    height={28}
                  />
                </Link>
                <Link
                  href="https://play.google.com/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-white flex flex-row items-center font-semibold rounded-3xl"
                >
                  <CustomImage
                    src="/images/chplay.png"
                    alt="CH Play"
                    width={24}
                    height={24}
                  />
                </Link>
              </div>
            </div>
            <Dropdown
              className="hover:border-blue-400"
              options={countries}
              width={60}
              value={locale}
              onSelect={(country: Option) =>
                handleSelect(country?.id as string)
              }
            />
          </div>
        </div>
      </div>
      <div
        className={`relative w-full flex flex-col banner-container`}
        style={{ minHeight: imageHeight || 500 }}
      >
        <div className="absolute inset-0 min-h-125">
          {images && images.length > 0 ? (
            <Carousel delay={5000} itemsToShow={1}>
              {images.map((slide, index) => (
                <div
                  className="embla__slide flex flex-col justify-center items-center"
                  key={index}
                >
                  <div className="embla__slide__inner w-full banner-slide flex items-center justify-center min-h-125">
                    <CustomImage
                      src={slide as string}
                      alt="Background"
                      fill
                      priority
                      className="object-cover w-full h-full banner-image"
                    />
                  </div>
                </div>
              ))}
            </Carousel>
          ) : (
            <CustomImage
              src={image as string}
              alt="Background"
              fill
              priority
              className="object-cover"
            />
          )}
        </div>
        {/* Lớp phủ gradient */}
        <div className="absolute inset-0 bg-gradient-to-r from-blue-950/60 to-black/40"></div>

        {open && (
          <Modal
            openModal={open}
            onClose={() => setOpen(false)}
            data={menu}
            position="left"
            className="p-4 clickout"
          >
            <div
              className="flex flex-row items-stretch caret-blue-500 border border-gray-400 rounded-xl focus-within:border-blue-500 focus-within:ring-1 focus-within:ring-blue-500 transition-all duration-200 mb-5"
              style={{ padding: 0 }}
            >
              <Button className="bg-transparent rounded-r-xl p-3">
                <Search className="text-gray-400" />
              </Button>
              <input
                type="search"
                className="w-full p-2 rounded-r-xl focus:ring-0 outline-none"
                placeholder="Tìm kiếm..."
              />
            </div>
          </Modal>
        )}

        {/* 🔹 Thanh menu */}
        <div className="relative flex justify-between items-center p-5 border-b border-white">
          <div className="flex space-x-4">
            <CustomImage
              src="/images/logo1.png"
              alt="logo"
              priority
              width={350}
              height={65}
            />
          </div>

          {width >= 940 && !visibleFixed && (
            <div className="flex flex-wrap justify-end space-x-4">
              {menuHeader.map((item, index) => (
                <MenuItem
                  key={index}
                  item={item}
                  isOpen={openIndex === index && !visibleFixed}
                  onClick={
                    () => setOpenIndex(openIndex === index ? null : index) // toggle
                  }
                />
              ))}
            </div>
          )}

          {visibleFixed && width >= 940 && (
            <div className="w-full flex flex-wrap justify-between fixed z-50 top-0 left-0 bg-blue-950 px-15 py-4">
              <div className="flex space-x-4">
                {menu.map((item, index) => (
                  <MenuItem
                    key={index}
                    item={item}
                    isOpen={openIndex === index && visibleFixed}
                    onClick={
                      () => setOpenIndex(openIndex === index ? null : index) // toggle
                    }
                  />
                ))}
              </div>
              <MenuItem
                item={menuHeader[menuHeader.length - 1]}
                isOpen={openIndex === menuHeader.length - 1}
                onClick={
                  () =>
                    setOpenIndex(
                      openIndex === menuHeader.length - 1
                        ? null
                        : menuHeader.length - 1,
                    ) // toggle
                }
              />
            </div>
          )}
        </div>

        {/* 🔹 Hộp thông tin ở giữa ảnh */}
        <div className="relative flex flex-col p-5 justify-center flex-1 text-center">
          <div className="flex flex-wrap space-x-6 justify-center">
            <div>
              <h3
                className={`${robotoSlab.className} ${
                  title === "404" ? "not-found-title" : "header-title"
                } p-4 italic text-red-500`}
                style={{
                  WebkitTextStroke: "2px white",
                  color: "white",
                  fontSize: size || 36,
                }}
              >
                {title}
              </h3>
              {description && (
                <h6
                  className={`${robotoSlab.className} p-4 italic text-xl text-white`}
                >
                  {description}
                </h6>
              )}
              {children}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
