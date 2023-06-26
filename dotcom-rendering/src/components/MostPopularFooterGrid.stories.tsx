import { trails } from '../../fixtures/manual/trails';
import { MostPopularFooterGrid } from './MostPopularFooterGrid';
import { MostViewedFooterLayout } from './MostViewedFooterLayout';
import { Section } from './Section';

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
