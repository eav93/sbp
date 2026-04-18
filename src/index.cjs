'use strict';

const { readFileSync } = require('fs');
const { resolve } = require('path');

const DATA_PATH = resolve(__dirname, '../data/banks.json');

function load() {
    return JSON.parse(readFileSync(DATA_PATH, 'utf8'));
}

function getBanks() {
    return load().banks;
}

function getBankById(id) {
    return load().banks.find((b) => b.id === id) ?? null;
}

function getMeta() {
    const { version, updatedAt } = load();
    return { version, updatedAt };
}

module.exports = { getBanks, getBankById, getMeta };
