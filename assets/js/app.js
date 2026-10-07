(() => {
  "use strict";
  const navToggle = document.querySelector(".nav-toggle");
  const nav = document.querySelector(".main-nav");
  if (navToggle && nav) {
    navToggle.addEventListener("click", () => {
      const open = nav.classList.toggle("is-open");
      navToggle.setAttribute("aria-expanded", String(open));
    });
  }

  const current = location.pathname.split("/").pop() || "index.html";
  document.querySelectorAll(".main-nav a").forEach(a => {
    if (a.getAttribute("href") === current) a.setAttribute("aria-current", "page");
  });

  document.querySelectorAll("[data-year]").forEach(el => {
    el.textContent = new Date().getFullYear();
  });
})();
