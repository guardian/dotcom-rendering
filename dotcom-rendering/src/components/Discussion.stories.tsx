import { ArticleDesign, ArticleDisplay, Pillar, storage } from '@guardian/libs';
import type { StoryObj } from '@storybook/react';
import { splitTheme } from '../../.storybook/decorators/splitThemeDecorator';
import { DiscussionLayout } from './DiscussionLayout';

type StoryArgs = { format: ArticleFormat };

export default {
	component: DiscussionLayout,
	title: 'Components/DiscussionLayout',
	parameters: {
		chromatic: {
			pauseAnimationAtEnd: true,
		},
	},
};

export const Basic: StoryObj = ({ format }: StoryArgs) => {
	// Aiming to stop flakiness in Chromatic visual diffs by explicitly
	// setting the desired comments sorting order in local storage
	storage.local.set('gu.prefs.discussion.order', 'newest');

	return (
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
