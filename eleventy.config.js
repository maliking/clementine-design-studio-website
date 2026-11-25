export default function (eleventyConfig) {
  eleventyConfig.addPassthroughCopy({ "src/assets": "assets" });
  eleventyConfig.addGlobalData("year", () => new Date().getFullYear());
  // While the site is only a preview, every page asks search engines not to list it.
  eleventyConfig.addGlobalData("preview", () => process.env.SITE_LIVE !== "true");
  return { dir: { input: "src", includes: "_includes", data: "_data", output: "_site" } };
}
