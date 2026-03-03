#!/usr/bin/env node

const fs = require('fs');
const path = require('path');

const ROOT = path.resolve(__dirname, '..');
const CSV_PATH = path.join(ROOT, 'approved-sources.csv');
const DOMAINS_PATH = path.join(ROOT, 'allowed-domains.txt');

const REQUIRED_COLUMNS = [
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

function parseCsv(text) {
  const rows = [];
  let row = [];
  let field = '';
  let inQuotes = false;

  for (let i = 0; i < text.length; i += 1) {
    const ch = text[i];
    const next = text[i + 1];

    if (ch === '"') {
      if (inQuotes && next === '"') {
        field += '"';
        i += 1;
      } else {
        inQuotes = !inQuotes;
      }
    } else if (ch === ',' && !inQuotes) {
      row.push(field);
      field = '';
    } else if ((ch === '\n' || ch === '\r') && !inQuotes) {
      if (ch === '\r' && next === '\n') i += 1;
      row.push(field);
      rows.push(row);
      row = [];
      field = '';
    } else {
      field += ch;
    }
  }

  if (field.length > 0 || row.length > 0) {
    row.push(field);
    rows.push(row);
  }

  return rows;
}

function loadAllowedDomains() {
  if (!fs.existsSync(DOMAINS_PATH)) return [];
  return fs
    .readFileSync(DOMAINS_PATH, 'utf8')
    .split(/\r?\n/)
    .map((line) => line.trim().toLowerCase())
    .filter((line) => line && !line.startsWith('#'));
}

function normalize(value) {
  return String(value || '').trim();
}

function isDomainAllowed(urlText, allowed) {
  let host = '';
  try {
    host = new URL(urlText).hostname.toLowerCase();
  } catch (e) {
    return false;
  }
  return allowed.some((d) => host === d || host.endsWith(`.${d}`));
}

function main() {
  if (!fs.existsSync(CSV_PATH)) {
    console.error('Missing approved-sources.csv');
    process.exit(1);
  }

  const allowedDomains = loadAllowedDomains();
  const csvText = fs.readFileSync(CSV_PATH, 'utf8');
  const rows = parseCsv(csvText);

  if (rows.length < 1) {
    console.error('approved-sources.csv is empty');
    process.exit(1);
  }

  const header = rows[0].map((h) => normalize(h).toLowerCase());
  const missingColumns = REQUIRED_COLUMNS.filter((c) => !header.includes(c));
  if (missingColumns.length) {
    console.error(`Missing columns: ${missingColumns.join(', ')}`);
    process.exit(1);
  }

  const col = Object.fromEntries(header.map((name, idx) => [name, idx]));

  const approvedRows = rows
    .slice(1)
    .map((row, idx) => ({ row, line: idx + 2 }))
    .filter(({ row }) => normalize(row[col.approved]).toLowerCase() === 'yes');

  const errors = [];
  const counts = new Map();

  for (const { row, line } of approvedRows) {
    const item = {};
    for (const key of REQUIRED_COLUMNS) item[key] = normalize(row[col[key]]);

    for (const key of REQUIRED_COLUMNS) {
      if (!item[key]) errors.push(`line ${line}: missing ${key}`);
    }

    if (item.image_url && !/^https?:\/\//i.test(item.image_url)) {
      errors.push(`line ${line}: image_url must be http(s)`);
    }
    if (item.source_url && !/^https?:\/\//i.test(item.source_url)) {
      errors.push(`line ${line}: source_url must be http(s)`);
    }

    if (allowedDomains.length) {
      if (item.source_url && !isDomainAllowed(item.source_url, allowedDomains)) {
        errors.push(`line ${line}: source_url domain not in allowed-domains.txt`);
      }
      if (item.image_url && !isDomainAllowed(item.image_url, allowedDomains)) {
        errors.push(`line ${line}: image_url domain not in allowed-domains.txt`);
      }
    }

    const key = item.category.toLowerCase();
    counts.set(key, (counts.get(key) || 0) + 1);
  }

  if (errors.length) {
    console.error('Validation failed:');
    errors.forEach((e) => console.error(`- ${e}`));
    process.exit(1);
  }

  console.log(`OK: ${approvedRows.length} approved rows`);
  if (counts.size) {
    console.log('Counts by category:');
    [...counts.entries()]
      .sort((a, b) => a[0].localeCompare(b[0]))
      .forEach(([k, v]) => console.log(`- ${k}: ${v}`));
  }
}

main();
