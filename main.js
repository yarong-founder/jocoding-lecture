const fashionStyles = [
    {
        name: "Classic",
        description: "Refined silhouettes, timeless formality unaffected by trends.",
        brands: "Armani, Ralph Lauren Purple Label",
        searchTags: "vogue-runway-classic-suit,high-fashion-classic-editorial"
    },
    {
        name: "Old Money",
        description: "Logo-less luxury, premium materials, and an elegant mood.",
        brands: "Loro Piana, Brunello Cucinelli, The Row",
        searchTags: "quiet-luxury-fashion,old-money-aesthetic-lookbook"
    },
    {
        name: "Minimalist",
        description: "Extreme simplicity, clean fits, and primarily neutral colors.",
        brands: "Jil Sander, Lemaire, COS",
        searchTags: "minimalist-fashion-runway,vogue-minimalist-editorial"
    },
    {
        name: "Ivy League",
        description: "Conservative and neat looks of 1950s-60s US East Coast college students.",
        brands: "Brooks Brothers, J.Press",
        searchTags: "ivy-league-fashion-style,vintage-college-lookbook"
    },
    {
        name: "Preppy",
        description: "A style adding cheerful colors and sportiness to the Ivy look.",
        brands: "Polo Ralph Lauren, Tommy Hilfiger",
        searchTags: "preppy-style-vogue,ralph-lauren-lookbook"
    },
    {
        name: "City Boy",
        description: "Oversized layering and relaxed urban casual style.",
        brands: "Nanamica, Beams, Nautica (JP)",
        searchTags: "japanese-city-boy-style,oversized-fashion-editorial"
    },
    {
        name: "Gorpcore",
        description: "Functional looks matching outdoor wear sensually for daily life.",
        brands: "Arc'teryx, Salomon, And Wander",
        searchTags: "gorpcore-fashion-runway,tech-outdoor-editorial"
    },
    {
        name: "Workwear",
        description: "Practical designs using tough, durable materials (denim, duck canvas).",
        brands: "Carhartt WIP, Dickies, Red Wing",
        searchTags: "heritage-workwear-fashion,rugged-editorial-lookbook"
    },
    {
        name: "Military",
        description: "Reinterpreting military uniform details into modern fashion elements.",
        brands: "Engineered Garments, Alpha Industries",
        searchTags: "military-fashion-runway,army-style-editorial"
    },
    {
        name: "Techwear",
        description: "Functional fabrics, multi-functional pockets, and futuristic cyberpunk mood.",
        brands: "Acronym, Stone Island Shadow Project",
        searchTags: "techwear-fashion-lookbook,cyberpunk-runway-style"
    },
    {
        name: "Streetwear",
        description: "Subculture-based culture centered on graphic t-shirts and sneakers.",
        brands: "Supreme, Stüssy, Off-White",
        searchTags: "high-end-streetwear-runway,vogue-street-style"
    },
    {
        name: "Skater",
        description: "Baggy pants and flat shoes considering the activity of boarders.",
        brands: "Vans, Palace, Dickies 874",
        searchTags: "skater-fashion-editorial,90s-skate-style-lookbook"
    },
    {
        name: "Normcore",
        description: "Comfortable, everyday looks that elevate 'ordinariness' into a style.",
        brands: "Uniqlo, Gap, New Balance",
        searchTags: "normcore-fashion-vogue,essential-minimal-lookbook"
    },
    {
        name: "Y2K",
        description: "Colorful, experimental, and kitschy style of the early 2000s.",
        brands: "Diesel, Blumarine, Juicy Couture",
        searchTags: "y2k-fashion-runway,2000s-vogue-editorial"
    },
    {
        name: "French Chic",
        description: "Unartificial sophistication and effortless elegance.",
        brands: "A.P.C., Celine, Rouje",
        searchTags: "parisian-chic-runway,french-vogue-editorial"
    },
    {
        name: "Grunge",
        description: "Rough, vintage layering based on 90s rock culture.",
        brands: "Rick Owens, Saint Laurent (Hedi Era)",
        searchTags: "grunge-fashion-editorial,90s-rock-runway"
    },
    {
        name: "Bohemian",
        description: "Free patterns, ethnic details, and flowing silhouettes.",
        brands: "Isabel Marant, Chloé",
        searchTags: "bohemian-luxury-runway,vogue-boho-editorial"
    },
    {
        name: "Avant-garde",
        description: "Experimental and satirical structures that break fashion stereotypes.",
        brands: "Comme des Garçons, Yohji Yamamoto",
        searchTags: "avant-garde-runway,conceptual-fashion-editorial"
    },
    {
        name: "Maximalism",
        description: "'More is More' – a harmony of bold colors and flashy patterns.",
        brands: "Gucci (Alessandro Michele Era), Kenzo",
        searchTags: "maximalist-fashion-runway,bold-vogue-editorial"
    },
    {
        name: "Vintage / Retro",
        description: "Nostalgic retro sensibility reminiscent of specific eras.",
        brands: "Levi's Vintage Clothing, Adidas Originals",
        searchTags: "vintage-fashion-lookbook,retro-runway-style"
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

function openGallery(style) {
    modalTitle.textContent = style.name;
    modalDesc.textContent = style.description;
    modalBrands.textContent = `Representative Brands: ${style.brands}`;
    modalGallery.innerHTML = '';
    
    for (let i = 1; i <= 50; i++) {
        const img = document.createElement('img');
        img.className = 'gallery-item';
        const width = 600;
        const height = 900;
        
        // Combining high-fashion keywords with the specific style tags
        // This ensures the results are biased towards runway/editorial photos
        const fashionBias = "vogue,runway,editorial";
        const keywords = `${fashionBias},${style.searchTags}`;
        
        // Using a more reliable way to get high-quality unique images:
        // LoremFlickr with fashion-specific combined tags
        img.src = `https://loremflickr.com/${width}/${height}/${keywords}/all?lock=${i + (fashionStyles.indexOf(style) * 50)}`;
        
        img.onerror = function() {
            this.src = `https://loremflickr.com/${width}/${height}/high-fashion,runway/all?lock=${i}`;
        };
        
        modalGallery.appendChild(img);
    }
    
    modal.style.display = 'block';
    document.body.style.overflow = 'hidden'; 
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
