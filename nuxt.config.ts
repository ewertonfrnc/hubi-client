// import { HubiScheme } from "./utils/presets";

import { definePreset } from "@primevue/themes";
import Aura from "@primevue/themes/aura";

export const HubiScheme = definePreset(Aura, {
  semantic: {
    primary: {
      50: "{violet.50}",
      100: "{violet.100}",
      200: "{violet.200}",
      300: "{violet.300}",
      400: "{violet.400}",
      500: "{violet.500}",
      600: "{violet.600}",
      700: "{violet.700}",
      800: "{violet.800}",
      900: "{violet.900}",
      950: "{violet.950}",
    },
    colorScheme: {
      dark: {
        surface: {
          0: "#ffffff",
          50: "{zinc.50}",
          100: "{zinc.100}",
          200: "{zinc.200}",
          300: "{zinc.300}",
          400: "{zinc.400}",
          500: "{zinc.500}",
          600: "{zinc.600}",
          700: "{zinc.700}",
          800: "{zinc.800}",
          900: "{zinc.900}",
          950: "{zinc.950}",
          root: "#121212",
        },
      },
    },
  },
  components: {
    card: {
      colorScheme: {
        dark: {
          background: "{surface.800}",
        },
      },
    },
    chip: {
      colorScheme: {
        dark: {
          background: "{primary.50}",
          color: "{primary.950}",
        },
      },
    },
    tabs: {
      tablist: {
        background: "{surface.root}",
        border: {
          color: "transparent",
        },
      },
      tab: {
        background: "{surface.root}",
        border: {
          color: "transparent",
        },
      },
      tabpanel: {
        background: "{surface.root}",
      },
    },
    dialog: {
      border: {
        color: "transparent",
      },
    },
  },
});

// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: "2024-11-01",
  devtools: { enabled: true },
  typescript: { typeCheck: true },
  ssr: false,

  app: {
    head: {
      htmlAttrs: {
        class: "my-app-dark",
      },
    },
    pageTransition: {
      name: "page",
      mode: "out-in",
    },
  },
  css: ["primeicons/primeicons.css", "~/assets/css/base.css"],

  modules: [
    "@nuxt/eslint",
    "@primevue/nuxt-module",
    "@nuxtjs/google-fonts",
    "@pinia/nuxt",
  ],
  googleFonts: {
    families: {
      Poppins: [100, 200, 300, 400, 500, 600, 700, 800, 900],
    },
    display: "swap",
    preconnect: true,
  },
  primevue: {
    options: {
      ripple: true,
      theme: {
        preset: HubiScheme,
        options: { darkModeSelector: ".my-app-dark" },
      },
    },
  },

  runtimeConfig: {
    public: {
      TMDB_API_URL: process.env.TMDB_API_URL,
      TMDB_ACCESS_TOKEN_AUTH: process.env.TMDB_ACCESS_TOKEN_AUTH,
      SUPABASE_ANON_KEY: process.env.SUPABASE_ANON_KEY,
      SUPABASE_PROJECT_URL: process.env.SUPABASE_PROJECT_URL,
    },
  },
});
