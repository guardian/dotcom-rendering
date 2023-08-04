import { trails } from '../../fixtures/manual/trails.ts';
import { MostPopularFooterGrid } from './MostPopularFooterGrid.tsx';
import { MostViewedFooterLayout } from './MostViewedFooterLayout.tsx';
import { Section } from './Section.tsx';

export default {
	component: MostPopularFooterGrid,
	title: 'Components/MostPopularFooterGrid',
	chromatic: { diffThreshold: 0.7 },
};

const mostViewed = {
	heading: 'Most viewed',
	trails: trails.slice(0, 10),
};
const deeplyRead = {
	heading: 'Deeply read',
	trails: trails.slice(10, 20),
};

export const SingleImageWithCaptionAdFree = () => {
	return (
		<Section>
			<MostViewedFooterLayout renderAds={false}>
				<MostPopularFooterGrid
					mostViewed={mostViewed}
					deeplyRead={deeplyRead}
				/>
			</MostViewedFooterLayout>
		</Section>
	);
};
SingleImageWithCaptionAdFree.storyName = 'most popular ad free';

export const SingleImageWithCaption = () => {
	return (
		<Section>
			<MostViewedFooterLayout renderAds={true}>
				<MostPopularFooterGrid
					mostViewed={mostViewed}
					deeplyRead={deeplyRead}
				/>
			</MostViewedFooterLayout>
		</Section>
	);
};
SingleImageWithCaption.storyName = 'most popular';
