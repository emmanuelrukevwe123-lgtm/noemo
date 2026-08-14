import { readFileSync, writeFileSync, mkdirSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";
import type { Candle, PairId } from "../types.js";

const DATA_DIR = join(dirname(fileURLToPath(import.meta.url)), "..", "..", "data");

/** Compact on-disk format: rows of [time, open, high, low, close]. */
interface PairFile {
  pair: PairId;
  rows: [number, number, number, number, number][];
}

export function dataPath(pair: PairId): string {
  return join(DATA_DIR, `${pair}-1m.json`);
}

export function savePair(pair: PairId, candles: Candle[]): void {
  mkdirSync(DATA_DIR, { recursive: true });
  const file: PairFile = {
    pair,
    rows: candles.map((c) => [c.time, c.open, c.high, c.low, c.close])
  };
  writeFileSync(dataPath(pair), JSON.stringify(file));
}

export function loadPair(pair: PairId): Candle[] {
  const file = JSON.parse(readFileSync(dataPath(pair), "utf8")) as PairFile;
  return file.rows.map(([time, open, high, low, close]) => ({ time, open, high, low, close }));
}
