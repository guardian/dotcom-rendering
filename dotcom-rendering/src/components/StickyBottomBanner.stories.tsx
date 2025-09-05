import type { Meta, StoryObj } from '@storybook/react';
import { ConfigProvider } from './ConfigContext';
import { StickyBottomBanner as StickyBottomBannerComponent } from './StickyBottomBanner.importable';

/**
 * StickyBottomBanner is a complex component that coordinates the display of various types of messages
 * at the bottom of articles. It uses a message picker system to ensure only one message is shown at a time.
 */
const meta = {
	title: 'Components/StickyBottomBanner',
	component: StickyBottomBannerComponent,
	decorators: [
		(Story) => {
			return (
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

						{/* Add some content to demonstrate the banner */}
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
								🎯 <strong>AB Test Mock Active:</strong> This
								story passes a static AB API variant = TRUE for
								the AuxiaSignInGate experiment.
							</p>
							<p>
								The global fetch mock in preview.ts will return
								a treatment so the gate renders.
							</p>
						</div>

						<Story />
					</ConfigProvider>
				</div>
			);
		},
	],
} satisfies Meta<typeof StickyBottomBannerComponent>;

export default meta;

export const WithMockedAuxiaExperiment: StoryObj = {
	args: {
		contentType: 'Article',
		sectionId: 'dismissable',
		shouldHideReaderRevenue: true, // Hide RR to prioritize sign-in gate
		isMinuteArticle: false,
		isPaidContent: false,
		isSensitive: false,
		tags: [],
		contributionsServiceUrl: 'https://contributions.guardianapis.com',
		idApiUrl: 'https://idapi.theguardian.com',
		stage: 'DEV',
		isPreview: false,
		showSignInGateForExpiredSubscribers: false,
		pageId: 'world/2023/oct/31/test-article', // Valid pageId for gating
	},
};
