const IMAGES_PER_STYLE = 50;

const fashionStyles = [
    {
        name: "Classic",
        description: "Refined silhouettes, timeless formality unaffected by trends.",
        brands: "Armani, Ralph Lauren Purple Label",
        aesthetic: "timeless tailoring monochrome editorial luxury lookbook"
    },
    {
        name: "Old Money",
        description: "Logo-less luxury, premium materials, and an elegant mood.",
        brands: "Loro Piana, Brunello Cucinelli, The Row",
        aesthetic: "quiet luxury heritage mansion neutrals editorial campaign"
    },
    {
        name: "Minimalist",
        description: "Extreme simplicity, clean fits, and primarily neutral colors.",
        brands: "Jil Sander, Lemaire, COS",
        aesthetic: "minimal fashion silhouette clean line studio lookbook"
    },
    {
        name: "Ivy League",
        description: "Conservative and neat looks of 1950s-60s US East Coast college students.",
        brands: "Brooks Brothers, J.Press",
        aesthetic: "ivy campus prep tailoring heritage collegiate editorial"
    },
    {
        name: "Preppy",
        description: "A style adding cheerful colors and sportiness to the Ivy look.",
        brands: "Polo Ralph Lauren, Tommy Hilfiger",
        aesthetic: "preppy sport casual luxury campus lookbook"
    },
    {
        name: "City Boy",
        description: "Oversized layering and relaxed urban casual style.",
        brands: "Nanamica, Beams, Nautica (JP)",
        aesthetic: "tokyo street layering oversized city mood editorial"
    },
    {
        name: "Gorpcore",
        description: "Functional looks matching outdoor wear sensually for daily life.",
        brands: "Arc'teryx, Salomon, And Wander",
        aesthetic: "outdoor utility shell technical mountain city style"
    },
    {
        name: "Workwear",
        description: "Practical designs using tough, durable materials (denim, duck canvas).",
        brands: "Carhartt WIP, Dickies, Red Wing",
        aesthetic: "heritage denim rugged worker garment detail"
    },
    {
        name: "Military",
        description: "Reinterpreting military uniform details into modern fashion elements.",
        brands: "Engineered Garments, Alpha Industries",
        aesthetic: "military utility jacket cargo contemporary runway"
    },
    {
        name: "Techwear",
        description: "Functional fabrics, multi-functional pockets, and futuristic cyberpunk mood.",
        brands: "Acronym, Stone Island Shadow Project",
        aesthetic: "techwear futuristic utility black tactical city"
    },
    {
        name: "Streetwear",
        description: "Subculture-based culture centered on graphic t-shirts and sneakers.",
        brands: "Supreme, Stussy, Off-White",
        aesthetic: "street culture sneaker hype editorial urban"
    },
    {
        name: "Skater",
        description: "Baggy pants and flat shoes considering the activity of boarders.",
        brands: "Vans, Palace, Dickies 874",
        aesthetic: "skate park youth loose fit candid street"
    },
    {
        name: "Normcore",
        description: "Comfortable, everyday looks that elevate 'ordinariness' into a style.",
        brands: "Uniqlo, Gap, New Balance",
        aesthetic: "everyday basics ordinary cool neutral wardrobe"
    },
    {
        name: "Y2K",
        description: "Colorful, experimental, and kitschy style of the early 2000s.",
        brands: "Diesel, Blumarine, Juicy Couture",
        aesthetic: "y2k retro futuristic glossy pop lookbook"
    },
    {
        name: "French Chic",
        description: "Unartificial sophistication and effortless elegance.",
        brands: "A.P.C., Celine, Rouje",
        aesthetic: "paris effortless chic understated street editorial"
    },
    {
        name: "Grunge",
        description: "Rough, vintage layering based on 90s rock culture.",
        brands: "Rick Owens, Saint Laurent (Hedi Era)",
        aesthetic: "grunge distressed layering rock nineties mood"
    },
    {
        name: "Bohemian",
        description: "Free patterns, ethnic details, and flowing silhouettes.",
        brands: "Isabel Marant, Chloe",
        aesthetic: "bohemian flowing fabric handcrafted detail romantic"
    },
    {
        name: "Avant-garde",
        description: "Experimental and satirical structures that break fashion stereotypes.",
        brands: "Comme des Garcons, Yohji Yamamoto",
        aesthetic: "avant garde conceptual dramatic silhouette runway"
    },
    {
        name: "Maximalism",
        description: "'More is More' - a harmony of bold colors and flashy patterns.",
        brands: "Gucci (Alessandro Michele Era), Kenzo",
        aesthetic: "maximal pattern layered ornament bold fashion"
    },
    {
        name: "Vintage / Retro",
        description: "Nostalgic retro sensibility reminiscent of specific eras.",
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
