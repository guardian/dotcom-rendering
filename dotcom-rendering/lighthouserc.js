module.exports = {
  ci: {
    collect: {
      url: ['http://localhost:9000/Article?url=https://www.theguardian.com/commentisfree/2020/feb/08/hungary-now-for-the-new-right-what-venezuela-once-was-for-the-left#noads'],
      startServerCommand: 'NODE_ENV=production DISABLE_LOGGING_AND_METRICS=true node dist/frontend.server.js',
      numberOfRuns: '10',
      puppeteerScript: './scripts/lighthouse/puppeteer-script.js',
      settings: {
        onlyCategories: "accessibility,best-practices,performance,seo",
        disableStorageReset: true
      }
    },
    upload: {
      target: 'temporary-public-storage',
    },
    assert: {
      assertions: {
        "first-contentful-paint": ["warn", {"maxNumericValue": 1500}],
        "largest-contentful-paint": ["warn", {"maxNumericValue": 3000}],
        "interactive": ["warn", {"maxNumericValue": 3500}],
        "cumulative-layout-shift": ["warn", {"maxNumericValue": 0.002}],
        'categories:accessibility': ['error', {minScore: 0.97}]
      }
    }
  },
};
