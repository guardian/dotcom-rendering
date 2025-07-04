import { defineConfig, devices } from '@playwright/test';

const isDev = process.env.NODE_ENV !== 'production';
/**
 * The server port for local development or CI
 */
export const PORT = isDev ? 3030 : 9000;

/**
 * See https://playwright.dev/docs/test-configuration.
 */
export default defineConfig({
	testDir: './playwright/tests',
	// Don't run tests _within_ files in parallel locally as this causes flakiness
	// Test files still run in parallel as per the number of workers set below
	fullyParallel: !!process.env.CI,
	// Fail the build on CI if you accidentally left test.only in the source code
	forbidOnly: !!process.env.CI,
	// Retry on CI only
	retries: process.env.CI ? 3 : 1,
	// Workers run tests files in parallel
	workers: process.env.CI ? 4 : undefined,
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
	webServer: {
		// On CI the server is already started so a no-op
		command: isDev ? 'make dev' : ':',
		url: `http://localhost:${PORT}`,
		reuseExistingServer: true,
		stdout: 'pipe',
		stderr: 'pipe',
	},
});
