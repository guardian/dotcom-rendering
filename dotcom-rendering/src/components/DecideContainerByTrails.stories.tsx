import { breakpoints } from '@guardian/source-foundations';
import { trails } from '../../fixtures/manual/trails.ts';
import { DecideContainerByTrails } from './DecideContainerByTrails.tsx';
import { FrontSection } from './FrontSection.tsx';

export default {
	component: DecideContainerByTrails,
	title: 'Components/DecideContainerByTrails',
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

export const OneCardFast = () => {
	return (
		<FrontSection title="Fast - One card">
			<DecideContainerByTrails trails={trails.slice(0, 1)} speed="fast" />
		</FrontSection>
	);
};
OneCardFast.storyName = 'Fast - One card';

export const TwoCardFast = () => {
	return (
		<FrontSection title="Fast - Two cards">
			<DecideContainerByTrails trails={trails.slice(0, 2)} speed="fast" />
		</FrontSection>
	);
};
TwoCardFast.storyName = 'Fast - Two cards';

export const ThreeCardFast = () => {
	return (
		<FrontSection title="Fast - Three cards">
			<DecideContainerByTrails trails={trails.slice(0, 3)} speed="fast" />
		</FrontSection>
	);
};
ThreeCardFast.storyName = 'Fast - Three cards';

export const FourCardFast = () => {
	return (
		<FrontSection title="Fast - Four cards">
			<DecideContainerByTrails trails={trails.slice(0, 4)} speed="fast" />
		</FrontSection>
	);
};
FourCardFast.storyName = 'Fast - Four cards';

export const FiveCardFast = () => {
	return (
		<FrontSection title="Fast - Five cards">
			<DecideContainerByTrails trails={trails.slice(0, 5)} speed="fast" />
		</FrontSection>
	);
};
FiveCardFast.storyName = 'Fast - Five cards';

export const SixCardFast = () => {
	return (
		<FrontSection title="Fast - Six cards">
			<DecideContainerByTrails trails={trails.slice(0, 6)} speed="fast" />
		</FrontSection>
	);
};
SixCardFast.storyName = 'Fast - Six cards';

export const SevenCardFast = () => {
	return (
		<FrontSection title="Fast - Seven cards">
			<DecideContainerByTrails trails={trails.slice(0, 7)} speed="fast" />
		</FrontSection>
	);
};
SevenCardFast.storyName = 'Fast - Seven cards';

export const EightCardFast = () => {
	return (
		<FrontSection title="Fast - Eight cards">
			<DecideContainerByTrails trails={trails.slice(0, 8)} speed="fast" />
		</FrontSection>
	);
};

EightCardFast.storyName = 'Fast - Eight cards';

export const TwelveCardFast = () => {
	return (
		<FrontSection title="Fast - Twelve cards">
			<DecideContainerByTrails
				trails={trails.slice(0, 12)}
				speed="fast"
			/>
		</FrontSection>
	);
};
TwelveCardFast.storyName = 'Fast - Twelve cards';

export const OneCardSlow = () => {
	return (
		<FrontSection title="Slow - One card">
			<DecideContainerByTrails trails={trails.slice(0, 1)} speed="slow" />
		</FrontSection>
	);
};
OneCardSlow.storyName = 'Slow - One card';

export const TwoCardSlow = () => {
	return (
		<FrontSection title="Slow - Two cards">
			<DecideContainerByTrails trails={trails.slice(0, 2)} speed="slow" />
		</FrontSection>
	);
};
TwoCardSlow.storyName = 'Slow - Two cards';

export const ThreeCardSlow = () => {
	return (
		<FrontSection title="Slow - Three cards">
			<DecideContainerByTrails trails={trails.slice(0, 3)} speed="slow" />
		</FrontSection>
	);
};
ThreeCardSlow.storyName = 'Slow - Three cards';

export const FourCardSlow = () => {
	return (
		<FrontSection title="Slow - Four cards">
			<DecideContainerByTrails trails={trails.slice(0, 4)} speed="slow" />
		</FrontSection>
	);
};
FourCardSlow.storyName = 'Slow - Four cards';

export const FiveCardSlow = () => {
	return (
		<FrontSection title="Slow - Five cards">
			<DecideContainerByTrails trails={trails.slice(0, 5)} speed="slow" />
		</FrontSection>
	);
};
FiveCardSlow.storyName = 'Slow - Five cards';

export const SixCardSlow = () => {
	return (
		<FrontSection title="Slow - Six cards">
			<DecideContainerByTrails trails={trails.slice(0, 6)} speed="slow" />
		</FrontSection>
	);
};
SixCardSlow.storyName = 'Slow - Six cards';

export const SevenCardSlow = () => {
	return (
		<FrontSection title="Slow - Seven cards">
			<DecideContainerByTrails trails={trails.slice(0, 7)} speed="slow" />
		</FrontSection>
	);
};
SevenCardSlow.storyName = 'Slow - Seven cards';

export const EightCardSlow = () => {
	return (
		<FrontSection title="Slow - Eight cards">
			<DecideContainerByTrails trails={trails.slice(0, 8)} speed="slow" />
		</FrontSection>
	);
};

EightCardSlow.storyName = 'Slow - Eight cards';

export const TwelveCardSlow = () => {
	return (
		<FrontSection title="Slow - Twelve cards">
			<DecideContainerByTrails
				trails={trails.slice(0, 12)}
				speed="slow"
			/>
		</FrontSection>
	);
};
TwelveCardSlow.storyName = 'Slow - Twelve cards';
