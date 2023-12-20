import { ArticleDesign, ArticleDisplay, Pillar, storage } from '@guardian/libs';
import type { StoryObj } from '@storybook/react';
import { splitTheme } from '../../.storybook/decorators/splitThemeDecorator';
import type { StoryProps } from '../../.storybook/decorators/splitThemeDecorator';
import { Section } from '../components/Section';
import { palette as themePalette } from '../palette';
import { DiscussionLayout } from './DiscussionLayout';

export default {
	component: DiscussionLayout,
	title: 'Components/DiscussionLayout',
	parameters: {
		chromatic: {
			pauseAnimationAtEnd: true,
		},
	},
};

const SectionWrapper = ({ children }: { children: React.ReactNode }) => (
	<Section
		fullWidth={true}
		sectionId="comments"
		data-print-layout="hide"
		element="section"
		backgroundColour={themePalette('--article-background')}
		borderColour={themePalette('--article-border')}
		fontColour={themePalette('--article-section-title')}
	>
		{children}
	</Section>
);

export const Basic: StoryObj = ({ format }: StoryProps) => {
	// Aiming to stop flakiness in Chromatic visual diffs by explicitly
	// setting the desired comments sorting order in local storage
	storage.local.set('gu.prefs.discussion.order', 'newest');

	return (
		<SectionWrapper>
			<DiscussionLayout
				discussionApiUrl="https://discussion.theguardian.com/discussion-api"
				shortUrlId="/p/4v8kk"
				format={format}
				discussionD2Uid="zHoBy6HNKsk"
				discussionApiClientHeader="nextgen"
				enableDiscussionSwitch={true}
				isAdFreeUser={false}
				shouldHideAds={false}
				idApiUrl="https://idapi.theguardian.com"
			/>
		</SectionWrapper>
	);
};

Basic.storyName = 'A discussion with short comments';
Basic.decorators = [
	splitTheme(
		[
			{
				design: ArticleDesign.Standard,
				display: ArticleDisplay.Standard,
				theme: Pillar.Culture,
			},
		],
		{ orientation: 'vertical' },
	),
];
