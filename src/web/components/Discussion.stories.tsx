// import { css } from '@emotion/react';
import { decidePalette } from '../lib/decidePalette';

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
				pillar={3}
				palette={decidePalette({ design: 0, display: 0, theme: 3 })}
				discussionD2Uid="zHoBy6HNKsk"
				discussionApiClientHeader="nextgen"
				enableDiscussionSwitch={true}
				isAdFreeUser={false}
				shouldHideAds={false}
				beingHydrated={true}
				display={0}
			/>
		</div>
	);
};

Basic.story = { name: 'A discussion with short comments' };
