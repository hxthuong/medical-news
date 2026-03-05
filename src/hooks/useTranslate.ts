import { useConfig } from "@/hooks/useConfig";

export default function useTranslate(lang: string = "") {
  const { keyword, visits, infoSite } = useConfig(lang);

  const detailKey = keyword?.find((x) => x.TUKHOA === "XEM_CHI_TIET")?.NOIDUNG;
  const fullNameKey = keyword?.find((x) => x.TUKHOA === "HO_VA_TEN")?.NOIDUNG;
  const addressKey = keyword?.find((x) => x.TUKHOA === "DIA_CHI")?.NOIDUNG;
  const phoneKey = keyword?.find((x) => x.TUKHOA === "DIEN_THOAI")?.NOIDUNG;
  const searchKey = keyword?.find((x) => x.TUKHOA === "TIM_KIEM")?.NOIDUNG;
  const relatedKey = keyword?.find(
    (x) => x.TUKHOA === "TIN_LIEN_QUAN",
  )?.NOIDUNG;
  const sendMessageKey = keyword?.find(
    (x) => x.TUKHOA === "GUI_LIENHE",
  )?.NOIDUNG;
  const feedbackKey = keyword?.find((x) => x.TUKHOA === "HOIDAP_GOPY")?.NOIDUNG;
  const feedbackDescKey = keyword?.find(
    (x) => x.TUKHOA === "HOIDAP_GOPY_MOTA",
  )?.NOIDUNG;
  const contentKey = keyword?.find(
    (x) => x.TUKHOA === "NOIDUNG_TINNHAN",
  )?.NOIDUNG;
  const workingTimeKey = keyword?.find(
    (x) => x.TUKHOA === "THOIGIAN_LAMVIEC",
  )?.NOIDUNG;
  const relatedPageKey = keyword?.find(
    (x) => x.TUKHOA === "BAIVIET_LIENQUAN",
  )?.NOIDUNG;
  const successNotifKey = keyword?.find(
    (x) => x.TUKHOA === "THONGBAO_NHANTINNHAN_THANHCONG",
  )?.NOIDUNG;
  const viewMoreKey = keyword?.find((x) => x.TUKHOA === "XEM_THEM")?.NOIDUNG;
  const newsKey = keyword?.find((x) => x.TUKHOA === "TINMOI")?.NOIDUNG;
  const scheduleKey = keyword?.find((x) => x.TUKHOA === "DATLICHKHAM")?.NOIDUNG;
  const contactKey = keyword?.find((x) => x.TUKHOA === "KETNOI")?.NOIDUNG;
  const copyrightKey = keyword?.find(
    (x) => x.TUKHOA === "FOOTER_BANQUYEN",
  )?.NOIDUNG;
  const editorKey = keyword?.find(
    (x) => x.TUKHOA === "FOOTER_BIENTAP",
  )?.NOIDUNG;

  return {
    detailKey,
    fullNameKey,
    addressKey,
    phoneKey,
    searchKey,
    relatedKey,
    sendMessageKey,
    feedbackKey,
    feedbackDescKey,
    contentKey,
    workingTimeKey,
    relatedPageKey,
    successNotifKey,
    viewMoreKey,
    newsKey,
    scheduleKey,
    contactKey,
    copyrightKey,
    editorKey,
    visits,
    infoSite,
  };
}
