/**
 * New York time helpers. The trading day is the 5:00pm ET broker day:
 * day D runs from 17:00 NY on D-1 to 17:00 NY on D. Shifting NY wall time
 * forward by 7 hours maps 17:00 to midnight, so broker days/weeks/months
 * fall out of ordinary calendar math on the shifted clock.
 */

const HOUR = 3_600_000;
const MINUTE = 60_000;
const DAY = 86_400_000;
const BROKER_SHIFT = 7 * HOUR;

const nyFormatter = new Intl.DateTimeFormat("en-US", {
  timeZone: "America/New_York",
  year: "numeric",
  month: "2-digit",
  day: "2-digit",
  hour: "2-digit",
  minute: "2-digit",
  hour12: false
});

// NY UTC offset is constant within any UTC hour (DST shifts happen on hour
// boundaries), so cache per hour to avoid running Intl for every 1m candle.
const offsetCache = new Map<number, number>();

/** Offset in ms such that ts + offset, read as UTC, is NY wall-clock time. */
export function nyOffsetMs(ts: number): number {
  const hourKey = Math.floor(ts / HOUR);
  const cached = offsetCache.get(hourKey);
  if (cached !== undefined) return cached;
  const parts = nyFormatter.formatToParts(ts);
  const get = (type: string) => Number(parts.find((p) => p.type === type)!.value);
  const hour = get("hour") % 24; // Intl may report midnight as 24
  const wall = Date.UTC(get("year"), get("month") - 1, get("day"), hour, get("minute"));
  const offset = wall - Math.floor(ts / MINUTE) * MINUTE;
  offsetCache.set(hourKey, offset);
  return offset;
}

/** Minutes after midnight, NY wall clock. */
export function nyMinuteOfDay(ts: number): number {
  const wall = ts + nyOffsetMs(ts);
  return Math.floor((wall % DAY) / MINUTE);
}

/** Epoch ms shifted so that broker-day boundaries (17:00 NY) land on UTC midnights. */
export function brokerTime(ts: number): number {
  return ts + nyOffsetMs(ts) + BROKER_SHIFT;
}

/** Monotonic key for the broker day containing ts. */
export function brokerDayKey(ts: number): number {
  return Math.floor(brokerTime(ts) / DAY);
}

/** Minutes elapsed since the broker day started (17:00 NY). */
export function minutesIntoBrokerDay(ts: number): number {
  return Math.floor((brokerTime(ts) % DAY) / MINUTE);
}

/**
 * Monotonic key for the broker week. On the shifted clock the Sunday 17:00 NY
 * open becomes Monday 00:00, so weeks group as Monday-based calendar weeks.
 */
export function brokerWeekKey(ts: number): number {
  const dayKey = brokerDayKey(ts);
  // Epoch day 0 (1970-01-01) was a Thursday; Monday-based day-of-week:
  const dow = (dayKey + 3) % 7;
  return dayKey - dow;
}

function shiftedDate(ts: number): Date {
  return new Date(brokerTime(ts));
}

/** Monotonic key for the broker month (calendar month on the shifted clock). */
export function brokerMonthKey(ts: number): number {
  const d = shiftedDate(ts);
  return d.getUTCFullYear() * 12 + d.getUTCMonth();
}

/** Monotonic key for the broker quarter. */
export function brokerQuarterKey(ts: number): number {
  const d = shiftedDate(ts);
  return d.getUTCFullYear() * 4 + Math.floor(d.getUTCMonth() / 3);
}

/** Key for intraday buckets aligned to the broker-day start. */
export function intradayKey(ts: number, tfMinutes: number): number {
  const bt = brokerTime(ts);
  const dayStart = Math.floor(bt / DAY) * DAY;
  const bucket = Math.floor((bt - dayStart) / (tfMinutes * MINUTE));
  return dayStart + bucket * tfMinutes * MINUTE;
}
