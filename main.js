/**
 * Step1 MVP (Static SPA)
 * - Home: style cards
 * - Style page: masonry look grid
 * - Look click: modal (breakdown + brands + original link)
 * - Bookmarks: localStorage
 */

const app = document.getElementById("app");

// ====== DATA ======
const STYLES = [
  { slug:"classic", name:"Classic",
    description:"Timeless tailored menswear built on clean silhouettes and heritage pieces.",
    keywords:["tailoring","timeless","neutral"], brands:["Ralph Lauren","Brooks Brothers","J.Crew"],
    related:["old-money","preppy","minimalism"], looks:[]
  },
  { slug:"old-money", name:"Old Money",
    description:"Heritage luxury style with understated elegance and classic tailoring.",
    keywords:["heritage","understated","luxury"], brands:["Loro Piana","Brunello Cucinelli","The Row"],
    related:["classic","french-chic","preppy"], looks:[]
  },
  { slug:"minimalism", name:"Minimalism",
    description:"Clean silhouettes and neutral tones focusing on simplicity.",
    keywords:["clean","neutral","simple"], brands:["Jil Sander","COS","Auralee"],
    related:["normcore","contemporary","classic"], looks:[]
  },
  { slug:"preppy", name:"Preppy",
    description:"Ivy league inspired casual tailoring with American heritage roots.",
    keywords:["ivy","heritage","layered"], brands:["Polo Ralph Lauren","GANT","Tommy Hilfiger"],
    related:["classic","old-money","city-boy"], looks:[]
  },
  { slug:"city-boy", name:"City Boy",
    description:"Japanese urban casual style blending relaxed tailoring and street comfort.",
    keywords:["urban","relaxed","casual"], brands:["BEAMS","Nanamica","Uniqlo U"],
    related:["normcore","minimalism","gorpcore"], looks:[]
  },
  { slug:"gorpcore", name:"Gorpcore",
    description:"Technical outdoor clothing reinterpreted for urban everyday wear.",
    keywords:["technical","outdoor","utility"], brands:["Arc'teryx","Salomon","Patagonia","And Wander"],
    related:["workwear","military","city-boy"], looks:[]
  },
  { slug:"workwear", name:"Workwear",
    description:"Rugged garments rooted in American labor clothing traditions.",
    keywords:["rugged","denim","heritage"], brands:["Carhartt WIP","Dickies","Levi's"],
    related:["military","vintage","gorpcore"], looks:[]
  },
  { slug:"military", name:"Military",
    description:"Utility-driven garments inspired by army surplus and tactical clothing.",
    keywords:["utility","olive","cargo"], brands:["Alpha Industries","Buzz Rickson’s","Rothco"],
    related:["workwear","gorpcore","vintage"], looks:[]
  },
  { slug:"contemporary", name:"Contemporary",
    description:"Modern fashion-forward casual with clean silhouettes and tailoring.",
    keywords:["modern","clean","tailored"], brands:["Acne Studios","AMI Paris","Theory"],
    related:["minimalism","classic","avant-garde"], looks:[]
  },
  { slug:"streetwear", name:"Streetwear",
    description:"Culture-driven style rooted in skate, hip-hop and sneaker communities.",
    keywords:["oversized","graphics","sneakers"], brands:["Supreme","Stüssy","BAPE"],
    related:["skater","y2k","grunge"], looks:[]
  },
  { slug:"skater", name:"Skater",
    description:"Laid-back skate culture aesthetic built on baggy silhouettes.",
    keywords:["baggy","casual","skate"], brands:["Vans","Polar Skate Co.","Thrasher"],
    related:["streetwear","grunge","normcore"], looks:[]
  },
  { slug:"normcore", name:"Normcore",
    description:"Deliberately ordinary clothing emphasizing comfort and simplicity.",
    keywords:["basic","everyday","functional"], brands:["Uniqlo","GAP","New Balance"],
    related:["minimalism","city-boy","classic"], looks:[]
  },
  { slug:"y2k", name:"Y2K",
    description:"Early 2000s inspired fashion featuring bold silhouettes and accessories.",
    keywords:["retro","bold","2000s"], brands:["Diesel","Ed Hardy","Von Dutch"],
    related:["streetwear","maximalism","vintage"], looks:[]
  },
  { slug:"french-chic", name:"French Chic",
    description:"Effortless Parisian elegance mixing simplicity with subtle sophistication.",
    keywords:["effortless","elegant","parisian"], brands:["A.P.C.","Sandro","Maje","Sézane"],
    related:["classic","old-money","minimalism"], looks:[]
  },
  { slug:"grunge", name:"Grunge",
    description:"90s rebellious style: distressed fabrics, layering, raw attitude.",
    keywords:["distressed","layered","raw"], brands:["Dr. Martens","Converse","AllSaints"],
    related:["punk","streetwear","vintage"], looks:[]
  },
  { slug:"bohemian", name:"Bohemian",
    description:"Free-spirited aesthetic with flowing fabrics and artistic expression.",
    keywords:["flowing","earthy","artistic"], brands:["Isabel Marant","Etro","Free People"],
    related:["maximalism","vintage","french-chic"], looks:[]
  },
  { slug:"avant-garde", name:"Avant-garde",
    description:"Experimental fashion pushing the boundaries of form and silhouette.",
    keywords:["experimental","conceptual","silhouette"], brands:["Rick Owens","Comme des Garçons","Yohji Yamamoto"],
    related:["contemporary","maximalism","minimalism"], looks:[]
  },
  { slug:"maximalism", name:"Maximalism",
    description:"Bold, colorful, expressive fashion celebrating visual intensity.",
    keywords:["bold","pattern","layered"], brands:["Gucci","Versace","Marni"],
    related:["avant-garde","y2k","bohemian"], looks:[]
  },
  { slug:"vintage", name:"Vintage",
    description:"Retro-inspired fashion drawing influence from past decades.",
    keywords:["retro","thrift","heritage"], brands:["Levi’s (vintage)","Ralph Lauren (vintage)"],
    related:["grunge","workwear","y2k"], looks:[]
  },
  { slug:"punk", name:"Punk",
    description:"Raw rebellious style influenced by punk rock culture.",
    keywords:["leather","studs","rebellion"], brands:["Vivienne Westwood","Dr. Martens"],
    related:["grunge","streetwear","avant-garde"], looks:[]
  },
];

// 샘플 look 2개만 넣어둠(동작 확인용). 형님이 수집한 링크로 계속 추가하면 됨.
seedLooks("gorpcore", [
  {
    id:"gorpcore-001",
    title:"Urban hiking layering",
    sourceName:"Sample",
    sourceUrl:"https://example.com",
    thumbnailUrl:"", // 나중에 썸네일 URL 넣으면 이미지가 뜸
    items:["shell jacket","technical pants","trail shoes","cap"],
    brands:["Arc’teryx","Salomon"]
  },
  {
    id:"gorpcore-002",
    title:"Earth-tone technical mix",
    sourceName:"Sample",
    sourceUrl:"https://example.com",
    thumbnailUrl:"",
    items:["fleece","cargo pants","trail shoes"],
    brands:["Patagonia"]
  }
]);

function seedLooks(styleSlug, looks){
  const s = STYLES.find(x => x.slug === styleSlug);
  if (!s) return;
  s.looks = (s.looks || []).concat(looks);
}

// ====== BOOKMARKS ======
const BM_KEY = "style_explorer_bookmarks_v1";

function loadBookmarks(){
  try{
    return JSON.parse(localStorage.getItem(BM_KEY) || "[]");
  }catch{
    return [];
  }
}

function saveBookmarks(items){
  localStorage.setItem(BM_KEY, JSON.stringify(items));
}

function isBookmarked(bms, styleSlug, lookId){
  return bms.some(x => x.styleSlug === styleSlug && x.lookId === lookId);
}

function toggleBookmark(bms, styleSlug, look){
  const exists = isBookmarked(bms, styleSlug, look.id);
  if (exists) return bms.filter(x => !(x.styleSlug === styleSlug && x.lookId === look.id));
  return [{
    styleSlug,
    lookId: look.id,
    title: look.title,
    sourceName: look.sourceName,
    sourceUrl: look.sourceUrl,
    thumbnailUrl: look.thumbnailUrl || ""
  }, ...bms];
}

// ====== ROUTER ======
window.addEventListener("hashchange", render);
render();

function parseRoute(){
  const hash = (location.hash || "#/").slice(1); // remove '#'
  const parts = hash.split("/").filter(Boolean);
  // "/" => []
  // "/style/gorpcore" => ["style","gorpcore"]
  // "/bookmarks" => ["bookmarks"]
  return parts;
}

function render(){
  const parts = parseRoute();
  if (parts.length === 0){
    return renderHome();
  }
  if (parts[0] === "style" && parts[1]){
    return renderStyle(parts[1]);
  }
  if (parts[0] === "bookmarks"){
    return renderBookmarks();
  }
  return renderNotFound();
}

// ====== VIEWS ======
function renderHome(){
  const cards = STYLES.map(s => `
    <a class="card" href="#/style/${escapeHtml(s.slug)}">
      <div class="card__title">${escapeHtml(s.name)}</div>
      <div class="card__desc">${escapeHtml(s.description)}</div>
      <div class="chips">
        ${s.keywords.slice(0,3).map(k => `<span class="chip">${escapeHtml(k)}</span>`).join("")}
      </div>
    </a>
  `).join("");

  app.innerHTML = `
    <div class="grid">${cards}</div>
    <div class="section">
      <div class="empty">
        <div><b>다음 단계</b></div>
        <div style="margin-top:6px;">
          각 스타일의 <code>looks</code> 배열에 레퍼런스를 추가하면 Pinterest형 그리드가 채워집니다.<br/>
          (main.js 상단의 STYLES 데이터에서 해당 스타일의 looks에 추가)
        </div>
      </div>
    </div>
  `;
}

function renderStyle(slug){
  const style = STYLES.find(s => s.slug === slug);
  if (!style) return renderNotFound();

  const related = (style.related || []).map(rs => {
    const r = STYLES.find(x => x.slug === rs);
    return `<a class="chip" href="#/style/${escapeHtml(rs)}">${escapeHtml(r ? r.name : rs)}</a>`;
  }).join("");

  const brandChips = (style.brands || []).map(b => `<span class="chip">${escapeHtml(b)}</span>`).join("");

  const looksHtml = (style.looks || []).map(l => `
    <div class="masonry__item">
      <div class="look" data-style="${escapeHtml(style.slug)}" data-look="${escapeHtml(l.id)}">
        <div class="look__thumb">
          ${l.thumbnailUrl ? `<img src="${escapeAttr(l.thumbnailUrl)}" alt="${escapeAttr(l.title)}" />` : `No thumbnail yet`}
        </div>
        <div class="look__body">
          <div class="look__title">${escapeHtml(l.title)}</div>
          <div class="look__meta">${escapeHtml(l.sourceName)}</div>
        </div>
      </div>
    </div>
  `).join("");

  app.innerHTML = `
    <div class="pagehead">
      <div>
        <div><a class="nav__link" href="#/">← Back</a></div>
        <h1 class="h1" style="margin-top:10px;">${escapeHtml(style.name)}</h1>
        <p class="p">${escapeHtml(style.description)}</p>
      </div>
      <a class="nav__link" href="#/bookmarks">Bookmarks</a>
    </div>

    <div class="section kv">
      <div class="section__title">Keywords</div>
      <div class="chips">${style.keywords.map(k => `<span class="chip">${escapeHtml(k)}</span>`).join("")}</div>

      <div class="section" style="margin-top:14px;">
        <div class="section__title">Representative brands</div>
        <div class="chips">${brandChips}</div>
      </div>

      ${related ? `
      <div class="section" style="margin-top:14px;">
        <div class="section__title">Related styles</div>
        <div class="chips">${related}</div>
      </div>` : ``}
    </div>

    <div class="section">
      <div class="section__title">Inspiration (${(style.looks||[]).length})</div>
      ${style.looks && style.looks.length ? `
        <div class="masonry">${looksHtml}</div>
      ` : `
        <div class="empty">
          아직 Looks가 없습니다. main.js에서 <code>${escapeHtml(style.slug)}</code> 스타일의 <code>looks</code> 배열에 레퍼런스를 추가하세요.
        </div>
      `}
    </div>
  `;

  // bind clicks
  document.querySelectorAll(".look").forEach(el => {
    el.addEventListener("click", () => {
      const sSlug = el.getAttribute("data-style");
      const lookId = el.getAttribute("data-look");
      const st = STYLES.find(x => x.slug === sSlug);
      const lk = st?.looks?.find(x => x.id === lookId);
      if (st && lk) openModal(st.slug, lk);
    });
  });
}

function renderBookmarks(){
  const bms = loadBookmarks();

  const cards = bms.map(b => `
    <a class="card" href="${escapeAttr(b.sourceUrl)}" target="_blank" rel="noreferrer">
      <div class="card__title">${escapeHtml(b.title)}</div>
      <div class="card__desc">${escapeHtml(b.sourceName)} · Style: ${escapeHtml(b.styleSlug)}</div>
    </a>
  `).join("");

  app.innerHTML = `
    <div class="pagehead">
      <div>
        <div><a class="nav__link" href="#/">← Back</a></div>
        <h1 class="h1" style="margin-top:10px;">Bookmarks</h1>
        <p class="p">저장한 룩을 다시 확인하세요.</p>
      </div>
      <button class="btn" id="clearBm">Clear all</button>
    </div>

    ${bms.length ? `<div class="grid">${cards}</div>` : `<div class="empty">저장된 항목이 없습니다. 룩을 클릭 후 Bookmark를 눌러보세요.</div>`}
  `;

  const btn = document.getElementById("clearBm");
  btn?.addEventListener("click", () => {
    saveBookmarks([]);
    renderBookmarks();
  });
}

function renderNotFound(){
  app.innerHTML = `<div class="empty">페이지를 찾을 수 없습니다. <a href="#/">Home으로</a></div>`;
}

// ====== MODAL ======
const modal = document.getElementById("modal");
const modalClose = document.getElementById("modalClose");
const modalTitle = document.getElementById("modalTitle");
const modalMeta = document.getElementById("modalMeta");
const modalThumb = document.getElementById("modalThumb");
const modalItems = document.getElementById("modalItems");
const modalBrandsWrap = document.getElementById("modalBrandsWrap");
const modalBrands = document.getElementById("modalBrands");
const modalVisit = document.getElementById("modalVisit");
const modalBookmark = document.getElementById("modalBookmark");

let currentModal = { styleSlug:null, look:null };

modalClose.addEventListener("click", closeModal);
modal.addEventListener("click", (e) => {
  const t = e.target;
  if (t && t.dataset && t.dataset.close) closeModal();
});

function openModal(styleSlug, look){
  currentModal = { styleSlug, look };

  modalTitle.textContent = look.title;
  modalMeta.textContent = `Source: ${look.sourceName}`;
  modalVisit.href = look.sourceUrl;

  // thumb
  modalThumb.innerHTML = look.thumbnailUrl
    ? `<img src="${escapeAttr(look.thumbnailUrl)}" alt="${escapeAttr(look.title)}" />`
    : `No thumbnail yet`;

  // items
  modalItems.innerHTML = "";
  (look.items || []).forEach(x => {
    const li = document.createElement("li");
    li.textContent = x;
    modalItems.appendChild(li);
  });

  // brands
  if (look.brands && look.brands.length){
    modalBrandsWrap.style.display = "block";
    modalBrands.innerHTML = look.brands.map(b => `<span class="chip">${escapeHtml(b)}</span>`).join("");
  } else {
    modalBrandsWrap.style.display = "none";
    modalBrands.innerHTML = "";
  }

  // bookmark button
  const bms = loadBookmarks();
  const marked = isBookmarked(bms, styleSlug, look.id);
  modalBookmark.textContent = marked ? "Bookmarked" : "Bookmark";

  modalBookmark.onclick = () => {
    const now = loadBookmarks();
    const next = toggleBookmark(now, styleSlug, look);
    saveBookmarks(next);
    const isNow = isBookmarked(next, styleSlug, look.id);
    modalBookmark.textContent = isNow ? "Bookmarked" : "Bookmark";
  };

  modal.classList.add("is-open");
  modal.setAttribute("aria-hidden","false");
}

function closeModal(){
  modal.classList.remove("is-open");
  modal.setAttribute("aria-hidden","true");
  currentModal = { styleSlug:null, look:null };
}

// ====== HELPERS ======
function escapeHtml(str){
  return String(str ?? "")
    .replaceAll("&","&amp;")
    .replaceAll("<","&lt;")
    .replaceAll(">","&gt;")
    .replaceAll('"',"&quot;")
    .replaceAll("'","&#039;");
}
function escapeAttr(str){ return escapeHtml(str); }
