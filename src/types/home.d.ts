export type HomeProps = {
  all_tintuc_box: NewsBoxProps[];
  home_box: HomeBoxProps[];
  marquee_news: NewsProps[];
  news: NewsProps[];
  post: NewsProps[];
  lienket: LogoProps[];
  banner?: { CFILE: string }[];
  popup?: PopupProps;
};

export type PopupProps = {
  ID: number | string;
  TEN: string;
  LIENKET: string;
  APDUNG: number;
  TUNGAY: string;
  DENNGAY: string;
  HINHANH: string;
  ID_NGONNGU: number;
};
