/** @type {import('next-sitemap').IConfig} */
module.exports = {
  siteUrl: process.env.SITE_URL || "https://wattpayback.com",
  generateRobotsTxt: true,
  exclude: ["/server-sitemap.xml"],
};
