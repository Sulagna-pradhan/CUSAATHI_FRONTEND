export const readCookie = (name: string): string | null => {
  name = name.replace(/([.*+?^=!:${}()|[\]\/\\])/g, "\\$1");
  const regex = new RegExp("(?:^|;)\\s?" + name + "=(.*?)(?:;|$)", "i");
  const match = document.cookie.match(regex);
  return match && decodeURIComponent(match[1]);
};
