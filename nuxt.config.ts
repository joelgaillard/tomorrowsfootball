import tailwindcss from "@tailwindcss/vite";
import { fileURLToPath } from "node:url";
// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
	ssr: true,
	app: {
		head: {
			title: "TomorroW's Football",
			link: [
				{
					rel: "stylesheet",
					href: "https://fonts.googleapis.com/css2?family=Material+Symbols+Rounded:opsz,wght,FILL,GRAD@20..48,100..700,0..1,-50..200&icon_names=menu",
				},
        {
          rel: 'stylesheet',
          href: 'https://fonts.googleapis.com/css2?family=League+Spartan:wght@100..900&display=swap'
        },
			],
		},

		baseURL: "/",
	},
	compatibilityDate: "2024-11-01",
	devtools: { enabled: false },
	srcDir: "src/",
	eslint: {
		config: {
			stylistic: {
				quotes: "single",
			},
		},
	},
	css: ["~/assets/app.css"],
	modules: ["@nuxt/eslint", "@nuxt/image", "@nuxt/ui", "@nuxt/icon"],
	nitro: {
		preset: "netlify",
	},
	alias: {
		'images': fileURLToPath(new URL('./public/images', import.meta.url)),
	  }
	
});
