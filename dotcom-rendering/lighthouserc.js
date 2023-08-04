module.exports = {
	ci: {
		collect: {
			url: [process.env.LHCI_URL],
			startServerCommand:
				'NODE_ENV=production DISABLE_LOGGING_AND_METRICS=true node dist/server.cjs',
			numberOfRuns: '10',
			puppeteerScript: './scripts/lighthouse/puppeteer-script.js',
			settings: {
				onlyCategories: 'accessibility,best-practices,performance,seo',
				disableStorageReset: true,
			},
		},
		upload: {
			target: 'temporary-public-storage',
		},
		assert: {
			includePassedAssertions: true,
			assertMatrix: [
				{
					matchingUrlPattern: '.*',
					assertions: {
						'first-contentful-paint': [
							'warn',
							{ maxNumericValue: 1500 },
						],
						'largest-contentful-paint': [
							'warn',
							{ maxNumericValue: 3000 },
						],
						interactive: ['warn', { maxNumericValue: 3500 }],
						'cumulative-layout-shift': [
							'warn',
							{ maxNumericValue: 0.002 },
						],
					},
				},
				{
					matchingUrlPattern: 'http://localhost:9000/Article/.+',
					assertions: {
						'total-blocking-time': [
							'warn',
							{ maxNumericValue: 219 },
						],
						'categories:accessibility': [
							'error',
							{ minScore: 0.98 },
						],
					},
				},
				{
					matchingUrlPattern: 'http://localhost:9000/Front/.+',
					assertions: {
						'total-blocking-time': [
							'warn',
							{ maxNumericValue: 716 },
						],
						'categories:accessibility': [
							'warn',
							{ minScore: 0.98 },
						],
					},
				},
			],
		},
	},
};
