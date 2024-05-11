document.getElementById("frButton")?.addEventListener("click", () => {
  setLangCookie("fr");
});

document.getElementById("enButton")?.addEventListener("click", () => {
  setLangCookie("en");
});

function setLangCookie(lang) {
  const cookieValue = lang === "en" ? "en" : "fr";
  document.cookie = `langCookie=${cookieValue}; max-age=900000; path=/`;
  window.location.reload();
}
