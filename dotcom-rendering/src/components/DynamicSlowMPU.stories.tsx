import { breakpoints } from '@guardian/source-foundations';
import { discussionApiUrl } from '../../fixtures/manual/discussionApiUrl';
import { trails } from '../../fixtures/manual/trails';
import { DynamicSlowMPU } from './DynamicSlowMPU';
import { FrontSection } from './FrontSection';

export default {
	component: DynamicSlowMPU,
	title: 'Components/DynamicSlowMPU',
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

const bigs = trails.slice(0, 3);
const standards = trails.slice(3);

export const NoBigs = () => (
	<FrontSection title="Dynamic Slow MPU" discussionApiUrl={discussionApiUrl}>
		<DynamicSlowMPU
			groupedTrails={{
				snap: [],
				huge: [],
				veryBig: [],
				big: [],
				standard: standards,
			}}
			showAge={true}
			imageLoading="eager"
		/>
	</FrontSection>
);
NoBigs.storyName = 'with no big cards, only standard';

export const OneBig = () => (
	<FrontSection title="Dynamic Slow MPU" discussionApiUrl={discussionApiUrl}>
		<DynamicSlowMPU
			groupedTrails={{
				snap: [],
				huge: [],
				veryBig: [],
				big: bigs.slice(0, 1),
				standard: standards,
			}}
			showAge={true}
			imageLoading="eager"
		/>
	</FrontSection>
);
OneBig.storyName = 'with just one big';

export const TwoBigs = () => (
	<FrontSection title="Dynamic Slow MPU" discussionApiUrl={discussionApiUrl}>
		<DynamicSlowMPU
			groupedTrails={{
				snap: [],
				huge: [],
				veryBig: [],
				big: bigs.slice(0, 2),
				standard: standards,
			}}
			showAge={true}
			imageLoading="eager"
		/>
	</FrontSection>
);
TwoBigs.storyName = 'with two bigs';

export const FirstBigBoosted = () => (
	<FrontSection title="Dynamic Slow MPU" discussionApiUrl={discussionApiUrl}>
		<DynamicSlowMPU
			groupedTrails={{
				snap: [],
				huge: [],
				veryBig: [],
				big: bigs
					.slice(0, 2)
					.map((card, index) =>
						index === 0 ? { ...card, isBoosted: true } : card,
					),
				standard: standards,
			}}
			showAge={true}
			imageLoading="eager"
		/>
	</FrontSection>
);
FirstBigBoosted.storyName = 'with the first of two bigs boosted';

export const SecondBigBoosted = () => (
	<FrontSection title="Dynamic Slow MPU" discussionApiUrl={discussionApiUrl}>
		<DynamicSlowMPU
			groupedTrails={{
				snap: [],
				huge: [],
				veryBig: [],
				big: bigs
					.slice(0, 2)
					.map((card, index) =>
						index === 1 ? { ...card, isBoosted: true } : card,
					),
				standard: standards,
			}}
			showAge={true}
			imageLoading="eager"
		/>
	</FrontSection>
);
SecondBigBoosted.storyName = 'with the second of two bigs boosted';

export const ThreeBigs = () => (
	<FrontSection title="Dynamic Slow MPU" discussionApiUrl={discussionApiUrl}>
		<DynamicSlowMPU
			groupedTrails={{
				snap: [],
				huge: [],
				veryBig: [],
				big: bigs.slice(0, 3),
				standard: standards,
			}}
			showAge={true}
			imageLoading="eager"
		/>
	</FrontSection>
);
ThreeBigs.storyName = 'with three bigs';

export const AllBigs = () => (
	<FrontSection title="Dynamic Slow MPU" discussionApiUrl={discussionApiUrl}>
		<DynamicSlowMPU
			groupedTrails={{
				snap: [],
				huge: [],
				veryBig: [],
				big: standards,
				standard: [],
			}}
			showAge={true}
			imageLoading="eager"
		/>
	</FrontSection>
);
AllBigs.storyName = 'with lots of bigs and no standards';

export const AllBigsNoMPU = () => (
	<FrontSection title="DynamicSlowMPU" discussionApiUrl={discussionApiUrl}>
		<DynamicSlowMPU
			groupedTrails={{
				snap: [],
				huge: [],
				veryBig: [],
				big: standards,
				standard: [],
			}}
			showAge={true}
			imageLoading="eager"
		/>
	</FrontSection>
);
AllBigsNoMPU.storyName = 'Ad-free with lots of bigs';

export const TwoBigsThreeStandardsNoMPU = () => (
	<FrontSection title="DynamicSlowMPU" discussionApiUrl={discussionApiUrl}>
		<DynamicSlowMPU
			groupedTrails={{
				snap: [],
				huge: [],
				veryBig: [],
				big: bigs.slice(0, 2),
				standard: standards.slice(0, 3),
			}}
			showAge={true}
			imageLoading="eager"
		/>
	</FrontSection>
);
TwoBigsThreeStandardsNoMPU.storyName = 'Ad-free with 2 bigs & 3 standards';

export const NoBigsTwoStandardsNoMPU = () => (
	<FrontSection title="DynamicSlowMPU" discussionApiUrl={discussionApiUrl}>
		<DynamicSlowMPU
			groupedTrails={{
				snap: [],
				huge: [],
				veryBig: [],
				big: [],
				standard: standards.slice(0, 2),
			}}
			showAge={true}
			imageLoading="eager"
		/>
	</FrontSection>
);
NoBigsTwoStandardsNoMPU.storyName = 'Ad-free with 0 bigs & 2 standards';

export const NoBigsFiveStandardsNoMPU = () => (
	<FrontSection title="DynamicSlowMPU" discussionApiUrl={discussionApiUrl}>
		<DynamicSlowMPU
			groupedTrails={{
				snap: [],
				huge: [],
				veryBig: [],
				big: [],
				standard: standards.slice(0, 5),
			}}
			showAge={true}
			imageLoading="eager"
		/>
	</FrontSection>
);
NoBigsFiveStandardsNoMPU.storyName = 'Ad-free with 0 bigs & 5 standards';
