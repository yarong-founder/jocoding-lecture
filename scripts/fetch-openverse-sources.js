#!/usr/bin/env node

const fs = require('fs');
const path = require('path');
const https = require('https');

const ROOT = path.resolve(__dirname, '..');
const OUTPUT_CSV = path.join(ROOT, 'approved-sources.csv');

const PER_STYLE = 50;
const LICENSES = 'cc0,by,by-sa';
const LICENSE_TYPE = 'commercial';
const MIN_REQUEST_GAP_MS = 3200;
const RETRYABLE_STATUS = new Set([403, 429, 500, 502, 503, 504]);
let lastRequestAt = 0;

const styles = [
  { name: 'Classic', brands: 'Armani, Ralph Lauren Purple Label', baseQuery: 'classic fashion' },
  { name: 'Old Money', brands: 'Loro Piana, Brunello Cucinelli, The Row', baseQuery: 'luxury fashion' },
  { name: 'Minimalist', brands: 'Jil Sander, Lemaire, COS', baseQuery: 'minimalist fashion' },
  { name: 'Ivy League', brands: 'Brooks Brothers, J.Press', baseQuery: 'ivy preppy fashion' },
  { name: 'Preppy', brands: 'Polo Ralph Lauren, Tommy Hilfiger', baseQuery: 'preppy fashion' },
  { name: 'City Boy', brands: 'Nanamica, Beams, Nautica (JP)', baseQuery: 'street fashion men' },
  { name: 'Gorpcore', brands: "Arc'teryx, Salomon, And Wander", baseQuery: 'outdoor fashion utility' },
  { name: 'Workwear', brands: 'Carhartt WIP, Dickies, Red Wing', baseQuery: 'workwear fashion' },
  { name: 'Military', brands: 'Engineered Garments, Alpha Industries', baseQuery: 'military fashion' },
  { name: 'Techwear', brands: 'Acronym, Stone Island Shadow Project', baseQuery: 'techwear fashion' },
  { name: 'Streetwear', brands: 'Supreme, Stussy, Off-White', baseQuery: 'streetwear fashion' },
  { name: 'Skater', brands: 'Vans, Palace, Dickies 874', baseQuery: 'skater fashion' },
  { name: 'Normcore', brands: 'Uniqlo, Gap, New Balance', baseQuery: 'normcore fashion' },
  { name: 'Y2K', brands: 'Diesel, Blumarine, Juicy Couture', baseQuery: 'y2k fashion' },
  { name: 'French Chic', brands: 'A.P.C., Celine, Rouje', baseQuery: 'paris chic fashion' },
  { name: 'Grunge', brands: 'Rick Owens, Saint Laurent (Hedi Era)', baseQuery: 'grunge fashion' },
  { name: 'Bohemian', brands: 'Isabel Marant, Chloe', baseQuery: 'bohemian fashion' },
  { name: 'Avant-garde', brands: 'Comme des Garcons, Yohji Yamamoto', baseQuery: 'avant garde fashion' },
  { name: 'Maximalism', brands: 'Gucci (Alessandro Michele Era), Kenzo', baseQuery: 'maximalist fashion' },
  { name: 'Vintage / Retro', brands: "Levi's Vintage Clothing, Adidas Originals", baseQuery: 'vintage fashion' }
];

function sleep(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

async function fetchJson(url) {
  const wait = Math.max(0, MIN_REQUEST_GAP_MS - (Date.now() - lastRequestAt));
  if (wait > 0) {
    await sleep(wait);
  }

  for (let attempt = 1; attempt <= 4; attempt += 1) {
    const payload = await new Promise((resolve, reject) => {
      https
        .get(url, { headers: { Accept: 'application/json' } }, (res) => {
          let body = '';
          res.setEncoding('utf8');
          res.on('data', (chunk) => {
            body += chunk;
          });
          res.on('end', () => {
            resolve({ statusCode: res.statusCode || 0, body });
          });
        })
        .on('error', reject);
    });

    lastRequestAt = Date.now();
    const { statusCode, body } = payload;
    if (statusCode >= 200 && statusCode < 300) {
      return JSON.parse(body);
    }
    if (RETRYABLE_STATUS.has(statusCode) && attempt < 4) {
      await sleep(attempt * 3500);
      continue;
    }
    throw new Error(`HTTP ${statusCode}`);
  }

  throw new Error('HTTP request failed');
}

function buildUrl(query, page) {
  const params = new URLSearchParams({
    q: query,
    license: LICENSES,
    license_type: LICENSE_TYPE,
    page_size: '20',
    page: String(page)
  });
  return `https://api.openverse.org/v1/images/?${params.toString()}`;
}

function hasFashionSignal(item) {
  const text = `${item.title || ''} ${(item.tags || []).map((t) => t.name || '').join(' ')}`.toLowerCase();
  return /fashion|style|runway|lookbook|editorial|model|streetwear|outfit|clothing|wardrobe/.test(text);
}

function toLicenseLabel(item) {
  const code = String(item.license || '').toUpperCase();
  const version = item.license_version ? ` ${item.license_version}` : '';
  if (code === 'CC0') {
    return `CC0${version}`.trim();
  }
  return `CC ${code}${version}`.trim();
}

function csvEscape(value) {
  const text = String(value == null ? '' : value);
  if (/[,"\n\r]/.test(text)) {
    return `"${text.replace(/"/g, '""')}"`;
  }
  return text;
}

function rowToCsv(row) {
  return row.map(csvEscape).join(',');
}

function toApprovedRow(style, item) {
  return {
    category: style.name,
    brand: style.brands,
    image_url: item.thumbnail,
    source_url: item.detail_url,
    source_name: 'Openverse',
    title: item.title || `${style.name} fashion reference`,
    creator: item.creator || 'Unknown creator',
    license: toLicenseLabel(item),
    usage_note: `Licensed via Openverse. Original source: ${item.foreign_landing_url || 'n/a'}`,
    approved: 'yes'
  };
}

async function collectGlobalPool() {
  const globalPool = [];
  const seen = new Set();

  for (let page = 1; page <= 5; page += 1) {
    const payload = await fetchJson(buildUrl('fashion editorial', page));
    const results = Array.isArray(payload.results) ? payload.results : [];
    if (!results.length) break;

    for (const item of results) {
      if (!item || !item.id || seen.has(item.id)) continue;
      seen.add(item.id);
      if (!item.thumbnail || !item.detail_url) continue;
      if (!hasFashionSignal(item)) continue;
      globalPool.push(item);
    }
  }

  return globalPool;
}

async function collectForStyle(style, globalPool) {
  const variants = [
    `${style.baseQuery} editorial`,
    `${style.baseQuery} lookbook`,
    `${style.baseQuery} street style`,
    'fashion editorial'
  ];

  const accepted = [];
  const seen = new Set();

  for (const query of variants) {
    for (let page = 1; page <= 2; page += 1) {
      if (accepted.length >= PER_STYLE) break;

      let payload;
      try {
        payload = await fetchJson(buildUrl(query, page));
      } catch (err) {
        process.stdout.write(`Warning: ${style.name} query failed (${query}, page ${page}): ${err.message}\n`);
        break;
      }

      const results = Array.isArray(payload.results) ? payload.results : [];
      if (!results.length) break;

      for (const item of results) {
        if (accepted.length >= PER_STYLE) break;
        if (!item || !item.id) continue;
        if (seen.has(item.id)) continue;
        seen.add(item.id);

        if (!item.thumbnail || !item.detail_url) continue;
        if (!hasFashionSignal(item)) continue;

        accepted.push(toApprovedRow(style, item));
      }

      if (page >= (payload.page_count || 1)) break;
    }

    if (accepted.length >= PER_STYLE) break;
  }

  if (accepted.length < PER_STYLE) {
    for (const item of globalPool) {
      if (accepted.length >= PER_STYLE) break;
      if (!item || !item.id) continue;
      if (seen.has(item.id)) continue;
      seen.add(item.id);
      accepted.push(toApprovedRow(style, item));
    }
  }

  return accepted.slice(0, PER_STYLE);
}

async function main() {
  const header = [
    'category',
    'brand',
    'image_url',
    'source_url',
    'source_name',
    'title',
    'creator',
    'license',
    'usage_note',
    'approved'
  ];

  const rows = [header];
  process.stdout.write('Collecting global fallback pool...\n');
  const globalPool = await collectGlobalPool();
  process.stdout.write(`Global fallback pool size: ${globalPool.length}\n`);

  for (const style of styles) {
    process.stdout.write(`Collecting ${style.name}...\n`);
    const items = await collectForStyle(style, globalPool);

    if (items.length < PER_STYLE) {
      process.stdout.write(`Warning: ${style.name} only found ${items.length}/${PER_STYLE}\n`);
    }

    for (const item of items) {
      rows.push([
        item.category,
        item.brand,
        item.image_url,
        item.source_url,
        item.source_name,
        item.title,
        item.creator,
        item.license,
        item.usage_note,
        item.approved
      ]);
    }
  }

  const csv = rows.map(rowToCsv).join('\n') + '\n';
  fs.writeFileSync(OUTPUT_CSV, csv, 'utf8');
  process.stdout.write(`Wrote ${rows.length - 1} approved rows to approved-sources.csv\n`);
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
