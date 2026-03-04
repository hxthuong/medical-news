export const mapping = {
  HOME: {
    all_tintuc_box: {
      vi: [116, 120, 118],
      eng: [210, 215, 218],
    },
    about: { vi: 2, eng: 2 },
    activity_news: { vi: 3, eng: 2 },
    our_mission: { vi: 14, eng: 2 },
    leading_field: { vi: 4, eng: 2 },
    booking_appointment: { vi: 17, eng: 2 },
    service: { vi: 16, eng: 2 },
    feedback: { vi: 7, eng: 2 },
  },
  MENU: {
    "/": { vi: [0, 1], eng: [20040] },
    "/introduction": { vi: 2, eng: 20041 },
    "/organization": { vi: 3, eng: 20045 },
    "/activity": { vi: 4, eng: 20161 },
    "/news": { vi: 5, eng: 20162 },
    "/contact": { vi: 6, eng: 20163 },
    "/health-advice": { vi: 20204, eng: 20266 },
    "https://jcmhch.com.vn/index.php/home": { vi: 20236, eng: null },
  },
  slogan: {
    vi: "Giỏi y thuật - Sáng y đức - Gương mẫu mực - Vì sức khỏe nhân dân",
    eng: "Excellence in medicine - Integrity in practice - A model to follow - Dedicated to the health of the people",
  },
  bookingBtn: {
    vi: "Đặt lịch khám",
    eng: "Schedule exam",
  },
};

type Locale = "vi" | "eng";
type BoxKey = keyof typeof mapping.HOME;
type MenuKey = keyof typeof mapping.MENU;

export function getBoxIds(boxKey: BoxKey, locale: Locale) {
  const box = mapping.HOME[boxKey];
  // box có thể là object {vi: [...], eng: [...]} hoặc {vi: number, eng: number}
  if (!box) return [];

  const boxValue = box[locale];
  return Array.isArray(boxValue) ? boxValue : [boxValue];
}

export function getMenuIds(menuKey: MenuKey, locale: Locale) {
  const menu = mapping.MENU[menuKey];
  // menu có thể là object {vi: [...], eng: [...]} hoặc {vi: number, eng: number}
  if (!menu) return [];

  const menuValue = menu[locale];
  return Array.isArray(menuValue) ? menuValue : [menuValue];
}

export function findMenuKeyByValue(value: number, locale: Locale) {
  return (Object.keys(mapping.MENU) as MenuKey[]).find((key) => {
    const ids = mapping.MENU[key][locale];
    const arr = Array.isArray(ids) ? ids : [ids];
    return arr.includes(value);
  });
}
