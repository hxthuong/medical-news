export type PageProps = {
  baiviet?: NewsProps;
  parent?: NewsProps;
  banner?: string | null;
  post?: NewsProps[];
  baiviet_child?: NewsProps[];
  phantrang?: string | null;
};

export type FeedbackProps = {
  ID?: number | null;
  CHINHANH: string | null;
  CMOTA?: string | null;
  CTIEUDE: string | null;
  CNOIDUNG?: string | null;
  CTEN?: string | null;
  CNOILAMVIEC?: string | null;
  CEMAIL?: string | null;
  CSDT?: string | null;
  DNGAYGUI?: string | null;
  IDANHGIA?: number | null;
};

export type FeedbackPageProps = {
  home_box?: FeedbackProps;
  phanhoi?: FeedbackProps[];
};
