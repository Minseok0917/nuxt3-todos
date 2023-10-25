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
  modules: [
    "nuxt-icon",
    "@nuxtjs/tailwindcss",
    // "@nuxtjs/eslint-module",
    "@pinia/nuxt",
    "@pinia-plugin-persistedstate/nuxt",
  ],
  pinia: {
    autoImports: [
      "defineStore", // import { defineStore } from 'pinia'
      ["defineStore", "definePiniaStore"], // import { defineStore as definePiniaStore } from 'pinia'
    ],
  },
});
