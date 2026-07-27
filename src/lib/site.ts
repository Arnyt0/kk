/** Canonical public URL for metadata, sitemap, and absolute links. */
export const SITE_URL =
  process.env.SITE_URL?.replace(/\/$/, "") ||
  "https://wattpayback.com";

export const SITE_NAME = "WattPayback";

/** Operator — filled from the site owner. Update if you prefer a pen name. */
export const OPERATOR = {
  name: "Arny",
  email: "fujira.studios@gmail.com",
};
