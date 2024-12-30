import { definePreset } from "@primevue/themes";
import Aura from "@primevue/themes/aura";

export const HubiScheme = definePreset(Aura, {
  semantic: {
    primary: {
      500: "{purple.500}",
    },
  },
  components: {
    card: {
      colorScheme: {
        dark: {
          background: "{orange.900}",
        },
      },
    },
  },
});
