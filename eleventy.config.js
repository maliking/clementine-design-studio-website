export default function (eleventyConfig) {
  eleventyConfig.addPassthroughCopy({ "src/assets": "assets" });
  eleventyConfig.addPassthroughCopy({ "src/favicon.ico": "favicon.ico" });
  // IndexNow key (lets OpenSEO tell Bing and others when a page changes). Added 11/25.
  eleventyConfig.addPassthroughCopy({ "src/a1cefb92303848fb980444ad47d7f6e5.txt": "a1cefb92303848fb980444ad47d7f6e5.txt" });
  eleventyConfig.addGlobalData("year", () => new Date().getFullYear());
  // While the site is only a preview, every page asks search engines not to list it.
  eleventyConfig.addGlobalData("preview", () => process.env.SITE_LIVE !== "true");
  return { dir: { input: "src", includes: "_includes", data: "_data", output: "_site" } };
}
