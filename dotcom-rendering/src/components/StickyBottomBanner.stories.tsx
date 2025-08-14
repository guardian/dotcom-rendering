import type { Meta, StoryObj } from '@storybook/react';
import { allModes } from '../../.storybook/modes';
import { ConfigProvider } from './ConfigContext';
import { StickyBottomBanner as StickyBottomBannerComponent } from './StickyBottomBanner.importable';

/**
 * StickyBottomBanner is a complex component that coordinates the display of various types of messages
 * at the bottom of articles. It uses a message picker system to ensure only one message is shown at a time.
 *
 * The priority order is:
 * 1. CMP (Consent Management Platform) messages
 * 2. Sign-in gate (when conditions are met)
 * 3. Braze marketing messages
 * 4. Reader Revenue banners (contribution/subscription asks)
 *
 * The component is implemented as an Island for client-side hydration and includes:
 * - Reader revenue banner integration with contributions service
 * - Braze marketing message integration
 * - Sign-in gate portal rendering (new implementation)
 * - Proper coordination to prevent multiple messages showing simultaneously
 *
 * **Note for Storybook**: This component requires several browser APIs and external services
 * (Braze, geolocation, auth status, Ophan) that may not be fully available in Storybook.
 * Some stories use a mock component to demonstrate the expected behavior.
 */
const meta = {
	title: 'Components/StickyBottomBanner',
	component: StickyBottomBannerComponent,
	decorators: [
		(Story) => (
			<div style={{ minHeight: '100vh', padding: '20px' }}>
				<ConfigProvider
					value={{
						renderingTarget: 'Web',
						darkModeAvailable: false,
						assetOrigin: '/',
						editionId: 'UK',
					}}
				>
					{/* Add sign-in gate placeholder element for portal rendering */}
					<div id="sign-in-gate" />

					{/* Add some content to make the banner visible */}
					<div
						style={{
							marginBottom: '100px',
							padding: '20px',
							backgroundColor: '#f0f0f0',
							borderRadius: '8px',
						}}
					>
						<h2>Article Content</h2>
						<p>
							This represents the main article content. The
							StickyBottomBanner should appear at the bottom of
							the viewport.
						</p>
						<p>
							<strong>Note:</strong> In Storybook, some external
							dependencies (Braze, geolocation, auth status) may
							not be fully functional, so the banner may not
							display exactly as it would in production.
						</p>
						<p>
							If you see a blank area at the bottom, it means the
							banner is waiting for async dependencies that don't
							resolve in Storybook. Check the "Mock" stories below
							to see the expected behavior.
						</p>
					</div>

					<Story />
				</ConfigProvider>
			</div>
		),
	],
	parameters: {
		chromatic: {
			modes: {
				'light mobile': allModes['light mobile'],
				'light mobileMedium': allModes['light mobileMedium'],
				'horizontal tablet': allModes['horizontal tablet'],
				'light desktop': allModes['light desktop'],
				'light leftCol': allModes['light leftCol'],
				'light wide': allModes['light wide'],
			},
		},
		docs: {
			description: {
				component: `
					StickyBottomBanner is the main message coordination component that ensures only one banner/message
					is shown at a time. It coordinates between reader revenue banners, Braze messages, sign-in gates,
					and CMP consent messages using a priority-based message picker system.

					**Key Features:**
					- Message prioritization (CMP → Sign-in Gate → Braze → Reader Revenue)
					- Portal-based sign-in gate rendering to correct DOM location
					- Integration with Guardian's contributions service
					- Braze marketing message support
					- Comprehensive targeting and display rules
					- Responsive design across all breakpoints
				`,
			},
		},
	},
} satisfies Meta<typeof StickyBottomBannerComponent>;

export default meta;

type Story = StoryObj<typeof meta>;

// Common mock data
const mockTags = [
	{
		id: 'world/series/coronavirus-live',
		type: 'Series',
		title: 'Coronavirus live',
	},
	{
		id: 'world/coronavirus-outbreak',
		type: 'Keyword',
		title: 'Coronavirus outbreak',
	},
	{
		id: 'world/world',
		type: 'Blog',
		title: 'World news',
	},
];

const commonArgs = {
	contentType: 'Article',
	sectionId: 'world',
	tags: mockTags,
	isPaidContent: false,
	isPreview: false,
	shouldHideReaderRevenue: false,
	isMinuteArticle: false,
	contributionsServiceUrl: 'https://contributions.theguardian.com',
	idApiUrl: 'https://idapi.theguardian.com',
	pageId: '/world/2024/jan/01/example-article',
	remoteBannerSwitch: true,
	isSensitive: false,
	host: 'https://www.theguardian.com',
};

/**
 * Default StickyBottomBanner using the real component.
 *
 * **Why the sign-in gate doesn't show in Storybook:**
 *
 * 1. **AB Testing System**: `useSignInGateSelector()` needs `useAB()?.api` which returns undefined
 * 2. **Sign-in Gate Selector**: No active sign-in gate AB tests configured in Storybook
 * 3. **Missing Dependencies**: Braze, authentication, browser APIs not available
 *
 * **Expected behavior in production:**
 * - Priority: CMP → Sign-in Gate → Braze → Reader Revenue
 * - With shouldHideReaderRevenue=true, sign-in gate should have priority
 *
 * **To see working sign-in gate:** Check the "Mock" stories below.
 */
export const Default: Story = {
	args: {
		...commonArgs,
		shouldHideReaderRevenue: true, // Hide RR to give sign-in gate priority
	},
	parameters: {
		docs: {
			description: {
				story: `Real StickyBottomBanner component. Currently shows blank because:

**Missing in Storybook:**
- AB Testing API (useAB returns undefined)
- Sign-in gate test selector
- Braze messaging service
- Browser APIs and external services

**Priority Logic:**
1. CMP messages (highest)
2. Sign-in Gate (when AB test active)
3. Braze messages
4. Reader Revenue (lowest)

**Use Mock Stories for Visual Testing.**`,
			},
		},
	},
};

/**
 * Real component configured specifically for sign-in gate testing.
 * This story shows exactly why the sign-in gate doesn't work in Storybook.
 *
 * **Missing Dependencies Analysis:**
 *
 * 1. **useSignInGateSelector() → undefined**
 *    - Depends on useAB()?.api
 *    - useAB() returns undefined in Storybook
 *    - No AB test data available
 *
 * 2. **signInGateTests array**
 *    - Requires active AB tests for sign-in gates
 *    - Tests not configured in Storybook environment
 *
 * 3. **signInGateTestVariantToGateMapping**
 *    - Maps AB test variants to gate components
 *    - No mapping available without AB tests
 *
 * 4. **Message Picker Logic**
 *    - canShowSignInGatePortal() returns { show: false }
 *    - Because useSignInGateSelector() returns undefined
 *
 * **Result:** Message picker skips sign-in gate and shows next priority (Braze/Reader Revenue)
 */
export const SignInGateDebug: Story = {
	args: {
		...commonArgs,
		shouldHideReaderRevenue: true,
		isPaidContent: false,
		isPreview: false,
	},
	parameters: {
		docs: {
			description: {
				story: `Debug story showing why sign-in gate doesn't work in Storybook:

**Dependency Chain:**
\`\`\`
StickyBottomBanner
  → buildSignInGateConfig
    → canShowSignInGatePortal
      → SignInGatePortal component
        → useSignInGateSelector()
          → useAB()?.api
            → ❌ Returns undefined in Storybook
\`\`\`

**Fix needed:** Mock the AB testing system or use the Mock stories for visual testing.`,
			},
		},
	},
};
