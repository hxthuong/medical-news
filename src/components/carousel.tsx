"use client";

import React, { useRef, useState, useEffect } from "react";
import useEmblaCarousel from "embla-carousel-react";
import Autoplay from "embla-carousel-autoplay";
import AutoScroll from "embla-carousel-auto-scroll";
import { ChevronLeft, ChevronRight } from "lucide-react";

interface CarouselProps {
  delay?: number; // autoplay delay, 0 = auto scroll
  children: React.ReactNode;
  itemsToShow?: number; // số item hiển thị mỗi lần
  hasDots?: boolean;
  hasButton?: boolean;
}

const Carousel: React.FC<CarouselProps> = ({
  delay = 0,
  children,
  itemsToShow = 0,
  hasDots = false,
  hasButton = false,
}) => {
  const autoplay = useRef(Autoplay({ delay: delay, stopOnInteraction: false }));

  const plugins = delay <= 0 ? [AutoScroll({ speed: 1 })] : [autoplay.current];

  const [emblaRef, emblaApi] = useEmblaCarousel(
    {
      loop: true,
      slidesToScroll: 1,
      align: itemsToShow === 1 ? "center" : "start", // căn giữa nếu chỉ 1 item
    },
    plugins
  );

  const [selectedIndex, setSelectedIndex] = useState(0);
  const [scrollSnaps, setScrollSnaps] = useState<number[]>([]);

  useEffect(() => {
    if (!emblaApi) return;
    setScrollSnaps(emblaApi.scrollSnapList());
    const onSelect = () => setSelectedIndex(emblaApi.selectedScrollSnap());
    emblaApi.on("select", onSelect);
    onSelect();
  }, [emblaApi]);

  const scrollPrev = () => emblaApi?.scrollPrev();
  const scrollNext = () => emblaApi?.scrollNext();
  const scrollTo = (index: number) => emblaApi?.scrollTo(index);

  const containerPadding =
    itemsToShow > 1
      ? {
          paddingLeft: `calc((100% - ${100 / itemsToShow}%) / 2)`,
          paddingRight: `calc((100% - ${100 / itemsToShow}%) / 2)`,
        }
      : {};

  // Tính toán width mỗi slide dựa trên số items hiển thị
  const slideStyle =
    itemsToShow > 0
      ? {
          flex: `0 0 ${100 / itemsToShow}%`,
        }
      : {};

  return (
    <div className="carousel-wrapper" style={{ position: "relative" }}>
      <div className="embla" ref={emblaRef}>
        <div className="embla__container flex" style={{ ...containerPadding }}>
          {React.Children.map(children, (child) => (
            <div className="embla__slide" style={slideStyle}>
              {child}
            </div>
          ))}
        </div>
      </div>

      {/* Buttons */}
      {hasButton && (
        <>
          <button
            className="embla__prev absolute top-[50%] left-0 transform -translate-y-1/2 bg-blue-800 text-white p-4 rounded-full cursor-pointer z-10"
            onClick={scrollPrev}
          >
            <ChevronLeft />
          </button>
          <button
            className="embla__next absolute top-[50%] right-0 transform -translate-y-1/2 bg-blue-800 text-white p-4 rounded-full cursor-pointer z-10"
            onClick={scrollNext}
          >
            <ChevronRight />
          </button>
        </>
      )}

      {/* Dots */}
      {hasDots && (
        <div className="embla__dots flex justify-center mt-7">
          {scrollSnaps.map((_, index) => (
            <button
              key={index}
              className={`embla__dot ${
                index === selectedIndex ? "is-selected" : ""
              }`}
              onClick={() => scrollTo(index)}
              style={{
                width: "10px",
                height: "10px",
                borderRadius: "50%",
                background:
                  index === selectedIndex ? "var(--blue)" : "var(--light-gray)",
                margin: "0 5px",
                border: "none",
                cursor: "pointer",
              }}
            />
          ))}
        </div>
      )}
    </div>
  );
};

export default Carousel;
