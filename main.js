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
    modalGallery.innerHTML = "";

    openModal();

    const jobs = [];
    for (let index = 0; index < IMAGES_PER_STYLE; index += 1) {
        jobs.push(renderImageCell(style, index, token));
    }

    await Promise.allSettled(jobs);
}

async function renderImageCell(style, index, token) {
    if (token !== activeGalleryToken) {
        return;
    }

    const container = document.createElement("div");
    container.className = "gallery-item-container";
    container.innerHTML = '<div class="loader"></div><p class="status-note">Loading</p>';
    modalGallery.appendChild(container);

    const urls = buildImageSourceChain(style, index);

    for (let attempt = 0; attempt < urls.length; attempt += 1) {
        if (token !== activeGalleryToken) {
            return;
        }

        const loaded = await loadImage(urls[attempt], 15000);
        if (loaded) {
            loaded.className = "gallery-item";
            loaded.alt = `${style.name} reference ${index + 1}`;
            container.innerHTML = "";
            container.appendChild(loaded);
            return;
        }

        const note = container.querySelector(".status-note");
        if (note) {
            note.textContent = attempt < urls.length - 1 ? "Retrying source" : "Unavailable";
        }
    }
}

function buildImageSourceChain(style, index) {
    const basePrompt = [
        "fashion editorial",
        "lookbook",
        "brand campaign",
        "pinterest moodboard",
        style.aesthetic,
        "high detail",
        "full body",
        "studio or street style"
    ].join(", ");

    const hashSeed = hashCode(`${style.name}-${style.aesthetic}-${index}`);
    const seedA = Math.abs(hashSeed) % 1000000;
    const seedB = (seedA + 179) % 1000000;

    const pollinationsA = `https://image.pollinations.ai/prompt/${encodeURIComponent(basePrompt)}?width=600&height=900&nologo=true&seed=${seedA}`;
    const pollinationsB = `https://image.pollinations.ai/prompt/${encodeURIComponent(basePrompt)}?width=600&height=900&nologo=true&seed=${seedB}`;

    const unsplashQuery = encodeURIComponent(`fashion,${style.name},${style.aesthetic},editorial,lookbook`);
    const unsplash = `https://source.unsplash.com/600x900/?${unsplashQuery}&sig=${seedB}`;

    const picsumSeed = encodeURIComponent(`${style.name.toLowerCase().replace(/\s+/g, "-")}-${index + 1}`);
    const picsum = `https://picsum.photos/seed/${picsumSeed}/600/900`;

    return [pollinationsA, pollinationsB, unsplash, picsum];
}

function loadImage(src, timeoutMs) {
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

function hashCode(text) {
    let hash = 0;
    for (let i = 0; i < text.length; i += 1) {
        hash = (hash << 5) - hash + text.charCodeAt(i);
        hash |= 0;
    }
    return hash;
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
