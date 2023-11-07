import { defineConfig, devices } from '@playwright/test';

/**
 * See https://playwright.dev/docs/test-configuration.
 */
// eslint-disable-next-line import/no-default-export -- default export required
export default defineConfig({
	testDir: './playwright/tests',
	// Run tests in files in parallel
	fullyParallel: true,
	// Fail the build on CI if you accidentally left test.only in the source code
	forbidOnly: !!process.env.CI,
	// Retry on CI only
	retries: process.env.CI ? 3 : 0,
	// Max parallel tests on CI
	workers: process.env.CI ? 2 : undefined,
	// Reporter to use. See https://playwright.dev/docs/test-reporters
	reporter: [['line'], ['html', { open: 'never' }]],
	// Shared settings for all the projects below. See https://playwright.dev/docs/api/class-testoptions
	use: {
		// Collect trace when retrying the failed test. See https://playwright.dev/docs/trace-viewer
		trace: 'on-first-retry',
		screenshot: 'only-on-failure',
		video: {
			mode: 'retain-on-failure',
		},
	},
	// Configure projects for major browsers
	projects: [
		{
			name: 'chromium',
			use: { ...devices['Desktop Chrome'] },
		},
	],
});
