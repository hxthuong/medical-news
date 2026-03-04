"use client";

import Sidebar from "@/components/ui/Sidebar";
import { useScreen } from "@/hooks/useScreen";

export default function MainLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const { width } = useScreen();

  return (
    <div className="w-full my-6">
      <div className="mx-10 flex flex-row justify-between items-start space-x-10">
        <div className="flex-1 left-container">{children}</div>
        {width >= 1024 && <Sidebar />}
      </div>
      {/* List logo */}
      {/* <div className="space-y-10 mx-10 flex items-stretch space-x-4 h-20 mt-10">
        <Carousel delay={3000}>
          {listLogo.map((slide, index) => (
            <div className="embla__slide mr-4" key={index}>
              <div className="embla__slide__inner">
                <Link href={slide.href || "/"} target="_blank">
                  <CustomImage
                    src={slide.src}
                    alt={slide.alt || `Slide ${index + 1}`}
                    width={200}
                    height={80}
                    className="object-cover w-full h-full rounded-xl"
                    priority={index === 0}
                  />
                </Link>
              </div>
            </div>
          ))}
        </Carousel>
      </div> */}
    </div>
  );
}
