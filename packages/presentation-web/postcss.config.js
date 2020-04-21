const purgecss = require("@fullhuman/postcss-purgecss")({
   content: ["./src/**/*.tsx", "./src/**/*.jsx", "./public/index.html"],
   css: ["./src/Presentation/css/tailwind.css"],

   defaultExtractor: content => content.match(/[\w-/:]+(?<!:)/g) || [],
})

module.exports = {
   plugins: [
      require("tailwindcss"),
      require("autoprefixer"),
      ...(process.env.NODE_ENV === "production" ? [purgecss] : []),
   ],
}
