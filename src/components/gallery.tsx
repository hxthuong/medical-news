"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import Lightbox, { Plugin, SlideImage } from "yet-another-react-lightbox";
import Thumbnails from "yet-another-react-lightbox/plugins/thumbnails";
import Captions from "yet-another-react-lightbox/plugins/captions";
import Zoom from "yet-another-react-lightbox/plugins/zoom";

import "yet-another-react-lightbox/styles.css";
import "yet-another-react-lightbox/plugins/thumbnails.css";
import "yet-another-react-lightbox/plugins/captions.css";

import { ChevronLeft, ChevronRight } from "lucide-react";

export default function Gallery({ slides }: { slides: SlideImage[] }) {
  const [current, setCurrent] = useState(0);
  const [open, setOpen] = useState(false);

  // ✅ Autoplay chỉ hoạt động khi không mở lightbox
  useEffect(() => {
    if (open) return;

    const timer = setInterval(() => {
      setCurrent((prev) => (prev + 1) % slides.length);
    }, 3000);

    return () => clearInterval(timer);
  }, [open, slides.length]);

  const prev = () =>
    setCurrent((prev) => (prev - 1 + slides.length) % slides.length);

  const next = () => setCurrent((prev) => (prev + 1) % slides.length);

  const thumbsRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const container = thumbsRef.current;
    const activeThumb = container?.children[current] as HTMLElement | undefined;
    if (!container || !activeThumb) return;

    // Compute horizontal scroll position
    const containerRect = container.getBoundingClientRect();
    const thumbRect = activeThumb.getBoundingClientRect();

    // Only scroll horizontally
    const offset =
      thumbRect.left -
      containerRect.left +
      container.scrollLeft -
      (container.clientWidth / 2 - thumbRect.width / 2);

    container.scrollTo({
      left: offset,
      behavior: "smooth",
    });
  }, [current]);

  return (
    <div className="w-full max-w-3xl mx-auto">
      {/* MAIN IMAGE */}
      <div className="relative group">
        {/* Prev button */}
        <button
          onClick={prev}
          className="absolute left-3 top-1/2 -translate-y-1/2 z-10 
                     bg-white/70 hover:bg-white p-2 rounded-full shadow"
        >
          <ChevronLeft size={22} />
        </button>

        {/* Fixed aspect ratio wrapper (không bị nhảy layout) */}
        <div
          onClick={() => setOpen(true)}
          className="relative w-full aspect-square bg-gray-100 rounded-lg overflow-hidden cursor-pointer"
        >
          {slides.map((img, idx) => (
            <Image
              key={idx}
              src={img.src ?? "/images/noImage.png"}
              alt=""
              fill
              priority
              sizes="(max-width: 768px) 100vw, 800px"
              className={`object-contain transition-opacity duration-700 absolute top-0 left-0 w-full h-full
                ${current === idx ? "opacity-100" : "opacity-0"}`}
            />
          ))}
        </div>

        {/* Next button */}
        <button
          onClick={next}
          className="absolute right-3 top-1/2 -translate-y-1/2 z-10 
                     bg-white/70 hover:bg-white p-2 rounded-full shadow"
        >
          <ChevronRight size={22} />
        </button>
      </div>

      {/* THUMBNAILS */}
      <div className="flex gap-3 mt-4 overflow-x-auto" ref={thumbsRef}>
        {slides.map((img, index) => (
          <button
            key={index}
            onClick={() => setCurrent(index)}
            className={`border-2 rounded-md transition ${
              current === index ? "border-blue-500" : "border-transparent"
            }`}
          >
            <div className="relative w-20 h-20">
              <Image
                src={img.src}
                alt=""
                fill
                sizes="80px"
                className="object-cover rounded-md"
              />
            </div>
          </button>
        ))}
      </div>

      {/* LIGHTBOX (không autoplay) */}
      <Lightbox
        open={open}
        close={() => setOpen(false)}
        slides={slides}
        index={current}
        on={{
          view: ({ index }) => setCurrent(index),
        }}
        plugins={[Thumbnails, Captions]}
        thumbnails={{
          position: "bottom",
        }}
        captions={{
          descriptionTextAlign: "center", // ✅ căn giữa text
        }}
        styles={{
          captionsDescriptionContainer: {
            textAlign: "center", // đảm bảo container center
            width: "100%",
          },
        }}
      />
    </div>
  );
}

interface GalleryBoxProps {
  slides: SlideImage[];
  open: boolean;
  setOpen: (open: boolean) => void;
  index?: number;
  setIndex?: (index: number) => void;
  position?: "top" | "bottom" | "start" | "end" | undefined;
  plugins?: Plugin[] | undefined;
}

export function GalleryBox({
  slides,
  open,
  setOpen,
  index = 0,
  setIndex,
  position = "bottom",
  plugins = [Zoom, Thumbnails],
}: GalleryBoxProps) {
  return (
    <Lightbox
      open={open}
      close={() => setOpen(false)}
      slides={slides || []}
      index={index}
      on={{
        view: ({ index }) => setIndex?.(index),
      }}
      plugins={plugins}
      thumbnails={{
        position: position,
      }}
      captions={{
        descriptionTextAlign: "center", // ✅ căn giữa text
      }}
      zoom={{ scrollToZoom: true }}
      styles={{
        captionsDescriptionContainer: {
          textAlign: "center", // đảm bảo container center
          width: "100%",
        },
      }}
    />
  );
}
