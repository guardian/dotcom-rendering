import { breakpoints } from '@guardian/source/foundations';
import {
	multipleBrandedTrails,
	singleBrandedTrails,
	trails as trailsFromFixtures,
} from '../../fixtures/manual/trails';
import { DecideContainerByTrails } from './DecideContainerByTrails';
import { FrontSection } from './FrontSection';

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

const ASPECT_RATIO = '5:4';

const trails = trailsFromFixtures.map((trail) => ({
	...trail,
	trailText:
		'Cat Ipsum Chase ball of string eat plants, meow, and throw up because I ate plants going to catch the red dot today going to catch the red dot today. Decide to want nothing to do with my owner today.',
}));

export const OneCard = () => {
	return (
		<FrontSection title="One card" editionId="UK">
			<DecideContainerByTrails
				trails={trails.slice(0, 1)}
				imageLoading="eager"
				aspectRatio={ASPECT_RATIO}
			/>
		</FrontSection>
	);
};

export const TwoCards = () => {
	return (
		<FrontSection title="Two cards" editionId="UK">
			<DecideContainerByTrails
				trails={trails.slice(0, 2)}
				imageLoading="eager"
				aspectRatio={ASPECT_RATIO}
			/>
		</FrontSection>
	);
};

export const ThreeCards = () => {
	return (
		<FrontSection title="Three cards" editionId="UK">
			<DecideContainerByTrails
				trails={trails.slice(0, 3)}
				imageLoading="eager"
				aspectRatio={ASPECT_RATIO}
			/>
		</FrontSection>
	);
};

export const FourCards = () => {
	return (
		<FrontSection title="Four cards" editionId="UK">
			<DecideContainerByTrails
				trails={trails.slice(0, 4)}
				imageLoading="eager"
				aspectRatio={ASPECT_RATIO}
			/>
		</FrontSection>
	);
};

export const FiveCards = () => {
	return (
		<FrontSection title="Five cards" editionId="UK">
			<DecideContainerByTrails
				trails={trails.slice(0, 5)}
				imageLoading="eager"
				aspectRatio={ASPECT_RATIO}
			/>
		</FrontSection>
	);
};

export const SixCards = () => {
	return (
		<FrontSection title="Six cards" editionId="UK">
			<DecideContainerByTrails
				trails={trails.slice(0, 6)}
				imageLoading="eager"
				aspectRatio={ASPECT_RATIO}
			/>
		</FrontSection>
	);
};

export const SevenCards = () => {
	return (
		<FrontSection title="Seven cards" editionId="UK">
			<DecideContainerByTrails
				trails={trails.slice(0, 7)}
				imageLoading="eager"
				aspectRatio={ASPECT_RATIO}
			/>
		</FrontSection>
	);
};

export const EightCards = () => {
	return (
		<FrontSection title="Eight cards" editionId="UK">
			<DecideContainerByTrails
				trails={trails.slice(0, 8)}
				imageLoading="eager"
				aspectRatio={ASPECT_RATIO}
			/>
		</FrontSection>
	);
};

export const NineCards = () => {
	return (
		<FrontSection title="Nine cards" editionId="UK">
			<DecideContainerByTrails
				trails={trails.slice(0, 9)}
				imageLoading="eager"
				aspectRatio={ASPECT_RATIO}
			/>
		</FrontSection>
	);
};

export const TenCards = () => {
	return (
		<FrontSection title="Ten cards" editionId="UK">
			<DecideContainerByTrails
				trails={trails.slice(0, 10)}
				imageLoading="eager"
				aspectRatio={ASPECT_RATIO}
			/>
		</FrontSection>
	);
};

export const ElevenCards = () => {
	return (
		<FrontSection title="Eleven cards" editionId="UK">
			<DecideContainerByTrails
				trails={trails.slice(0, 11)}
				imageLoading="eager"
				aspectRatio={ASPECT_RATIO}
			/>
		</FrontSection>
	);
};

export const TwelveCards = () => {
	return (
		<FrontSection title="Twelve cards" editionId="UK">
			<DecideContainerByTrails
				trails={trails.slice(0, 12)}
				imageLoading="eager"
				aspectRatio={ASPECT_RATIO}
			/>
		</FrontSection>
	);
};

export const FiveCardsWithSingleBranding = () => {
	return (
		<FrontSection
			title="Five cards with single branding"
			editionId="UK"
			collectionBranding={{
				kind: 'paid-content',
				isFrontBranding: false,
				branding: {
					brandingType: {
						name: 'paid-content',
					},
					sponsorName: 'guardian.org',
					logo: {
						src: 'https://static.theguardian.com/commercial/sponsor/21/Jul/2025/bd012231-b67a-44cf-a208-9499714959b2-Vinted_green_280.png',
						dimensions: {
							width: 140,
							height: 90,
						},
						link: '/',
						label: 'Paid for by',
					},
					aboutThisLink:
						'https://www.theguardian.com/global-development/2021/feb/21/about-the-rights-and-freedom-series',
				},
				isContainerBranding: true,
				hasMultipleBranding: false,
			}}
		>
			<DecideContainerByTrails
				trails={singleBrandedTrails}
				imageLoading="eager"
				aspectRatio={ASPECT_RATIO}
			/>
		</FrontSection>
	);
};
FiveCardsWithSingleBranding.storyName = 'Five cards with single branding';

export const FiveCardsWithMultipleBranding = () => {
	return (
		<FrontSection title="Five cards with multiple branding" editionId="UK">
			<DecideContainerByTrails
				trails={multipleBrandedTrails}
				imageLoading="eager"
				aspectRatio={ASPECT_RATIO}
			/>
		</FrontSection>
	);
};
FiveCardsWithMultipleBranding.storyName = 'Five cards with multiple branding';
