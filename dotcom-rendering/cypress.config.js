import { defineConfig } from 'cypress';
import plugins from './cypress/plugins';

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
  retries: 2,
  e2e: {
    // We've imported your old cypress plugins here.
    // You may want to clean this up later by importing these.
    setupNodeEvents(on, config) {
      return plugins(on, config)
    },
    baseUrl: 'http://localhost:9000/',
  },
})
