// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  devtools: { enabled: true },
  postcss: {
    plugins: {
      tailwindcss: {},
      autoprefixer: {},
    },
  },
  plugins: [],
  css: ["~/assets/scss/module.scss"],
  modules: ["nuxt-icon", "@nuxtjs/eslint-module"],
});
