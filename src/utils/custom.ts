export function capitalizeFirstLetter(str: string) {
  if (!str) return "";
  return str.toLowerCase().charAt(0).toUpperCase() + str.slice(1);
}
