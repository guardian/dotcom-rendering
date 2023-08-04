import { breakpoints } from '@guardian/source-foundations';
import { trails } from '../../fixtures/manual/trails.ts';
import { FrontSection } from './FrontSection.tsx';
import { TagFrontFastMpu } from './TagFrontFastMpu.tsx';

export default {
	component: TagFrontFastMpu,
	title: 'Components/TagFrontFastMpu',
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
		<FrontSection title="Fast MPU" description="With two cards">
			<TagFrontFastMpu
				speed="fast"
				injected={true}
				day={21}
				month={7}
				year={2023}
				trails={[trails[0], trails[1]]}
				adIndex={1}
			/>
		</FrontSection>
	);
};
WithTwoCards.storyName = 'With two cards';

export const WithFourCards = () => {
	return (
		<FrontSection title="Fast MPU" description="With four cards">
			<TagFrontFastMpu
				speed="fast"
				injected={true}
				day={21}
				month={7}
				year={2023}
				trails={[trails[0], trails[1], trails[2], trails[3]]}
				adIndex={1}
			/>
		</FrontSection>
	);
};
WithFourCards.storyName = 'With four cards';

export const WithSixCards = () => {
	return (
		<FrontSection title="Fast MPU" description="With six cards">
			<TagFrontFastMpu
				speed="fast"
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
				]}
				adIndex={1}
			/>
		</FrontSection>
	);
};
WithSixCards.storyName = 'With six cards';

export const WithNineCards = () => {
	return (
		<FrontSection title="Fast MPU" description="With nine cards">
			<TagFrontFastMpu
				speed="fast"
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
					trails[7],
					trails[8],
				]}
				adIndex={1}
			/>
		</FrontSection>
	);
};
WithNineCards.storyName = 'With nine cards';
