(() => {
  "use strict";
  // Paste your deployed Google Apps Script Web App /exec URL below to activate one-click sending.
  const CONTACT_ENDPOINT = "";
  const RECEIVER = "gyanshikshaa@gmail.com";
  const form=document.getElementById("contact-form"); if(!form)return;
  const status=document.querySelector("[data-contact-status]");
  const button=document.querySelector("[data-contact-button]");
  const notice=document.getElementById("contact-mode-note");
  const configured=/^https:\/\/script\.google\.com\/macros\/s\/[\w-]+\/exec$/.test(CONTACT_ENDPOINT);
  if(configured){
    button.textContent="સીધો સંદેશ મોકલો →";
    notice.textContent="તમારો સંદેશ Google Apps Script મારફતે અમારી ઈમેલ પર મોકલાશે. મોકલ્યા પછી પુષ્ટિ દેખાય ત્યાં સુધી રાહ જુઓ.";
  }
  const setStatus=msg=>{status.textContent=msg;};
  if(configured){
    const frame=document.createElement("iframe");frame.name="gsContactFrame";frame.title="સંપર્ક ફોર્મનું પરિણામ";
    frame.hidden=true;frame.style.display="none";document.body.append(frame);
    form.action=CONTACT_ENDPOINT;form.method="POST";form.target="gsContactFrame";
    let pending=false;
    window.addEventListener("message",e=>{
      if(!pending || !/^https:\/\/(script\.google\.com|script\.googleusercontent\.com)$/.test(e.origin))return;
      if(!e.data || e.data.kind!=="gyan-shiksha-contact-result")return;
      pending=false;button.disabled=false;
      if(e.data.ok){setStatus("તમારો સંદેશ મોકલાયો છે. આભાર!");form.reset();}
      else setStatus("સંદેશ મોકલાયો નથી. કૃપા કરીને ઈમેલ મારફતે સંપર્ક કરો.");
    });
    form.addEventListener("submit",ev=>{
      if(!form.reportValidity()){ev.preventDefault();return;}
      if(form.elements.website.value){ev.preventDefault();setStatus("મોકલી શકાતું નથી.");return;}
      pending=true;button.disabled=true;setStatus("મોકલાઈ રહ્યું છે; પુષ્ટિની રાહ જુઓ...");
      setTimeout(()=>{if(pending){pending=false;button.disabled=false;setStatus("મોકલ્યાની પુષ્ટિ મળી નથી. ફરી પ્રયાસ કરતાં પહેલાં ઈમેલ Inbox જુઓ.");}},20000);
    });
  }else{
    form.addEventListener("submit",ev=>{
      ev.preventDefault();if(!form.reportValidity())return;
      const f=form.elements;if(f.website.value)return;
      const subject=`Gyan Shiksha — ${f.category.value}`;
      const body=`નામ: ${f.name.value}\nઈમેલ: ${f.email.value}\nવિષય: ${f.category.value}\n\n${f.message.value}`;
      const url=`mailto:${RECEIVER}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
      setStatus("તમારી ઈમેલ એપમાં સંદેશ તૈયાર થયો છે. કૃપા કરીને તેમાં Send દબાવો.");
      window.location.href=url;
    });
  }
})();