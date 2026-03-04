import { NewsProps } from "@/types/news";

export type ConfigProps = {
  truycap?: VisitProps;
  info_site?: InfoSiteProps;
  thuvienanh?: NewsProps[];
  menu?: NewsProps[];
  tukhoa?: KeywordProps[];
  list_ngonngu?: KeywordProps[];
};

export type LanguageProps = {
  ID: number;
  CTEN: string;
  CLOGO: string;
  CVIETTAT: string;
};

export type KeywordProps = {
  TUKHOA: string;
  NOIDUNG: string;
};

export type InfoSiteProps = {
  ID: number;
  ID_NGONNGU: number;
  CTEN: string | null;
  CSDT: string | null;
  CFAX: string | null;
  CEMAIL: string | null;
  CDIACHI: string | null;
  CLOGO: string | null;
  CTHOIGIAN_LAMVIEC: string | null;
  CBANNER: string | null;
};

export type VisitProps = {
  TRUYCAP_NAM: number;
  TRUYCAP_THANG: number;
  TRUYCAP_NGAY: number;
  DANG_ONLINE: number;
};
