const fashionStyles = [
    {
        name: "Classic",
        description: "Refined silhouettes, timeless formality unaffected by trends.",
        brands: "Armani, Ralph Lauren Purple Label",
        query: "classic-fashion-runway,vogue-editorial"
    },
    {
        name: "Old Money",
        description: "Logo-less luxury, premium materials, and an elegant mood.",
        brands: "Loro Piana, Brunello Cucinelli, The Row",
        query: "quiet-luxury-fashion,old-money-aesthetic"
    },
    {
        name: "Minimalist",
        description: "Extreme simplicity, clean fits, and primarily neutral colors.",
        brands: "Jil Sander, Lemaire, COS",
        query: "minimalist-fashion-runway,vogue-minimal"
    },
    {
        name: "Ivy League",
        description: "Conservative and neat looks of 1950s-60s US East Coast college students.",
        brands: "Brooks Brothers, J.Press",
        query: "ivy-league-style,vintage-vogue"
    },
    {
        name: "Preppy",
        description: "A style adding cheerful colors and sportiness to the Ivy look.",
        brands: "Polo Ralph Lauren, Tommy Hilfiger",
        query: "preppy-style,ralph-lauren-runway"
    },
    {
        name: "City Boy",
        description: "Oversized layering and relaxed urban casual style.",
        brands: "Nanamica, Beams, Nautica (JP)",
        query: "japanese-city-boy-fashion,oversized-vogue"
    },
    {
        name: "Gorpcore",
        description: "Functional looks matching outdoor wear sensually for daily life.",
        brands: "Arc'teryx, Salomon, And Wander",
        query: "gorpcore-fashion,outdoor-runway"
    },
    {
        name: "Workwear",
        description: "Practical designs using tough, durable materials (denim, duck canvas).",
        brands: "Carhartt WIP, Dickies, Red Wing",
        query: "heritage-workwear,rugged-fashion-editorial"
    },
    {
        name: "Military",
        description: "Reinterpreting military uniform details into modern fashion elements.",
        brands: "Engineered Garments, Alpha Industries",
        query: "military-fashion-runway,army-vogue"
    },
    {
        name: "Techwear",
        description: "Functional fabrics, multi-functional pockets, and futuristic cyberpunk mood.",
        brands: "Acronym, Stone Island Shadow Project",
        query: "techwear-fashion,cyberpunk-runway"
    },
    {
        name: "Streetwear",
        description: "Subculture-based culture centered on graphic t-shirts and sneakers.",
        brands: "Supreme, Stüssy, Off-White",
        query: "luxury-streetwear-runway,vogue-street-style"
    },
    {
        name: "Skater",
        description: "Baggy pants and flat shoes considering the activity of boarders.",
        brands: "Vans, Palace, Dickies 874",
        query: "skater-fashion-editorial,90s-skate-style"
    },
    {
        name: "Normcore",
        description: "Comfortable, everyday looks that elevate 'ordinariness' into a style.",
        brands: "Uniqlo, Gap, New Balance",
        query: "normcore-fashion-vogue,essential-minimal"
    },
    {
        name: "Y2K",
        description: "Colorful, experimental, and kitschy style of the early 2000s.",
        brands: "Diesel, Blumarine, Juicy Couture",
        query: "y2k-fashion-runway,2000s-vogue"
    },
    {
        name: "French Chic",
        description: "Unartificial sophistication and effortless elegance.",
        brands: "A.P.C., Celine, Rouje",
        query: "parisian-chic,french-vogue-editorial"
    },
    {
        name: "Grunge",
        description: "Rough, vintage layering based on 90s rock culture.",
        brands: "Rick Owens, Saint Laurent (Hedi Era)",
        query: "grunge-fashion-runway,90s-rock-vogue"
    },
    {
        name: "Bohemian",
        description: "Free patterns, ethnic details, and flowing silhouettes.",
        brands: "Isabel Marant, Chloé",
        query: "bohemian-luxury-runway,vogue-boho"
    },
    {
        name: "Avant-garde",
        description: "Experimental and satirical structures that break fashion stereotypes.",
        brands: "Comme des Garçons, Yohji Yamamoto",
        query: "avant-garde-runway,conceptual-fashion"
    },
    {
        name: "Maximalism",
        description: "'More is More' – a harmony of bold colors and flashy patterns.",
        brands: "Gucci (Alessandro Michele Era), Kenzo",
        query: "maximalist-fashion-runway,gucci-editorial"
    },
    {
        name: "Vintage / Retro",
        description: "Nostalgic retro sensibility reminiscent of specific eras.",
        brands: "Levi's Vintage Clothing, Adidas Originals",
        query: "vintage-fashion-lookbook,retro-vogue"
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
    
    // High-fashion photo IDs for guaranteed quality as backup
    const backupFashionPhotos = [
        "1539109136881-3be0616acf4b", "1445205170230-053b83016050", "1509631179647-0177331693ae",
        "1490481658042-58bb8fab4128", "1483985988355-763728e1935b", "1492707844780-b1d82043992e"
    ];

    for (let i = 1; i <= 50; i++) {
        const img = document.createElement('img');
        img.className = 'gallery-item';
        const width = 600;
        const height = 900;
        
        // Use Unsplash Source with guaranteed fashion keywords
        // The keywords are structured to force Runway/Editorial results
        const keywords = `fashion,runway,vogue,${style.query}`;
        img.src = `https://source.unsplash.com/featured/${width}x${height}/?${keywords}&sig=${i}-${style.name}`;
        
        // Final protection against cats: if for any reason it fails, use a curated fashion ID from Unsplash
        img.onerror = function() {
            const fallbackId = backupFashionPhotos[i % backupFashionPhotos.length];
            this.src = `https://images.unsplash.com/photo-${fallbackId}?auto=format&fit=crop&q=80&w=${width}&h=${height}`;
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
