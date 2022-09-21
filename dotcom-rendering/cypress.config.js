import { defineConfig } from 'cypress';
import plugins from './cypress/plugins';

// https://docs.cypress.io/guides/references/configuration

module.exports = defineConfig({
  viewportWidth: 1500,
  viewportHeight: 860,
  video: false,
  chromeWebSecurity: false,
  blockHosts: [
    '*ophan.theguardian.com',
    'pixel.adsafeprotected.com',
    '*permutive.com',
    '*adnxs.com',
    '*adsystem.com',
    '*casalemedia.com',
    '*pubmatic.com',
    '*360yield.com',
    '*omnitagjs.com',
    '*the-ozone-project.com',
    '*openx.net',
  ],
  retries: {
    "runMode": 2,
    "openMode": 0
  },
  e2e: {
    setupNodeEvents(on, config) {
	  on('before:browser:launch', (browser = {}, launchOptions) => {
	    // mute audio in Chrome when running headless
	    if (browser.family === 'chromium' && browser.isHeadless) {
	      launchOptions.args.push('--mute-audio');
	    }
		return launchOptions;
      });
      return plugins(on, config)
    },
    baseUrl: 'http://localhost:9000/',
  },
})
