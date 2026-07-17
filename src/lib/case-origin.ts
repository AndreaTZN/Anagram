const KEY = "case-origin";

export function getCaseOrigin(): string {
  if (typeof window === "undefined") return "/works";
  return sessionStorage.getItem(KEY) ?? "/works";
}

export function setCaseOrigin(path: string) {
  sessionStorage.setItem(KEY, path);
}
