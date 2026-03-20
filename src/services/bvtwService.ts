//src/services/bvtwService.ts
//Lấy dữ liệu page bằng id
export const fetchNewById = async (
  id: string | number,
  page: number = 1,
  lang: string = "vi",
) => {
  const url = `https://bvtwhue.com.vn/Danhmuc/Baiviet_json/?lang=${lang}&ID=${id}&page=${page}`;
  //Fetch server-side
  const res = await fetch(url);

  if (!res.ok) {
    throw new Error(`Failed to fetch news: ${res.status}`);
  }

  const data = await res.json();
  return data;
};

//Lấy dữ liệu trang chủ
export const fetchHome = async (lang: string = "vi") => {
  const url = `https://bvtwhue.com.vn/Home/Index_json/?lang=${lang}`;
  //Fetch server-side
  const res = await fetch(url);

  if (!res.ok) {
    throw new Error(`Failed to fetch home: ${res.status}`);
  }

  const data = await res.json();
  return data;
};

//Lấy dữ liệu config
export const fetchConfig = async (lang: string = "vi") => {
  const url = `https://bvtwhue.com.vn/Home/Ajax_Load_Config_Site/?lang=${lang}`;
  //Fetch server-side
  const res = await fetch(url);

  if (!res.ok) {
    throw new Error(`Failed to fetch config: ${res.status}`);
  }

  const data = await res.json();
  return data;
};

//Lấy dữ liệu page Tư vấn sức khỏe
export const fetchHealthAdvice = async (
  id: string | number,
  lang: string = "vi",
) => {
  const url = `https://bvtwhue.com.vn/Danhmuc/Tuvan_json/?lang=${lang}&ID=${id}`;
  //Fetch server-side
  const res = await fetch(url);

  if (!res.ok) {
    throw new Error(`Failed to fetch health advice: ${res.status}`);
  }

  const data = await res.json();
  return data;
};

//Lấy dữ liệu Góc tri ân
export const fetchFeedback = async (lang: string = "vi") => {
  const url = `https://bvtwhue.com.vn/Danhmuc/Trian_json/?lang=${lang}`;
  //Fetch server-side
  const res = await fetch(url);

  if (!res.ok) {
    throw new Error(`Failed to fetch feedback: ${res.status}`);
  }

  const data = await res.json();
  return data;
};
