(() => {
  "use strict";

  const navToggle = document.querySelector(".nav-toggle");
  const nav = document.querySelector(".main-nav");

  function closeNav() {
    if (!nav || !navToggle) return;
    nav.classList.remove("is-open");
    navToggle.setAttribute("aria-expanded", "false");
    document.body.classList.remove("nav-open");
  }

  if (navToggle && nav) {
    navToggle.addEventListener("click", () => {
      const open = nav.classList.toggle("is-open");
      navToggle.setAttribute("aria-expanded", String(open));
      document.body.classList.toggle("nav-open", open);
    });

    nav.querySelectorAll("a").forEach(link => link.addEventListener("click", closeNav));
    document.addEventListener("keydown", event => {
      if (event.key === "Escape") {
        closeNav();
        navToggle.focus();
      }
    });
    window.addEventListener("resize", () => {
      if (window.innerWidth > 1050) closeNav();
    });
  }

  const current = location.pathname.split("/").pop() || "index.html";
  document.querySelectorAll(".main-nav a").forEach(a => {
    if (a.getAttribute("href") === current) a.setAttribute("aria-current", "page");
  });

  document.querySelectorAll("[data-year]").forEach(el => {
    el.textContent = new Date().getFullYear();
  });

  const searchForm = document.querySelector("[data-site-search-form]");
  const searchInput = searchForm?.querySelector("input[type='search']");
  const searchResults = document.querySelector("[data-site-search-results]");

  const pages = [
    {title:"Study Material", desc:"Notes, revision, practice sheets and model papers", url:"study-material.html", keys:"study material notes revision practice worksheet model paper અભ્યાસ સામગ્રી નોટ્સ મોડેલ પેપર"},
    {title:"Board Exam", desc:"Std. 10 and Std. 12 board preparation", url:"board-exam.html", keys:"board exam gseb standard 10 12 std 10 std 12 બોર્ડ પરીક્ષા ધોરણ 10 12"},
    {title:"Online Quiz", desc:"Chapter-wise quiz and self-practice", url:"quiz.html", keys:"quiz mcq online test practice ક્વિઝ ટેસ્ટ પ્રશ્ન"},
    {title:"Learning Games", desc:"Educational games and quick practice", url:"games.html", keys:"games learning math language science ગેમ્સ રમત ગણિત"},
    {title:"Education Updates", desc:"School and board related updates", url:"updates.html", keys:"updates news notice board date academic અપડેટ સમાચાર સૂચના"},
    {title:"Blog", desc:"Study guidance and original educational articles", url:"blog.html", keys:"blog study plan revision tips guidance અભ્યાસ આયોજન માર્ગદર્શન"},
    {title:"Study Plan", desc:"Board-focused planning guides", url:"study-plan.html", keys:"study plan timetable revision schedule અભ્યાસ આયોજન સમયપત્રક"}
  ];

  function normalize(value) {
    return value.toLocaleLowerCase().trim();
  }

  function renderResults(query) {
    if (!searchResults || !searchInput) return [];
    const q = normalize(query);
    if (!q) {
      searchResults.hidden = true;
      searchResults.innerHTML = "";
      searchInput.setAttribute("aria-expanded", "false");
      return [];
    }

    const words = q.split(/\s+/).filter(Boolean);
    const matches = pages.filter(page => {
      const haystack = normalize(`${page.title} ${page.desc} ${page.keys}`);
      return words.every(word => haystack.includes(word));
    }).slice(0, 5);

    searchResults.innerHTML = "";
    if (matches.length === 0) {
      const empty = document.createElement("div");
      empty.className = "search-empty";
      empty.textContent = "No matching section found. Try Board, Quiz, Model Paper or Blog.";
      searchResults.appendChild(empty);
    } else {
      matches.forEach(page => {
        const link = document.createElement("a");
        link.href = page.url;
        const title = document.createElement("strong");
        title.textContent = page.title;
        const desc = document.createElement("span");
        desc.textContent = page.desc;
        link.append(title, desc);
        searchResults.appendChild(link);
      });
    }

    searchResults.hidden = false;
    searchInput.setAttribute("aria-expanded", "true");
    return matches;
  }

  if (searchForm && searchInput && searchResults) {
    searchInput.addEventListener("input", () => renderResults(searchInput.value));
    searchInput.addEventListener("focus", () => { if (searchInput.value.trim()) renderResults(searchInput.value); });

    searchForm.addEventListener("submit", event => {
      event.preventDefault();
      const matches = renderResults(searchInput.value);
      if (matches.length === 1) {
        window.location.href = matches[0].url;
      } else if (matches.length > 1) {
        searchResults.querySelector("a")?.focus();
      } else {
        searchInput.focus();
      }
    });

    document.addEventListener("click", event => {
      if (!searchForm.contains(event.target) && !searchResults.contains(event.target)) {
        searchResults.hidden = true;
        searchInput.setAttribute("aria-expanded", "false");
      }
    });
  }
})();
