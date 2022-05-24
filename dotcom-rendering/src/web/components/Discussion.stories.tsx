import { ArticleDesign, ArticleDisplay, ArticlePillar } from '@guardian/libs';
import { useEffect } from 'react';
import { doStorybookHydration } from '../browser/islands/doStorybookHydration';
import { DiscussionLayout } from './DiscussionLayout';

const HydratedLayout = ({ children }: { children: React.ReactNode }) => {
	useEffect(() => {
		doStorybookHydration();
	});
	return <>{children}</>;
};

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
