import { ArticleDesign, ArticleDisplay, Pillar, storage } from '@guardian/libs';
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
export const Basic = () => {
	// Aiming to stop flakiness in Chromatic visual diffs by explicitly
	// setting the desired comments sorting order in local storage
	storage.local.set('gu.prefs.discussion.order', 'newest');

	return (
		<DiscussionLayout
			discussionApiUrl="https://discussion.theguardian.com/discussion-api"
			shortUrlId="/p/4v8kk"
			format={{
				design: ArticleDesign.Standard,
				display: ArticleDisplay.Standard,
				theme: Pillar.Culture,
			}}
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
