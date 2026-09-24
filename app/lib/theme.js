export function getTheme() {
  if (typeof window === "undefined") return "dark";
  return localStorage.getItem("vexo_theme") || "dark";
}

export function setTheme(theme) {
  if (typeof window === "undefined") return;
  localStorage.setItem("vexo_theme", theme);
  document.documentElement.setAttribute("data-theme", theme);
}
