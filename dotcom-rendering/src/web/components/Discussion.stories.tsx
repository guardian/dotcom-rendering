import { ArticleDesign, ArticleDisplay, ArticlePillar } from '@guardian/libs';

import { Discussion } from './Discussion';

export default {
	component: Discussion,
	title: 'Components/Discussion',
};
export const Basic = () => {
	return (
		<div>
			<Discussion
				discussionApiUrl="https://discussion.theguardian.com/discussion-api"
				shortUrlId="/p/4v8kk"
				isCommentable={true}
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
				beingHydrated={true}
			/>
		</div>
	);
};

Basic.story = { name: 'A discussion with short comments' };
