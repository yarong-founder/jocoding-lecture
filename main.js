const IMAGES_PER_STYLE = 50;

const fashionStyles = [
    {
        name: "Classic",
        description: "정제된 실루엣, 유행에 흔들리지 않는 포멀함.",
        brands: "Armani, Ralph Lauren Purple Label",
        aesthetic: "timeless tailoring monochrome editorial luxury lookbook"
    },
    {
        name: "Old Money",
        description: "로고 없는 럭셔리, 최고급 소재와 우아한 무드.",
        brands: "Loro Piana, Brunello Cucinelli, The Row",
        aesthetic: "quiet luxury heritage mansion neutrals editorial campaign"
    },
    {
        name: "Minimalist",
        description: "극도의 단순함, 정갈한 핏과 무채색 위주의 구성.",
        brands: "Jil Sander, Lemaire, COS",
        aesthetic: "minimal fashion silhouette clean line studio lookbook"
    },
    {
        name: "Ivy League",
        description: "50-60년대 미 동부 대학생들의 보수적이고 단정한 룩.",
        brands: "Brooks Brothers, J.Press",
        aesthetic: "ivy campus prep tailoring heritage collegiate editorial"
    },
    {
        name: "Preppy",
        description: "아이비 룩에 경쾌한 색감과 스포티함을 더한 스타일.",
        brands: "Polo Ralph Lauren, Tommy Hilfiger",
        aesthetic: "preppy sport casual luxury campus lookbook"
    },
    {
        name: "City Boy",
        description: "오버사이즈와 레이어드, 여유로운 도시적 캐주얼.",
        brands: "Nanamica, Beams, Nautica (JP)",
        aesthetic: "tokyo street layering oversized city mood editorial"
    },
    {
        name: "Gorpcore",
        description: "아웃도어 의류를 일상에서 감각적으로 매치한 기능적 룩.",
        brands: "Arc'teryx, Salomon, And Wander",
        aesthetic: "outdoor utility shell technical mountain city style"
    },
    {
        name: "Workwear",
        description: "거칠고 튼튼한 소재(데님, 덕 캔버스)의 실용적 디자인.",
        brands: "Carhartt WIP, Dickies, Red Wing",
        aesthetic: "heritage denim rugged worker garment detail"
    },
    {
        name: "Military",
        description: "군복의 디테일을 현대적인 패션 요소로 재해석.",
        brands: "Engineered Garments, Alpha Industries",
        aesthetic: "military utility jacket cargo contemporary runway"
    },
    {
        name: "Techwear",
        description: "기능성 원단, 다기능 포켓, 미래지향적 사이버펑크 무드.",
        brands: "Acronym, Stone Island Shadow Project",
        aesthetic: "techwear futuristic utility black tactical city"
    },
    {
        name: "Streetwear",
        description: "서브컬처 기반, 그래픽 티셔츠와 스니커즈 중심의 문화.",
        brands: "Supreme, Stüssy, Off-White",
        aesthetic: "street culture sneaker hype editorial urban"
    },
    {
        name: "Skater",
        description: "보더들의 활동성을 고려한 헐렁한 바지와 플랫 슈즈.",
        brands: "Vans, Palace, Dickies 874",
        aesthetic: "skate park youth loose fit candid street"
    },
    {
        name: "Normcore",
        description: "평범함을 스타일로 승화시킨 편안하고 일상적인 룩.",
        brands: "Uniqlo, Gap, New Balance",
        aesthetic: "everyday basics ordinary cool neutral wardrobe"
    },
    {
        name: "Y2K",
        description: "2000년대 초반의 화려하고 실험적인 키치함.",
        brands: "Diesel, Blumarine, Juicy Couture",
        aesthetic: "y2k retro futuristic glossy pop lookbook"
    },
    {
        name: "French Chic",
        description: "인위적이지 않은 세련미, 무심하게 입은 듯한 우아함.",
        brands: "A.P.C., Celine, Rouje",
        aesthetic: "paris effortless chic understated street editorial"
    },
    {
        name: "Grunge",
        description: "90년대 록 문화 기반의 거칠고 빈티지한 레이어드.",
        brands: "Rick Owens, Saint Laurent (Hedi Era)",
        aesthetic: "grunge distressed layering rock nineties mood"
    },
    {
        name: "Bohemian",
        description: "자유로운 패턴, 에스닉한 디테일, 흐르는 듯한 실루엣.",
        brands: "Isabel Marant, Chloé",
        aesthetic: "bohemian flowing fabric handcrafted detail romantic"
    },
    {
        name: "Avant-garde",
        description: "패션의 고정관념을 깨는 실험적이고 해학적인 구조.",
        brands: "Comme des Garçons, Yohji Yamamoto",
        aesthetic: "avant garde conceptual dramatic silhouette runway"
    },
    {
        name: "Maximalism",
        description: "\"More is More\", 과감한 색채와 화려한 패턴의 조화.",
        brands: "Gucci (Alessandro Michele Era), Kenzo",
        aesthetic: "maximal pattern layered ornament bold fashion"
    },
    {
        name: "Vintage / Retro",
        description: "특정 시대를 연상시키는 향수 어린 복고적 감성.",
        brands: "Levi's Vintage Clothing, Adidas Originals",
        aesthetic: "vintage archival retro era inspired lookbook"
    }
];

const styleGrid = document.getElementById("style-grid");
const modal = document.getElementById("gallery-modal");
const modalTitle = document.getElementById("modal-title");
const modalDesc = document.getElementById("modal-description");
const modalBrands = document.getElementById("modal-brands");
const modalCount = document.getElementById("modal-count");
const modalGallery = document.getElementById("modal-gallery");
const closeBtn = document.querySelector(".close-btn");

let activeGalleryToken = 0;

function init() {
    fashionStyles.forEach((style) => {
        const card = document.createElement("article");
        card.className = "style-card";
        card.setAttribute("role", "listitem");
        card.setAttribute("tabindex", "0");
        card.innerHTML = `
            <h3 class="style-name">${style.name}</h3>
            <p class="style-description">${style.description}</p>
            <p class="style-brands">Brands: ${style.brands}</p>
        `;

        card.addEventListener("click", () => openGallery(style));
        card.addEventListener("keydown", (event) => {
            if (event.key === "Enter" || event.key === " ") {
                event.preventDefault();
                openGallery(style);
            }
        });

        styleGrid.appendChild(card);
    });
}

function openModal() {
    modal.style.display = "block";
    modal.setAttribute("aria-hidden", "false");
    document.body.style.overflow = "hidden";
}

function closeModal() {
    modal.style.display = "none";
    modal.setAttribute("aria-hidden", "true");
    document.body.style.overflow = "";
    activeGalleryToken += 1;
}

async function openGallery(style) {
    activeGalleryToken += 1;
    const token = activeGalleryToken;

    modalTitle.textContent = style.name;
    modalDesc.textContent = style.description;
    modalBrands.textContent = `Representative Brands: ${style.brands}`;
    modalCount.textContent = "Loading curated fashion references...";
    modalGallery.innerHTML = "";

    openModal();

    const references = await fetchFashionReferences(style, token);
    if (token !== activeGalleryToken) {
        return;
    }

    modalCount.textContent = `${references.length} curated references with source credit`;

    if (references.length === 0) {
        modalGallery.innerHTML = '<p class="empty-state">패션 이미지를 불러오지 못했습니다. 잠시 후 다시 시도해 주세요.</p>';
        return;
    }

    references.slice(0, IMAGES_PER_STYLE).forEach((reference, index) => {
        renderReferenceCell(style, reference, index, token);
    });
}

async function fetchFashionReferences(style, token) {
    const queries = buildOpenverseQueries(style);
    const seen = new Set();
    const results = [];

    for (const query of queries) {
        for (let page = 1; page <= 8; page += 1) {
            if (token !== activeGalleryToken || results.length >= IMAGES_PER_STYLE) {
                return results;
            }

            const endpoint = `https://api.openverse.org/v1/images/?q=${encodeURIComponent(query)}&page=${page}&page_size=20&license=by,by-sa,cc0,pdm,by-nc,by-nc-sa&mature=false`;
            const payload = await fetchJson(endpoint);
            if (!payload || !Array.isArray(payload.results) || payload.results.length === 0) {
                break;
            }

            for (const item of payload.results) {
                if (token !== activeGalleryToken || results.length >= IMAGES_PER_STYLE) {
                    return results;
                }

                if (!isFashionRelevant(item)) {
                    continue;
                }

                const key = item.id || item.url;
                if (!key || seen.has(key)) {
                    continue;
                }

                seen.add(key);
                results.push({
                    title: item.title || `${style.name} reference`,
                    creator: item.creator || "Unknown creator",
                    provider: item.provider || item.source || "Openverse",
                    license: formatLicense(item.license, item.license_version),
                    sourceUrl: item.foreign_landing_url || item.url,
                    imageUrl: item.url,
                    fallbackUrl: item.thumbnail || null
                });
            }
        }
    }

    return results;
}

function buildOpenverseQueries(style) {
    const normalizedStyle = style.name.toLowerCase().replace(/\s*\/\s*/g, " ").replace(/\s+/g, " ").trim();
    const leadBrand = style.brands.split(",")[0].trim().toLowerCase();
    return [
        `fashion ${normalizedStyle} runway editorial lookbook street style`,
        `fashion ${leadBrand} runway editorial campaign model`,
        `fashion ${normalizedStyle} outfit designer collection`
    ];
}

async function renderReferenceCell(style, reference, index, token) {
    if (token !== activeGalleryToken) {
        return;
    }

    const container = document.createElement("div");
    container.className = "gallery-item-container";
    container.innerHTML = `
        <div class="gallery-media">
            <div class="loader"></div>
            <p class="status-note">Loading</p>
        </div>
    `;
    modalGallery.appendChild(container);

    const media = container.querySelector(".gallery-media");
    const loaded = await loadImage(reference.imageUrl, 12000) || await loadImage(reference.fallbackUrl, 12000);
    if (!loaded || token !== activeGalleryToken) {
        container.innerHTML = '<p class="empty-credit">Image unavailable</p>';
        return;
    }

    loaded.className = "gallery-item";
    loaded.alt = `${style.name} reference ${index + 1}`;
    media.innerHTML = "";
    media.appendChild(loaded);

    const credit = document.createElement("p");
    credit.className = "image-credit";
    const link = document.createElement("a");
    link.href = reference.sourceUrl || reference.imageUrl;
    link.target = "_blank";
    link.rel = "noopener noreferrer";
    link.textContent = reference.title;
    const meta = document.createElement("span");
    meta.textContent = `${reference.creator} · ${reference.provider} · ${reference.license}`;
    credit.appendChild(link);
    credit.appendChild(meta);
    container.appendChild(credit);
}

function loadImage(src, timeoutMs) {
    if (!src) {
        return Promise.resolve(null);
    }

    return new Promise((resolve) => {
        const image = new Image();
        image.referrerPolicy = "no-referrer";

        const timer = setTimeout(() => {
            image.onload = null;
            image.onerror = null;
            resolve(null);
        }, timeoutMs);

        image.onload = () => {
            clearTimeout(timer);
            resolve(image);
        };

        image.onerror = () => {
            clearTimeout(timer);
            resolve(null);
        };

        image.src = src;
    });
}

async function fetchJson(url) {
    try {
        const response = await fetch(url);
        if (!response.ok) {
            return null;
        }
        return await response.json();
    } catch (error) {
        return null;
    }
}

function isFashionRelevant(item) {
    const text = [
        item.title || "",
        ...(item.tags || []).map((tag) => tag.name || "")
    ].join(" ").toLowerCase();

    const mustInclude = [
        "fashion", "runway", "editorial", "lookbook", "style", "outfit", "garment", "couture", "model", "streetwear", "designer"
    ];
    const blockList = [
        "cat", "kitten", "dog", "puppy", "bird", "flower", "landscape", "food", "vehicle", "motorcycle"
    ];

    if (!mustInclude.some((token) => text.includes(token))) {
        return false;
    }
    if (blockList.some((token) => text.includes(token))) {
        return false;
    }

    const width = Number(item.width || 0);
    const height = Number(item.height || 0);
    return width >= 300 && height >= 450;
}

function formatLicense(license, version) {
    const upper = (license || "unknown").toUpperCase();
    return version ? `${upper} ${version}` : upper;
}

closeBtn.addEventListener("click", closeModal);

window.addEventListener("click", (event) => {
    if (event.target === modal) {
        closeModal();
    }
});

window.addEventListener("keydown", (event) => {
    if (event.key === "Escape" && modal.style.display === "block") {
        closeModal();
    }
});

init();
