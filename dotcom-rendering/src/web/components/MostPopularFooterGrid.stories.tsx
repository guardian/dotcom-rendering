import { trails } from '../../../fixtures/manual/trails';
import { MostPopularFooterGrid } from './MostPopularFooterGrid';
import { MostViewedFooterLayout } from './MostViewedFooterLayout';
import { Section } from './Section';

export default {
	component: MostPopularFooterGrid,
	title: 'Components/MostPopularFooterGrid',
	chromatic: { diffThreshold: 0.7 },
};

const mostViewed = {
	heading: 'Tab 1',
	trails: trails.slice(0, 10),
};
const deeplyRead = {
	heading: 'Tab 1',
	trails: trails.slice(10, 20),
};

export const SingleImageWithCaption = () => {
	return (
		<Section>
			<MostViewedFooterLayout>
				<MostPopularFooterGrid
					mostViewed={mostViewed}
					deeplyRead={deeplyRead}
				/>
			</MostViewedFooterLayout>
		</Section>
	);
};
SingleImageWithCaption.storyName = 'most popular';
