(() => {
  "use strict";
  // After deploying the separate Gyan Shiksha Forms Apps Script, paste its /exec URL here.
  // Do not put any API keys or secret values in this public file.
  const FORMS_ENDPOINT = "";
  const RECEIVER = "gyanshikshaa@gmail.com";
  const configured = /^https:\/\/script\.google\.com\/macros\/s\/[A-Za-z0-9_-]+\/exec$/.test(FORMS_ENDPOINT);
  const forms = [...document.querySelectorAll("form[data-gyan-form]")];
  if (!forms.length) return;

  document.querySelectorAll("[data-forms-mode]").forEach(node => {
    node.textContent = configured
      ? "ફોર્મ મોકલ્યા પછી Email પહોંચ્યાની પુષ્ટિ અહીં દેખાશે."
      : "તમારી Email App ખુલશે. મોકલવા માટે ત્યાં Send દબાવો.";
  });

  const setMessage = (form, message, state = "") => {
    const line = form.querySelector("[data-status]");
    line.textContent = message;
    if (state) line.dataset.state = state;
    else delete line.dataset.state;
  };
  const safeLink = value => {
    try {
      const url = new URL(String(value || ""));
      return url.protocol === "https:" && ["drive.google.com", "docs.google.com", "mega.nz", "mega.io"].includes(url.hostname);
    } catch { return false; }
  };
  const randomId = () => {
    const bytes = new Uint8Array(16);
    crypto.getRandomValues(bytes);
    return [...bytes].map(n => n.toString(16).padStart(2, "0")).join("");
  };
  const titles = {
    message: "Message", suggestion: "Suggestion", material_request: "Material Request", material_share: "Material Contribution"
  };
  const sendButtons = {
    message: "સંદેશ મોકલો →", suggestion: "સૂચન મોકલો →",
    material_request: "વિનંતી મોકલો →", material_share: "સામગ્રીની લિંક મોકલો →"
  };

  forms.forEach((form, index) => {
    const kind = form.dataset.kind;
    if (!Object.hasOwn(titles, kind)) return;
    const button = form.querySelector("[data-send]");
    const get = key => (form.elements.namedItem(key)?.value || "").trim();
    if (configured) {
      const frame = document.createElement("iframe");
      frame.name = `gyanFormFrame${index}`;
      frame.title = `Gyan Shiksha ${titles[kind]} submission`;
      frame.hidden = true;
      frame.style.display = "none";
      document.body.append(frame);
      form.action = FORMS_ENDPOINT;
      form.target = frame.name;
      form.method = "POST";
      form.insertAdjacentHTML("beforeend", '<input type="hidden" name="request_id"><input type="hidden" name="form_type">');
      button.textContent = sendButtons[kind];
      let requestId = "";
      let waiting = false;
      let timeout = null;
      window.addEventListener("message", event => {
        if (!waiting || !/^https:\/\/(?:script\.google\.com|(?:[a-z0-9-]+\.)?script\.googleusercontent\.com)$/.test(event.origin)) return;
        if (!event.data || event.data.kind !== "gyan-shiksha-forms-v316" || event.data.request_id !== requestId) return;
        waiting = false;
        clearTimeout(timeout);
        button.disabled = false;
        if (event.data.ok === true) {
          setMessage(form, "તમારી નોંધ ઈમેલ પર સફળતાપૂર્વક મોકલાઈ છે. આભાર!", "ok");
          form.reset();
        } else setMessage(form, "અત્યારે મોકલી શકાયું નથી. કૃપા કરીને થોડા સમય પછી પ્રયાસ કરો અથવા Emailથી સંપર્ક કરો.", "error");
      });
      form.addEventListener("submit", e => {
        if (!form.reportValidity()) { e.preventDefault(); return; }
        if (get("website")) { e.preventDefault(); setMessage(form, "મોકલી શકાતું નથી.", "error"); return; }
        if (kind === "material_share" && !safeLink(get("resource_url"))) {
          e.preventDefault(); setMessage(form, "Google Drive અથવા MEGAની માન્ય HTTPS Share Link આપો.", "error"); return;
        }
        if (waiting) { e.preventDefault(); return; }
        requestId = randomId();
        form.elements.namedItem("request_id").value = requestId;
        form.elements.namedItem("form_type").value = kind;
        waiting = true;
        button.disabled = true;
        setMessage(form, "મોકલાઈ રહ્યું છે... કૃપા કરીને રાહ જુઓ.");
        timeout = setTimeout(() => {
          if (waiting) {
            waiting = false;
            button.disabled = false;
            setMessage(form, "પુષ્ટિ મળી નથી. ફરી મોકલતાં પહેલાં Inbox/Spam ચકાસો અથવા Emailથી સંપર્ક કરો.", "error");
          }
        }, 25000);
      });
    } else {
      form.addEventListener("submit", event => {
        event.preventDefault();
        if (!form.reportValidity()) return;
        if (get("website")) { setMessage(form, "મોકલી શકાતું નથી.", "error"); return; }
        if (kind === "material_share" && !safeLink(get("resource_url"))) {
          setMessage(form, "Google Drive અથવા MEGAની માન્ય HTTPS Share Link આપો.", "error"); return;
        }
        const lines = [
          `Form: ${titles[kind]}`,
          `Name: ${get("name")}`,
          `Email: ${get("email")}`,
          `Category: ${get("category")}`,
          get("standard") ? `Standard/Subject: ${get("standard")}` : "",
          get("resource_url") ? `Share Link: ${get("resource_url")}` : "",
          `\nMessage:\n${get("message")}`
        ].filter(Boolean);
        setMessage(form, "Email App ખુલશે. તેમાં Send દબાવો; ફોર્મ પોતે હજી મોકલાયું નથી.");
        location.href = `mailto:${RECEIVER}?subject=${encodeURIComponent("Gyan Shiksha — " + titles[kind])}&body=${encodeURIComponent(lines.join("\n"))}`;
      });
    }
  });
})();
