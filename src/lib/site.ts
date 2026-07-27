/** Canonical public URL for metadata, sitemap, and absolute links. */
export const SITE_URL =
  process.env.SITE_URL?.replace(/\/$/, "") ||
  "https://kk-livid-seven.vercel.app";

export const SITE_NAME = "WattPayback";

/** Operator — filled from the site owner. Update if you prefer a pen name. */
export const OPERATOR = {
  name: "Arnošt Jurech",
  email: "arnostju@gmail.com",
};
