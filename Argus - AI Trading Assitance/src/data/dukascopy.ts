import { getHistoricalRates } from "dukascopy-node";
import type { Candle, PairId } from "../types.js";
import { savePair } from "./store.js";

/**
 * Downloads 1m bid candles for the strategy's pairs from Dukascopy's free
 * historical archive and stores them compactly under data/.
 *
 * Usage: npm run fetch-data [-- --from 2021-01-01] [-- --to 2025-10-01] [-- --chunk-months 1]
 *                        [-- --chunk-days 7]
 */

const PAIR_INSTRUMENTS: Record<PairId, "xauusd" | "gbpaud" | "gbpusd" | "eurusd"> = {
  XAUUSD: "xauusd",
  GBPAUD: "gbpaud",
  GBPUSD: "gbpusd",
  EURUSD: "eurusd"
};

const DEFAULT_FROM = "2021-01-01";

function* dateChunks(
  from: Date,
  to: Date,
  chunk: { months: number } | { days: number }
): Generator<[Date, Date]> {
  let start = new Date(from);
  while (start < to) {
    const end =
      "days" in chunk
        ? new Date(Date.UTC(start.getUTCFullYear(), start.getUTCMonth(), start.getUTCDate() + chunk.days))
        : new Date(Date.UTC(start.getUTCFullYear(), start.getUTCMonth() + chunk.months, 1));
    yield [start, end < to ? end : to];
    start = end;
  }
}

async function fetchPair(
  pair: PairId,
  from: Date,
  to: Date,
  chunk: { months: number } | { days: number }
): Promise<void> {
  const candles: Candle[] = [];
  let lastTime = -Infinity;
  for (const [chunkFrom, chunkTo] of dateChunks(from, to, chunk)) {
    process.stdout.write(
      `${pair}: ${chunkFrom.toISOString().slice(0, 10)} -> ${chunkTo.toISOString().slice(0, 10)} ... `
    );
    let rows: number[][] = [];
    // The datafeed host can be slow/flaky; retry whole chunks and cache
    // downloaded files so an aborted run resumes instead of restarting.
    for (let attempt = 1; attempt <= 5; attempt++) {
      try {
        rows = (await getHistoricalRates({
          instrument: PAIR_INSTRUMENTS[pair],
          dates: { from: chunkFrom, to: chunkTo },
          timeframe: "m1",
          priceType: "bid",
          format: "array",
          // This host rejects concurrent connections from here; go sequential.
          batchSize: 1,
          pauseBetweenBatchesMs: 100,
          retryCount: 5,
          useCache: true,
          cacheFolderPath: ".dukascopy-cache"
        })) as number[][];
        break;
      } catch (error) {
        if (attempt === 5) throw error;
        process.stdout.write(`retry ${attempt} ... `);
        await new Promise((resolve) => setTimeout(resolve, 5000 * attempt));
      }
    }
    let added = 0;
    for (const [time, open, high, low, close] of rows) {
      if (time <= lastTime) continue; // guard against chunk overlap
      if (open == null || high == null || low == null || close == null) continue;
      candles.push({ time, open, high, low, close });
      lastTime = time;
      added++;
    }
    console.log(`${added} candles`);
  }
  savePair(pair, candles);
  console.log(`${pair}: saved ${candles.length} 1m candles\n`);
}

async function main(): Promise<void> {
  const fromArg = process.argv.indexOf("--from");
  const from = new Date(fromArg >= 0 ? process.argv[fromArg + 1] : DEFAULT_FROM);
  const toArg = process.argv.indexOf("--to");
  const to = toArg >= 0 ? new Date(process.argv[toArg + 1]) : new Date();
  const chunkMonthsArg = process.argv.indexOf("--chunk-months");
  const chunkMonths = chunkMonthsArg >= 0 ? Number(process.argv[chunkMonthsArg + 1]) : 3;
  if (!Number.isInteger(chunkMonths) || chunkMonths < 1) {
    throw new Error("--chunk-months must be a positive integer");
  }
  const chunkDaysArg = process.argv.indexOf("--chunk-days");
  const chunkDays = chunkDaysArg >= 0 ? Number(process.argv[chunkDaysArg + 1]) : null;
  if (chunkDays !== null && (!Number.isInteger(chunkDays) || chunkDays < 1)) {
    throw new Error("--chunk-days must be a positive integer");
  }
  const chunk = chunkDays === null ? { months: chunkMonths } : { days: chunkDays };
  const pairsArg = process.argv.indexOf("--pairs");
  const pairs =
    pairsArg >= 0
      ? (process.argv[pairsArg + 1].split(",") as PairId[])
      : (Object.keys(PAIR_INSTRUMENTS) as PairId[]);
  for (const pair of pairs) {
    if (!PAIR_INSTRUMENTS[pair]) throw new Error(`Unknown pair ${pair}`);
    await fetchPair(pair, from, to, chunk);
  }
}

main().catch((error) => {
  console.error(error);
  process.exit(1);
});
