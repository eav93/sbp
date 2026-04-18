import { readFileSync } from 'fs';
import { fileURLToPath } from 'url';
import { dirname, resolve } from 'path';

const __dirname = dirname(fileURLToPath(import.meta.url));
const DATA_PATH = resolve(__dirname, '../data/banks.json');

export interface Bank {
    id: string;
    name: string;
    logo: string | null;
    schema: string | null;
    package: string | null;
    isDrActive: boolean;
    isWebClientActive: boolean;
    webClientUrl: string | null;
}

export interface BanksData {
    version: string;
    updatedAt: string;
    banks: Bank[];
}

export interface Meta {
    version: string;
    updatedAt: string;
}

function load(): BanksData {
    return JSON.parse(readFileSync(DATA_PATH, 'utf8')) as BanksData;
}

export function getBanks(): Bank[] {
    return load().banks;
}

export function getBankById(id: string): Bank | null {
    return load().banks.find((b) => b.id === id) ?? null;
}

export function getMeta(): Meta {
    const { version, updatedAt } = load();
    return { version, updatedAt };
}

export default { getBanks, getBankById, getMeta };
