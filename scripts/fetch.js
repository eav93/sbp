#!/usr/bin/env node

import { writeFileSync } from 'fs';
import { fileURLToPath } from 'url';
import { dirname, resolve } from 'path';

const __dirname = dirname(fileURLToPath(import.meta.url));
const SOURCE_URL = 'https://qr.nspk.ru/proxyapp/c2bmembers.json';
const OUTPUT_PATH = resolve(__dirname, '../data/banks.json');

function extractId(schema) {
    if (!schema) return null;
    const match = schema.match(/(\d+)$/);
    return match ? match[1] : schema;
}

function transform(raw) {
    return {
        version: raw.version ?? '1.0',
        updatedAt: new Date().toISOString(),
        banks: (raw.dictionary ?? []).map((item) => ({
            id: extractId(item.schema),
            name: item.bankName,
            logo: item.logoURL ?? null,
            schema: item.schema ?? null,
            package: item.package_name ?? null,
            isDrActive: item.isDrActive ?? false,
            isWebClientActive: item.isWebClientActive === true || item.isWebClientActive === 'true',
            webClientUrl: item.webClientUrl ?? null,
        })),
    };
}

const response = await fetch(SOURCE_URL);
if (!response.ok) {
    throw new Error(`HTTP ${response.status}: ${response.statusText}`);
}

const raw = await response.json();
const data = transform(raw);

writeFileSync(OUTPUT_PATH, JSON.stringify(data, null, 2) + '\n', 'utf8');
console.log(`Updated ${data.banks.length} banks → ${OUTPUT_PATH}`);
