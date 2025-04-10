import { vite as vidstack } from "vidstack/plugins";
// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
	app: {
		head: {
			title: "TomorroW's Football",
			link: [
				{
					rel: "stylesheet",
					href: "https://fonts.googleapis.com/css2?family=Material+Symbols+Rounded:opsz,wght,FILL,GRAD@20..48,100..700,0..1,-50..200",
				},
				{
					rel: "stylesheet",
					href: "https://fonts.googleapis.com/css2?family=League+Spartan:wght@100..900&display=swap",
				},
			],
		},
	},
	vue: {
		compilerOptions: {
			isCustomElement: (tag) => tag.startsWith("media-"),
		},
	},
	vite: {
		plugins: [vidstack()],
	},
	compatibilityDate: "2024-11-01",
	devtools: { enabled: false },
	css: ["~/assets/app.css"],
	modules: ["@nuxt/eslint", "@nuxt/image", "@nuxt/ui", "@nuxt/icon"],
	runtimeConfig: {
		MAILCHIMP_API_KEY: process.env.MAILCHIMP_API_KEY,
		MAILCHIMP_AUDIENCE_ID: process.env.MAILCHIMP_AUDIENCE_ID,
	},
  image: {
    screens: {
      xs: 320,
      sm: 640,
      md: 768,
      lg: 1024,
      xl: 1280,
      xxl: 1536,
      '2xl': 1536
    }
  }
});
