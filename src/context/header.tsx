"use client";

import { createContext, useContext, useState } from "react";

export const countries = [
  { id: "vi", label: "", icon: "/flags/vi.png" },
  { id: "eng", label: "", icon: "/flags/eng.png" },
];

export const countriesLabel = [
  { id: "vi", label: "Tiếng Việt", icon: "" },
  { id: "eng", label: "English", icon: "" },
];

type HeaderState = {
  image?: string;
  images?: string[] | [];
  imageHeight?: number;
  title?: string;
  subTitle?: string;
  size?: number;
  description?: string;
  locale?: string;
  children?: React.ReactNode;
};

type HeaderContextType = HeaderState & {
  setHeader: (header: HeaderState) => void;
};

const defaultHeader = {
  image: "/images/banner1.jpg",
  images: [],
  imageHeight: 500,
  title: "",
  subTitle: "",
  size: 36,
  description: "",
  locale: "vi",
  children: null,
};

export const HeaderContext = createContext<HeaderContextType>({
  ...defaultHeader,
  setHeader: () => {},
});

export const useHeader = () => useContext(HeaderContext);

export default function HeaderProvider({
  locale,
  children,
}: {
  locale?: string;
  children: React.ReactNode;
}) {
  const [header, setHeader] = useState<HeaderState>(defaultHeader);

  return (
    <HeaderContext.Provider value={{ ...header, setHeader, locale }}>
      {children}
    </HeaderContext.Provider>
  );
}
