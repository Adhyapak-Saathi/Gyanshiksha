# Gyan Shiksha V3.17 — અભ્યાસ સામગ્રી લાઇબ્રેરી

## વેબસાઇટમાં સામેલ બાબતો
- અભ્યાસ સામગ્રીનું સાચું Search/Filter Page (ધોરણ 1–12, વિષય, પ્રકાર, Google Drive/MEGA).
- મંજૂર Share Link પરથી Download/Preview (Google Drive/MEGA પર ખુલે છે; સીધી browser download ફરજિયાત નથી).
- Material Request અને Contribute Material ફોર્મ V3.16માંથી જાળવ્યાં છે.
- વેબસાઇટ પર આંતરિક “બાકી છે / Backend ready” પ્રકારનાં લખાણ દૂર કર્યાં છે.
- Home Quick Access અને તમામ મુખ્ય Headerમાં **Material** link.

## પ્રકાશિત કરવા માટે Repositoryનાં Path
`index.html`, `study-material.html`, `contact.html`, `updates.html`, `jobs.html`, `privacy.html`, `assets/js/app.js`, `assets/js/forms-v316.js`, `assets/css/material-library-v317.css`, `assets/js/material-library-v317.js`, `data/materials.json`.

**ZIP extract કરવાનું છે; ZIP પોતે GitHubમાં મૂકવાનું નથી.** નવી branch બનાવો, બધી 8 ફાઇલો તેમના pathમાં upload કરીને PR main તરફ કરો. અગાઉના News/Jobs JSON અને Forms backendને બદલો નહીં.

## પોતાની સામગ્રી ઉમેરવી
1. Google Driveમાં ફાઇલ માટે `General access: Anyone with the link / Viewer` (અથવા જરૂરી દર્શકો માટે Share setting) પસંદ કરો. Edit access ન આપો.
2. MEGAમાં ફાઇલની Share Link મેળવો. Public Share Link તમારી ફાઇલની ઍક્સેસ આપે છે; ખાનગી ફાઇલોની લિંક જાહેર ન કરો.
3. `data/materials.json`માં નીચેના માળખાની સાચી, કૉપિરાઇટ મંજૂર સામગ્રીની નોંધો ઉમેરો. વપરાશકર્તા દ્વારા મોકલેલી લિંક **ચકાસ્યા વગર Approved કરશો નહીં.**

```json
[
  {
    "title": "સામગ્રીનું ખરેખરનું શીર્ષક",
    "standard": "10",
    "subject": "ગણિત",
    "category": "Notes",
    "description": "વિગતવાર વર્ણન",
    "url": "https://drive.google.com/file/d/REAL_FILE_ID/view",
    "updated_at": "2026-10-08",
    "status": "Approved"
  }
]
```
આ ફક્ત schema નું ઉદાહરણ છે; `REAL_FILE_ID`વાળી લિંક live ડેટામાં ન મૂકવી.

Allowed Categories: `Textbook`, `Notes`, `Question Paper`, `Worksheet`, `Model Paper`, `Other`.
Allowed Providers: Google Drive (`drive.google.com`, `docs.google.com`) અને MEGA (`mega.nz`, `mega.io`).
Only `status: "Approved"` items with valid HTTPS URL render. JSONમાં ખાનગી/અપ્રકાશિત માહિતી ન મૂકવી.

## જો Google Sheetમાં મેનેજ કરવું હોય
અલગ `Gyan_Shiksha_Material_Library_Template.xlsx`ને Google Sheetsમાં import કરો. `Material_Library`માં માત્ર ચકાસેલી નોંધો `Approved` કરો. આ Template આપમેળે વેબસાઇટ પર publish નથી કરતું; તમારી મંજૂરી અને publish step જરૂરી છે. જરૂર પડે ત્યારે Assistant તમારી Sheet Exportથી JSON બનાવી આપી શકે છે.

## વપરાશકર્તાઓ સામગ્રી કઈ રીતે મોકલે?
`study-material.html`માં Contribute Material ફોર્મ છે. તે Google Drive/MEGAની link અને પરવાનગીની ખાતરી માગે છે. Gmailમાં મોકલવા માટે હાલના `Gyan Shiksha Forms Inbox` Apps Script Web Appને Deploy કરવું અને `assets/js/forms-v316.js`માં `FORMS_ENDPOINT` તરીકે /exec URL જોડવો આવશ્યક છે. Test email મળ્યો એટલે mail authorization યોગ્ય છે, પણ website integration ટેસ્ટ બાકી છે. આ setup માહિતી માત્ર guideમાં છે, Live પેજમાં નથી.
