import { useEffect } from 'react';
import { ArticleDesign, ArticleDisplay, ArticlePillar } from '@guardian/libs';

import { DiscussionLayout } from './DiscussionLayout';
import { doStorybookHydration } from '../browser/islands/doStorybookHydration';

const HydratedLayout = ({ children }: { children: React.ReactNode }) => {
	useEffect(() => {
		doStorybookHydration();
	});
	return <>{children}</>;
};

export default {
	component: DiscussionLayout,
	title: 'Components/DiscussionLayout',
	chromatic: {
		delay: 800,
		pauseAnimationAtEnd: true,
	},
};
export const Basic = () => {
	return (
		<HydratedLayout>
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
		</HydratedLayout>
	);
};

Basic.story = { name: 'A discussion with short comments' };
