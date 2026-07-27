/** @type {import('next-sitemap').IConfig} */
module.exports = {
  siteUrl: process.env.SITE_URL || "https://kk-livid-seven.vercel.app",
  generateRobotsTxt: true,
  exclude: ["/server-sitemap.xml"],
};
