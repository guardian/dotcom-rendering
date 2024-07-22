import { ArticleDesign, ArticleDisplay, Pillar } from '@guardian/libs';
import type { StoryObj } from '@storybook/react';
import { splitTheme } from '../../.storybook/decorators/splitThemeDecorator';
import { trails } from '../../fixtures/manual/trails';
import { palette } from '../palette';
import { MostViewedFooter } from './MostViewedFooter.importable';
import { MostViewedFooterLayout } from './MostViewedFooterLayout';
import { Section } from './Section';

const standardFormat = {
	display: ArticleDisplay.Standard,
	design: ArticleDesign.Standard,
	theme: Pillar.News,
};

export default {
	component: MostViewedFooterLayout,
	title: 'Components/MostViewedFooter',
	parameters: {
		chromatic: { diffThreshold: 0.2 },
	},
	decorators: [splitTheme([standardFormat], { orientation: 'vertical' })],
};

export const withTwoTabsAdFree: StoryObj = () => {
	return (
		<Section>
			<MostViewedFooterLayout renderAds={false}>
				<MostViewedFooter
					tabs={[
						{ heading: 'Tab 1', trails: trails.slice(0, 10) },
						{ heading: 'Tab 2', trails: trails.slice(5, 15) },
					]}
					selectedColour={palette('--most-viewed-tab-border')}
				/>
			</MostViewedFooterLayout>
		</Section>
	);
};
withTwoTabsAdFree.storyName = 'with two tabs ad free';

export const withOneTabsAdFree: StoryObj = () => {
	return (
		<Section>
			<MostViewedFooterLayout renderAds={false}>
				<MostViewedFooter
					tabs={[
						{
							heading: 'in the UK',
							trails: trails.slice(0, 10),
						},
					]}
					selectedColour={palette('--most-viewed-tab-border')}
				/>
			</MostViewedFooterLayout>
		</Section>
	);
};
withOneTabsAdFree.storyName = 'with one tab ad free';

export const withTwoTabs: StoryObj = () => {
	return (
		<Section>
			<MostViewedFooterLayout renderAds={true}>
				<MostViewedFooter
					tabs={[
						{ heading: 'Tab 1', trails: trails.slice(0, 10) },
						{ heading: 'Tab 2', trails: trails.slice(5, 15) },
					]}
					selectedColour={palette('--most-viewed-tab-border')}
				/>
			</MostViewedFooterLayout>
		</Section>
	);
};
withTwoTabs.storyName = 'with two tabs';

export const withTwoTabsAndPageSkin: StoryObj = () => {
	return (
		<Section>
			<MostViewedFooterLayout renderAds={true} hasPageSkin={true}>
				<MostViewedFooter
					tabs={[
						{ heading: 'Tab 1', trails: trails.slice(0, 10) },
						{ heading: 'Tab 2', trails: trails.slice(5, 15) },
					]}
					selectedColour={palette('--most-viewed-tab-border')}
				/>
			</MostViewedFooterLayout>
		</Section>
	);
};
withTwoTabsAndPageSkin.storyName = 'with two tabs & page skin';

export const withOneTabs: StoryObj = () => {
	return (
		<Section>
			<MostViewedFooterLayout renderAds={true}>
				<MostViewedFooter
					tabs={[
						{
							heading: 'in the UK',
							trails: trails.slice(0, 10),
						},
					]}
					selectedColour={palette('--most-viewed-tab-border')}
				/>
			</MostViewedFooterLayout>
		</Section>
	);
};
withOneTabs.storyName = 'with one tab';
