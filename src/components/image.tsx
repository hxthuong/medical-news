import { useState, useEffect, useMemo } from "react";
import Image, { ImageProps } from "next/image";
import { getValueFromClass } from "@/utils/getValueFromClass";
import { GalleryBox } from "./gallery";

interface CustomImageProps extends Omit<ImageProps, "src" | "alt"> {
  src?: string;
  alt?: string;
  width?: number;
  height?: number;
  priority?: boolean;
  fill?: boolean;
  className?: string;
  fallbackSrcs?: string[];
  onClick?: React.MouseEventHandler<HTMLImageElement>; // thêm onClick riêng
}

export default function CustomImage({
  src,
  alt,
  width,
  height,
  priority,
  fill,
  className,
  fallbackSrcs = ["/images/noImage.png"], // luôn có ít nhất 1 fallback
  ...props
}: CustomImageProps) {
  // Danh sách src thử nghiệm: src + fallbackSrcs
  const srcList = useMemo(
    () => (src ? [src, ...fallbackSrcs] : [...fallbackSrcs]),
    [src, fallbackSrcs],
  );

  const [currentSrc, setCurrentSrc] = useState(srcList[0]);
  const [open, setOpen] = useState(false);
  const isView = className?.includes("view");

  useEffect(() => {
    if (typeof window === "undefined") return; // SSR skip

    let cancelled = false;

    const tryNextImage = (index: number) => {
      if (index >= srcList.length) return;

      const img = new window.Image(); // chắc chắn trên client
      img.src = srcList[index];

      img.onload = () => {
        if (!cancelled) setCurrentSrc(srcList[index]);
      };

      img.onerror = () => {
        tryNextImage(index + 1);
      };
    };

    tryNextImage(0);

    return () => {
      cancelled = true;
    };
  }, [srcList]);

  const widthValue = getValueFromClass(className, "w-", /w-\[(.*?)\]/);

  return (
    <>
      <Image
        src={currentSrc}
        alt={alt || ""}
        {...(!priority ? { loading: "lazy" } : { priority })}
        {...(!fill ? { width, height } : { fill })}
        style={
          !fill
            ? {
                width: widthValue ? widthValue : width || "auto",
                height: height || "auto",
              }
            : undefined
        }
        className={className}
        onError={() => {
          const currentIndex = srcList.indexOf(currentSrc);
          if (currentIndex < srcList.length - 1) {
            setCurrentSrc(srcList[currentIndex + 1]);
          }
        }}
        onClick={() => setOpen(true)}
        {...props}
      />
      {isView && (
        <GalleryBox
          slides={[{ src: currentSrc, description: alt }]}
          open={open}
          setOpen={setOpen}
        />
      )}
    </>
  );
}
