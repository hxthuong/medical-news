// /Date(1763437834623)/ => yyyy-MM-ddTHH:mm:ss
export const convertStringToDate = (dateStr: string): Date => {
  const timestamp = parseInt(dateStr.match(/\d+/)?.[0] || "0", 10);
  return new Date(timestamp);
};
