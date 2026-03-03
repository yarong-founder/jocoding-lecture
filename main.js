const fashionStyles = [
    {
        name: "Classic",
        description: "Refined silhouettes, timeless formality unaffected by trends.",
        brands: "Armani, Ralph Lauren Purple Label",
        aesthetic: "vogue-runway-classic-tailoring-couture"
    },
    {
        name: "Old Money",
        description: "Logo-less luxury, premium materials, and an elegant mood.",
        brands: "Loro Piana, Brunello Cucinelli, The Row",
        aesthetic: "quiet-luxury-high-fashion-editorial-loro-piana"
    },
    {
        name: "Minimalist",
        description: "Extreme simplicity, clean fits, and primarily neutral colors.",
        brands: "Jil Sander, Lemaire, COS",
        aesthetic: "jil-sander-minimalist-runway-vogue"
    },
    {
        name: "Ivy League",
        description: "Conservative and neat looks of 1950s-60s US East Coast college students.",
        brands: "Brooks Brothers, J.Press",
        aesthetic: "ivy-league-fashion-editorial-heritage"
    },
    {
        name: "Preppy",
        description: "A style adding cheerful colors and sportiness to the Ivy look.",
        brands: "Polo Ralph Lauren, Tommy Hilfiger",
        aesthetic: "luxury-preppy-lookbook-vogue-style"
    },
    {
        name: "City Boy",
        description: "Oversized layering and relaxed urban casual style.",
        brands: "Nanamica, Beams, Nautica (JP)",
        aesthetic: "japanese-city-boy-fashion-editorial-high-end"
    },
    {
        name: "Gorpcore",
        description: "Functional looks matching outdoor wear sensually for daily life.",
        brands: "Arc'teryx, Salomon, And Wander",
        aesthetic: "luxury-gorpcore-runway-vogue-editorial"
    },
    {
        name: "Workwear",
        description: "Practical designs using tough, durable materials (denim, duck canvas).",
        brands: "Carhartt WIP, Dickies, Red Wing",
        aesthetic: "heritage-workwear-fashion-vogue-runway"
    },
    {
        name: "Military",
        description: "Reinterpreting military uniform details into modern fashion elements.",
        brands: "Engineered Garments, Alpha Industries",
        aesthetic: "military-couture-runway-high-fashion"
    },
    {
        name: "Techwear",
        description: "Functional fabrics, multi-functional pockets, and futuristic cyberpunk mood.",
        brands: "Acronym, Stone Island Shadow Project",
        aesthetic: "techwear-high-fashion-editorial-vogue"
    },
    {
        name: "Streetwear",
        description: "Subculture-based culture centered on graphic t-shirts and sneakers.",
        brands: "Supreme, Stüssy, Off-White",
        aesthetic: "luxury-streetwear-runway-vogue-couture"
    },
    {
        name: "Skater",
        description: "Baggy pants and flat shoes considering the activity of boarders.",
        brands: "Vans, Palace, Dickies 874",
        aesthetic: "skater-luxury-fashion-editorial-90s"
    },
    {
        name: "Normcore",
        description: "Comfortable, everyday looks that elevate 'ordinariness' into a style.",
        brands: "Uniqlo, Gap, New Balance",
        aesthetic: "high-end-normcore-vogue-minimalist"
    },
    {
        name: "Y2K",
        description: "Colorful, experimental, and kitschy style of the early 2000s.",
        brands: "Diesel, Blumarine, Juicy Couture",
        aesthetic: "y2k-luxury-runway-vogue-editorial"
    },
    {
        name: "French Chic",
        description: "Unartificial sophistication and effortless elegance.",
        brands: "A.P.C., Celine, Rouje",
        aesthetic: "parisian-chic-runway-vogue-editorial"
    },
    {
        name: "Grunge",
        description: "Rough, vintage layering based on 90s rock culture.",
        brands: "Rick Owens, Saint Laurent (Hedi Era)",
        aesthetic: "grunge-luxury-runway-vogue-editorial"
    },
    {
        name: "Bohemian",
        description: "Free patterns, ethnic details, and flowing silhouettes.",
        brands: "Isabel Marant, Chloé",
        aesthetic: "bohemian-luxury-runway-chloe-vogue"
    },
    {
        name: "Avant-garde",
        description: "Experimental and satirical structures that break fashion stereotypes.",
        brands: "Comme des Garçons, Yohji Yamamoto",
        aesthetic: "avant-garde-runway-vogue-couture"
    },
    {
        name: "Maximalism",
        description: "'More is More' – a harmony of bold colors and flashy patterns.",
        brands: "Gucci (Alessandro Michele Era), Kenzo",
        aesthetic: "maximalist-high-fashion-editorial-gucci"
    },
    {
        name: "Vintage / Retro",
        description: "Nostalgic retro sensibility reminiscent of specific eras.",
        brands: "Levi's Vintage Clothing, Adidas Originals",
        aesthetic: "retro-vogue-runway-historical-fashion"
    }
];

const styleGrid = document.getElementById('style-grid');
const modal = document.getElementById('gallery-modal');
const modalTitle = document.getElementById('modal-title');
const modalDesc = document.getElementById('modal-description');
const modalBrands = document.getElementById('modal-brands');
const modalGallery = document.getElementById('modal-gallery');
const closeBtn = document.querySelector('.close-btn');

function init() {
    fashionStyles.forEach((style) => {
        const card = document.createElement('div');
        card.className = 'style-card';
        card.innerHTML = `
            <div class="style-name">${style.name}</div>
            <div class="style-description">${style.description}</div>
            <div class="style-brands">Brands: ${style.brands}</div>
        `;
        card.addEventListener('click', () => openGallery(style));
        styleGrid.appendChild(card);
    });
}

async function openGallery(style) {
    modalTitle.textContent = style.name;
    modalDesc.textContent = style.description;
    modalBrands.textContent = `Representative Brands: ${style.brands}`;
    modalGallery.innerHTML = '';
    
    modal.style.display = 'block';
    document.body.style.overflow = 'hidden';

    // Load 30 images in small staggered chunks
    for (let i = 0; i < 30; i++) {
        loadImage(style, i);
        if ((i + 1) % 5 === 0) {
            await new Promise(resolve => setTimeout(resolve, 200));
        }
    }
}

function loadImage(style, index) {
    const imgContainer = document.createElement('div');
    imgContainer.className = 'gallery-item-container';
    imgContainer.innerHTML = '<div class="loader"></div>';
    modalGallery.appendChild(imgContainer);

    // 1. Prepare Prompt and URL
    const cleanAesthetic = style.aesthetic.replace(/-/g, ' ');
    const promptText = `High-end fashion editorial, ${cleanAesthetic}, vogue runway, aesthetic professional lighting, detailed texture, 8k, lookbook style`;
    const seed = Math.floor(Math.random() * 1000000) + (style.name.length * index);
    const imageUrl = `https://image.pollinations.ai/prompt/${encodeURIComponent(promptText)}?width=600&height=900&nologo=true&seed=${seed}`;
    const fallbackUrl = `https://picsum.photos/seed/${encodeURIComponent(`${style.name}-${index}`)}/600/900`;

    // 2. Create Image Object
    const img = new Image();

    // 3. Set up Timeout (45 seconds for AI generation)
    const timeoutId = setTimeout(() => {
        img.onload = null;
        img.onerror = null;
        if (imgContainer.querySelector('.loader')) {
            imgContainer.innerHTML = '<div style="font-size: 10px; color: #aaa; text-align: center; padding: 20px;">Primary source unavailable. Loading fallback...</div>';
        }
        loadFallbackImage(imgContainer, fallbackUrl);
    }, 45000);

    // 4. Set up Handlers
    img.onload = () => {
        clearTimeout(timeoutId);
        img.className = 'gallery-item';
        imgContainer.innerHTML = '';
        imgContainer.appendChild(img);
    };

    img.onerror = () => {
        clearTimeout(timeoutId);
        imgContainer.innerHTML = '<div style="font-size: 10px; color: #aaa; text-align: center; padding: 20px;">Retrying...</div>';
        // Automatic one-time retry with different seed
        setTimeout(() => {
            const retryImg = new Image();
            retryImg.onload = () => {
                retryImg.className = 'gallery-item';
                imgContainer.innerHTML = '';
                imgContainer.appendChild(retryImg);
            };
            retryImg.onerror = () => {
                imgContainer.innerHTML = '<div style="font-size: 10px; color: #aaa; text-align: center; padding: 20px;">Primary source failed. Using fallback...</div>';
                loadFallbackImage(imgContainer, fallbackUrl);
            };
            retryImg.src = `https://image.pollinations.ai/prompt/${encodeURIComponent(promptText)}?width=600&height=900&nologo=true&seed=${seed + 999}`;
        }, 1000);
    };

    // 5. Start Loading
    img.src = imageUrl;
}

function loadFallbackImage(container, fallbackUrl) {
    const fallbackImg = new Image();
    fallbackImg.onload = () => {
        fallbackImg.className = 'gallery-item';
        container.innerHTML = '';
        container.appendChild(fallbackImg);
    };
    fallbackImg.onerror = () => {
        container.innerHTML = '<div style="font-size: 10px; color: #aaa; text-align: center; padding: 20px;">Image unavailable.</div>';
    };
    fallbackImg.src = fallbackUrl;
}

closeBtn.onclick = function() {
    modal.style.display = 'none';
    document.body.style.overflow = 'auto';
}

window.onclick = function(event) {
    if (event.target == modal) {
        modal.style.display = 'none';
        document.body.style.overflow = 'auto';
    }
}

init();
