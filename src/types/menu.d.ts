import { NewsProps } from "@/types/news";

export type MenuProps = {
  id: string | number;
  name: string;
  href?: string;
  level?: number;
  icon?: React.ReactNode;
  image?: string;
  type?: string;
  children?: MenuProps[];
};

export type MenuNewsProps = NewsProps & {
  href: string;
  level?: number;
  children?: MenuNewsProps[];
  type?: string;
};
