import { defineConfig } from 'cypress';

export default defineConfig({
	e2e: {
		baseUrl: 'http://localhost:3000/',
	},
	viewportWidth: 1366,
	viewportHeight: 768,
	chromeWebSecurity: false,
});
