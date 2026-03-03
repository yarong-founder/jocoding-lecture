const fashionStyles = [
    {
        name: "Classic",
        description: "Refined silhouettes, timeless formality unaffected by trends.",
        brands: "Armani, Ralph Lauren Purple Label",
        keyword: "classic-fashion-lookbook"
    },
    {
        name: "Old Money",
        description: "Logo-less luxury, premium materials, and an elegant mood.",
        brands: "Loro Piana, Brunello Cucinelli, The Row",
        keyword: "quiet-luxury-fashion"
    },
    {
        name: "Minimalist",
        description: "Extreme simplicity, clean fits, and primarily neutral colors.",
        brands: "Jil Sander, Lemaire, COS",
        keyword: "minimal-fashion-editorial"
    },
    {
        name: "Ivy League",
        description: "Conservative and neat looks of 1950s-60s US East Coast college students.",
        brands: "Brooks Brothers, J.Press",
        keyword: "ivy-league-style"
    },
    {
        name: "Preppy",
        description: "A style adding cheerful colors and sportiness to the Ivy look.",
        brands: "Polo Ralph Lauren, Tommy Hilfiger",
        keyword: "preppy-fashion-lookbook"
    },
    {
        name: "City Boy",
        description: "Oversized layering and relaxed urban casual style.",
        brands: "Nanamica, Beams, Nautica (JP)",
        keyword: "city-boy-style"
    },
    {
        name: "Gorpcore",
        description: "Functional looks matching outdoor wear sensually for daily life.",
        brands: "Arc'teryx, Salomon, And Wander",
        keyword: "gorpcore-fashion"
    },
    {
        name: "Workwear",
        description: "Practical designs using tough, durable materials (denim, duck canvas).",
        brands: "Carhartt WIP, Dickies, Red Wing",
        keyword: "workwear-fashion-style"
    },
    {
        name: "Military",
        description: "Reinterpreting military uniform details into modern fashion elements.",
        brands: "Engineered Garments, Alpha Industries",
        keyword: "military-fashion-editorial"
    },
    {
        name: "Techwear",
        description: "Functional fabrics, multi-functional pockets, and futuristic cyberpunk mood.",
        brands: "Acronym, Stone Island Shadow Project",
        keyword: "techwear-fashion-lookbook"
    },
    {
        name: "Streetwear",
        description: "Subculture-based culture centered on graphic t-shirts and sneakers.",
        brands: "Supreme, Stüssy, Off-White",
        keyword: "streetwear-fashion-editorial"
    },
    {
        name: "Skater",
        description: "Baggy pants and flat shoes considering the activity of boarders.",
        brands: "Vans, Palace, Dickies 874",
        keyword: "skater-fashion-style"
    },
    {
        name: "Normcore",
        description: "Comfortable, everyday looks that elevate 'ordinariness' into a style.",
        brands: "Uniqlo, Gap, New Balance",
        keyword: "normcore-fashion"
    },
    {
        name: "Y2K",
        description: "Colorful, experimental, and kitschy style of the early 2000s.",
        brands: "Diesel, Blumarine, Juicy Couture",
        keyword: "y2k-fashion-editorial"
    },
    {
        name: "French Chic",
        description: "Unartificial sophistication and effortless elegance.",
        brands: "A.P.C., Celine, Rouje",
        keyword: "french-chic-fashion"
    },
    {
        name: "Grunge",
        description: "Rough, vintage layering based on 90s rock culture.",
        brands: "Rick Owens, Saint Laurent (Hedi Era)",
        keyword: "grunge-fashion-editorial"
    },
    {
        name: "Bohemian",
        description: "Free patterns, ethnic details, and flowing silhouettes.",
        brands: "Isabel Marant, Chloé",
        keyword: "bohemian-fashion-lookbook"
    },
    {
        name: "Avant-garde",
        description: "Experimental and satirical structures that break fashion stereotypes.",
        brands: "Comme des Garçons, Yohji Yamamoto",
        keyword: "avant-garde-fashion-runway"
    },
    {
        name: "Maximalism",
        description: "'More is More' – a harmony of bold colors and flashy patterns.",
        brands: "Gucci (Alessandro Michele Era), Kenzo",
        keyword: "maximalism-fashion-editorial"
    },
    {
        name: "Vintage / Retro",
        description: "Nostalgic retro sensibility reminiscent of specific eras.",
        brands: "Levi's Vintage Clothing, Adidas Originals",
        keyword: "vintage-fashion-lookbook"
    }
];

const styleGrid = document.getElementById('style-grid');
const modal = document.getElementById('gallery-modal');
const modalTitle = document.getElementById('modal-title');
const modalDesc = document.getElementById('modal-description');
const modalBrands = document.getElementById('modal-brands');
const modalGallery = document.getElementById('modal-gallery');
const closeBtn = document.querySelector('.close-btn');

// Initialize Grid
function init() {
    fashionStyles.forEach((style, index) => {
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

// Open Gallery Modal
function openGallery(style) {
    modalTitle.textContent = style.name;
    modalDesc.textContent = style.description;
    modalBrands.textContent = `Representative Brands: ${style.brands}`;
    
    // Clear previous gallery
    modalGallery.innerHTML = '';
    
    // Inject 50 images
    for (let i = 1; i <= 50; i++) {
        const img = document.createElement('img');
        img.className = 'gallery-item';
        const width = 600;
        const height = 900;
        
        // Using a reliable source for keyword-based random images (Unsplash)
        // Adding the keyword and unique signature for variety
        img.src = `https://images.unsplash.com/featured/${width}x${height}/?${style.keyword}&sig=${i}`;
        
        // Fallback or secondary strategy to ensure high quality fashion images
        // We use keywords like 'runway', 'vogue', 'editorial' mixed with the specific style
        const refinedKeyword = `${style.keyword},fashion,lookbook`;
        img.src = `https://source.unsplash.com/featured/${width}x${height}/?${refinedKeyword}&sig=${i}-${style.name.replace(/\s+/g, '')}`;
        
        // Since source.unsplash.com is being phased out, let's use the most stable images.unsplash.com query
        // that allows keyword search through the URL path if possible, or using multiple base IDs for variety.
        // For a prototype, the signature-based featured URL is the best way to get distinct images by keyword.
        
        modalGallery.appendChild(img);
    }
    
    modal.style.display = 'block';
    document.body.style.overflow = 'hidden'; 
}

// Helper to provide somewhat realistic diversity without an API key
// In a real app, you'd fetch from Unsplash API.
// Here we use the sig parameter which usually works well for variety.

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

// Simple deterministic photo ID helper (placeholder logic)
function getFixedPhotoId(keyword, index) {
    // This is just a fallback, the source.unsplash.com URL below is better for demo.
    return ""; 
}

init();
