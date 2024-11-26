/**
 * Get local datetime with ISO string formatted
 *
 * @returns string
 */

const dateLocalISOString = () => {
  const tzOffset = new Date().getTimezoneOffset() * 60000;
  const dt = new Date(Date.now() - tzOffset).toISOString();
  return dt.replace(/\.\d+/, "").replace("Z", "").replace("T", " ");
};

/**
 * Remove T and Z string from ISO date string format
 *
 * @param {string} dt ISO String
 */
const removeISODateTZ = (dt) => {
  return dt.replace("Z", "").replace("T", " ");
};

/**
 * Get datetime with +7 hour TimeZone
 *
 * @returns string - date with YYYYMMDD HH:mm:ss format
 */
const dateGMT7 = () => {
  const now = new Date();
  return new Date(now.toLocaleString("en-US", { timeZone: "Asia/Jakarta" }))
    .toISOString()
    .replace(/\.\d+/, "")
    .replace("T", " ")
    .replace("Z", "");
};

module.exports = { dateLocalISOString, removeISODateTZ, dateGMT7 };
