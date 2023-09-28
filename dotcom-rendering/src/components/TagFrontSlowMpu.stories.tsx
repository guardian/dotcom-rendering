import { breakpoints } from '@guardian/source-foundations';
import { discussionApiUrl } from '../../fixtures/manual/discussionApiUrl';
import { trails } from '../../fixtures/manual/trails';
import { FrontSection } from './FrontSection';
import { TagFrontSlowMpu } from './TagFrontSlowMpu';

export default {
	component: TagFrontSlowMpu,
	title: 'Components/TagFrontSlowMpu',
	parameters: {
		chromatic: {
			viewports: [
				breakpoints.mobile,
				breakpoints.tablet,
				breakpoints.wide,
			],
		},
	},
};

export const WithTwoCards = () => {
	return (
		<FrontSection
			title="Slow MPU"
			description="With two cards"
			discussionApiUrl={discussionApiUrl}
		>
			<TagFrontSlowMpu
				speed="slow"
				injected={true}
				day={21}
				month={7}
				year={2023}
				trails={[trails[0], trails[1]]}
				adIndex={1}
				imageLoading="eager"
			/>
		</FrontSection>
	);
};
WithTwoCards.storyName = 'With two cards';

export const WithFourCards = () => {
	return (
		<FrontSection
			title="Slow MPU"
			description="With four cards"
			discussionApiUrl={discussionApiUrl}
		>
			<TagFrontSlowMpu
				speed="slow"
				injected={true}
				day={21}
				month={7}
				year={2023}
				trails={[trails[0], trails[1], trails[2], trails[3]]}
				adIndex={1}
				imageLoading="eager"
			/>
		</FrontSection>
	);
};
WithFourCards.storyName = 'With four cards';

export const WithFiveCards = () => {
	return (
		<FrontSection
			title="Slow MPU"
			description="With five cards"
			discussionApiUrl={discussionApiUrl}
		>
			<TagFrontSlowMpu
				speed="slow"
				injected={true}
				day={21}
				month={7}
				year={2023}
				trails={[trails[0], trails[1], trails[2], trails[3], trails[4]]}
				adIndex={1}
				imageLoading="eager"
			/>
		</FrontSection>
	);
};
WithFiveCards.storyName = 'With five cards';

export const WithSevenCards = () => {
	return (
		<FrontSection
			title="Slow MPU"
			description="With seven cards"
			discussionApiUrl={discussionApiUrl}
		>
			<TagFrontSlowMpu
				speed="slow"
				injected={true}
				day={21}
				month={7}
				year={2023}
				trails={[
					trails[0],
					trails[1],
					trails[2],
					trails[3],
					trails[4],
					trails[5],
					trails[6],
				]}
				adIndex={1}
				imageLoading="eager"
			/>
		</FrontSection>
	);
};
WithSevenCards.storyName = 'With seven cards';
