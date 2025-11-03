/**
 * Timezone utility for consistent IST (Indian Standard Time) handling
 * All business logic uses IST dates, database stores UTC
 */

const IST_OFFSET_MS = 5.5 * 60 * 60 * 1000; // IST is UTC+5:30

/**
 * Get current date/time in IST
 */
export const getISTNow = () => {
  return new Date(Date.now() + IST_OFFSET_MS);
};

/**
 * Convert UTC date to IST date
 */
export const utcToIST = (utcDate) => {
  if (!utcDate) return null;
  return new Date(utcDate.getTime() + IST_OFFSET_MS);
};

/**
 * Convert IST date to UTC date
 */
export const istToUTC = (istDate) => {
  if (!istDate) return null;
  return new Date(istDate.getTime() - IST_OFFSET_MS);
};

/**
 * Get IST date boundaries for a given date (defaults to today)
 * Returns UTC dates that correspond to IST day boundaries
 */
export const getISTDateBounds = (date = null) => {
  const referenceDate = date || getISTNow();

  // Create IST date boundaries
  const istDate = new Date(referenceDate);
  istDate.setHours(0, 0, 0, 0);

  const istTomorrow = new Date(istDate);
  istTomorrow.setDate(istTomorrow.getDate() + 1);

  // Convert back to UTC for database queries
  return {
    start: istToUTC(istDate),
    end: istToUTC(istTomorrow)
  };
};

/**
 * Get yesterday's IST date boundaries
 */
export const getISTYesterdayBounds = () => {
  const yesterday = new Date(getISTNow());
  yesterday.setDate(yesterday.getDate() - 1);
  return getISTDateBounds(yesterday);
};

/**
 * Check if a UTC timestamp falls within today's IST day
 */
export const isWithinTodayIST = (utcTimestamp) => {
  if (!utcTimestamp) return false;
  const { start, end } = getISTDateBounds();
  const timestamp = new Date(utcTimestamp);
  return timestamp >= start && timestamp < end;
};

/**
 * Check if a UTC timestamp falls within yesterday's IST day
 */
export const isWithinYesterdayIST = (utcTimestamp) => {
  if (!utcTimestamp) return false;
  const { start, end } = getISTYesterdayBounds();
  const timestamp = new Date(utcTimestamp);
  return timestamp >= start && timestamp < end;
};

/**
 * Format date to IST date string (YYYY-MM-DD)
 */
export const formatISTDateString = (date = null) => {
  const istDate = date ? utcToIST(new Date(date)) : getISTNow();
  return istDate.toISOString().split('T')[0];
};

/**
 * Format date to IST datetime string
 */
export const formatISTDateTimeString = (date = null) => {
  const istDate = date ? utcToIST(new Date(date)) : getISTNow();
  return istDate.toISOString().replace('T', ' ').slice(0, 19);
};

/**
 * Get IST date parts for formatting
 */
export const getISTDateParts = (date = null) => {
  const istDate = date ? utcToIST(new Date(date)) : getISTNow();
  return {
    year: istDate.getFullYear(),
    month: istDate.getMonth() + 1,
    day: istDate.getDate(),
    hours: istDate.getHours(),
    minutes: istDate.getMinutes(),
    seconds: istDate.getSeconds(),
    dateString: istDate.toISOString().split('T')[0],
    timeString: istDate.toISOString().split('T')[1].slice(0, 8)
  };
};