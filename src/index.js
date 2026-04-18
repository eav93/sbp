import { readFileSync } from 'fs';
import { fileURLToPath } from 'url';
import { dirname, resolve } from 'path';

const __dirname = dirname(fileURLToPath(import.meta.url));
const DATA_PATH = resolve(__dirname, '../data/banks.json');

function load() {
    return JSON.parse(readFileSync(DATA_PATH, 'utf8'));
}

/**
 * @returns {{ id: string, name: string, logo: string|null, schema: string|null, package: string|null, isDrActive: boolean, isWebClientActive: boolean, webClientUrl: string|null }[]}
 */
export function getBanks() {
    return load().banks;
}

/**
 * @param {string} id
 */
export function getBankById(id) {
    return load().banks.find((b) => b.id === id) ?? null;
}

/**
 * @returns {{ version: string, updatedAt: string }}
 */
export function getMeta() {
    const { version, updatedAt } = load();
    return { version, updatedAt };
}

export default { getBanks, getBankById, getMeta };
