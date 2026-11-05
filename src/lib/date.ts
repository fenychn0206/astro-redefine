import config from '../config';

const MONTHS = [
  'Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun',
  'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec',
];

function pad(value: number): string {
  return String(value).padStart(2, '0');
}

function parts(input: Date | string | undefined) {
  const date = input instanceof Date ? input : new Date(input ?? Date.now());
  return {
    date,
    YYYY: String(date.getUTCFullYear()),
    MM: pad(date.getUTCMonth() + 1),
    DD: pad(date.getUTCDate()),
    HH: pad(date.getUTCHours()),
    mm: pad(date.getUTCMinutes()),
    ss: pad(date.getUTCSeconds()),
    MMM: MONTHS[date.getUTCMonth()],
  };
}

/**
 * Small date formatter supporting the subset of Moment tokens used by the
 * theme: YYYY, MM, DD, HH, mm, ss, MMM and MMMM.
 */
export function formatDate(
  input: Date | string | undefined,
  pattern = config.site.dateFormat,
): string {
  const p = parts(input);
  return pattern
    .replace(/YYYY/g, p.YYYY)
    .replace(/MMMM/g, [
      'January', 'February', 'March', 'April', 'May', 'June',
      'July', 'August', 'September', 'October', 'November', 'December',
    ][p.date.getUTCMonth()])
    .replace(/MMM/g, p.MMM)
    .replace(/MM/g, p.MM)
    .replace(/DD/g, p.DD)
    .replace(/HH/g, p.HH)
    .replace(/mm/g, p.mm)
    .replace(/ss/g, p.ss);
}

export function formatPostDate(input: Date | string | undefined): string {
  return formatDate(input, `${config.site.dateFormat} ${config.site.timeFormat}`)
    .replace(' 00:00:00', '')
    .replace(/:00$/, '');
}

export function isoDate(input: Date | string | undefined): string {
  return parts(input).date.toISOString();
}

export function datePath(input: Date | string | undefined): {
  year: string;
  month: string;
  day: string;
} {
  const p = parts(input);
  return { year: p.YYYY, month: p.MM, day: p.DD };
}

export function relativeDate(input: Date | string | undefined): string {
  const then = new Date(input ?? Date.now()).getTime();
  const seconds = Math.max(0, Math.floor((Date.now() - then) / 1000));
  const units: Array<[number, string]> = [
    [31536000, 'year'],
    [2592000, 'month'],
    [604800, 'week'],
    [86400, 'day'],
    [3600, 'hour'],
    [60, 'minute'],
    [1, 'second'],
  ];
  const [factor, unit] = units.find(([value]) => seconds >= value) ?? units.at(-1)!;
  const count = Math.floor(seconds / factor);
  return `${count} ${unit}${count === 1 ? '' : 's'} ago`;
}
