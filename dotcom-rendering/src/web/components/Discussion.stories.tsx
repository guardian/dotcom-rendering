import { ArticleDesign, ArticleDisplay, ArticlePillar } from '@guardian/libs';

import { DiscussionLayout } from './DiscussionLayout';

export default {
	component: DiscussionLayout,
	title: 'Components/DiscussionLayout',
};
export const Basic = () => {
	return (
		<div>
			<DiscussionLayout
				discussionApiUrl="https://discussion.theguardian.com/discussion-api"
				shortUrlId="/p/4v8kk"
				format={{
					design: ArticleDesign.Standard,
					display: ArticleDisplay.Standard,
					theme: ArticlePillar.Culture,
				}}
				discussionD2Uid="zHoBy6HNKsk"
				discussionApiClientHeader="nextgen"
				enableDiscussionSwitch={true}
				isAdFreeUser={false}
				shouldHideAds={false}
			/>
		</div>
	);
};

Basic.story = { name: 'A discussion with short comments' };
