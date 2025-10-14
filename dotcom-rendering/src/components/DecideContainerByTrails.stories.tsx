import { breakpoints } from '@guardian/source/foundations';
import { discussionApiUrl } from '../../fixtures/manual/discussionApiUrl';
import {
	multipleBrandedTrails,
	singleBrandedTrails,
	trails,
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

export const OneCardFast = () => {
	return (
		<FrontSection
			title="Fast - One card"
			discussionApiUrl={discussionApiUrl}
			editionId={'UK'}
		>
			<DecideContainerByTrails
				trails={trails.slice(0, 1)}
				speed="fast"
				imageLoading="eager"
				aspectRatio={ASPECT_RATIO}
			/>
		</FrontSection>
	);
};
OneCardFast.storyName = 'Fast - One card';

export const TwoCardFast = () => {
	return (
		<FrontSection
			title="Fast - Two cards"
			discussionApiUrl={discussionApiUrl}
			editionId={'UK'}
		>
			<DecideContainerByTrails
				trails={trails.slice(0, 2)}
				speed="fast"
				imageLoading="eager"
				aspectRatio={ASPECT_RATIO}
			/>
		</FrontSection>
	);
};
TwoCardFast.storyName = 'Fast - Two cards';

export const ThreeCardFast = () => {
	return (
		<FrontSection
			title="Fast - Three cards"
			discussionApiUrl={discussionApiUrl}
			editionId={'UK'}
		>
			<DecideContainerByTrails
				trails={trails.slice(0, 3)}
				speed="fast"
				imageLoading="eager"
				aspectRatio={ASPECT_RATIO}
			/>
		</FrontSection>
	);
};
ThreeCardFast.storyName = 'Fast - Three cards';

export const FourCardFast = () => {
	return (
		<FrontSection
			title="Fast - Four cards"
			discussionApiUrl={discussionApiUrl}
			editionId={'UK'}
		>
			<DecideContainerByTrails
				trails={trails.slice(0, 4)}
				speed="fast"
				imageLoading="eager"
				aspectRatio={ASPECT_RATIO}
			/>
		</FrontSection>
	);
};
FourCardFast.storyName = 'Fast - Four cards';

export const FiveCardFast = () => {
	return (
		<FrontSection
			title="Fast - Five cards"
			discussionApiUrl={discussionApiUrl}
			editionId={'UK'}
		>
			<DecideContainerByTrails
				trails={trails.slice(0, 5)}
				speed="fast"
				imageLoading="eager"
				aspectRatio={ASPECT_RATIO}
			/>
		</FrontSection>
	);
};
FiveCardFast.storyName = 'Fast - Five cards';

export const SixCardFast = () => {
	return (
		<FrontSection
			title="Fast - Six cards"
			discussionApiUrl={discussionApiUrl}
			editionId={'UK'}
		>
			<DecideContainerByTrails
				trails={trails.slice(0, 6)}
				speed="fast"
				imageLoading="eager"
				aspectRatio={ASPECT_RATIO}
			/>
		</FrontSection>
	);
};
SixCardFast.storyName = 'Fast - Six cards';

export const SevenCardFast = () => {
	return (
		<FrontSection
			title="Fast - Seven cards"
			discussionApiUrl={discussionApiUrl}
			editionId={'UK'}
		>
			<DecideContainerByTrails
				trails={trails.slice(0, 7)}
				speed="fast"
				imageLoading="eager"
				aspectRatio={ASPECT_RATIO}
			/>
		</FrontSection>
	);
};
SevenCardFast.storyName = 'Fast - Seven cards';

export const EightCardFast = () => {
	return (
		<FrontSection
			title="Fast - Eight cards"
			discussionApiUrl={discussionApiUrl}
			editionId={'UK'}
		>
			<DecideContainerByTrails
				trails={trails.slice(0, 8)}
				speed="fast"
				imageLoading="eager"
				aspectRatio={ASPECT_RATIO}
			/>
		</FrontSection>
	);
};

EightCardFast.storyName = 'Fast - Eight cards';

export const TwelveCardFast = () => {
	return (
		<FrontSection
			title="Fast - Twelve cards"
			discussionApiUrl={discussionApiUrl}
			editionId={'UK'}
		>
			<DecideContainerByTrails
				trails={trails.slice(0, 12)}
				speed="fast"
				imageLoading="eager"
				aspectRatio={ASPECT_RATIO}
			/>
		</FrontSection>
	);
};
TwelveCardFast.storyName = 'Fast - Twelve cards';

export const OneCardSlow = () => {
	return (
		<FrontSection
			title="Slow - One card"
			discussionApiUrl={discussionApiUrl}
			editionId={'UK'}
		>
			<DecideContainerByTrails
				trails={trails.slice(0, 1)}
				speed="slow"
				imageLoading="eager"
				aspectRatio={ASPECT_RATIO}
			/>
		</FrontSection>
	);
};
OneCardSlow.storyName = 'Slow - One card';

export const TwoCardSlow = () => {
	return (
		<FrontSection
			title="Slow - Two cards"
			discussionApiUrl={discussionApiUrl}
			editionId={'UK'}
		>
			<DecideContainerByTrails
				trails={trails.slice(0, 2)}
				speed="slow"
				imageLoading="eager"
				aspectRatio={ASPECT_RATIO}
			/>
		</FrontSection>
	);
};
TwoCardSlow.storyName = 'Slow - Two cards';

export const ThreeCardSlow = () => {
	return (
		<FrontSection
			title="Slow - Three cards"
			discussionApiUrl={discussionApiUrl}
			editionId={'UK'}
		>
			<DecideContainerByTrails
				trails={trails.slice(0, 3)}
				speed="slow"
				imageLoading="eager"
				aspectRatio={ASPECT_RATIO}
			/>
		</FrontSection>
	);
};
ThreeCardSlow.storyName = 'Slow - Three cards';

export const FourCardSlow = () => {
	return (
		<FrontSection
			title="Slow - Four cards"
			discussionApiUrl={discussionApiUrl}
			editionId={'UK'}
		>
			<DecideContainerByTrails
				trails={trails.slice(0, 4)}
				speed="slow"
				imageLoading="eager"
				aspectRatio={ASPECT_RATIO}
			/>
		</FrontSection>
	);
};
FourCardSlow.storyName = 'Slow - Four cards';

export const FiveCardSlow = () => {
	return (
		<FrontSection
			title="Slow - Five cards"
			discussionApiUrl={discussionApiUrl}
			editionId={'UK'}
		>
			<DecideContainerByTrails
				trails={trails.slice(0, 5)}
				speed="slow"
				imageLoading="eager"
				aspectRatio={ASPECT_RATIO}
			/>
		</FrontSection>
	);
};
FiveCardSlow.storyName = 'Slow - Five cards';

export const SixCardSlow = () => {
	return (
		<FrontSection
			title="Slow - Six cards"
			discussionApiUrl={discussionApiUrl}
			editionId={'UK'}
		>
			<DecideContainerByTrails
				trails={trails.slice(0, 6)}
				speed="slow"
				imageLoading="eager"
				aspectRatio={ASPECT_RATIO}
			/>
		</FrontSection>
	);
};
SixCardSlow.storyName = 'Slow - Six cards';

export const SevenCardSlow = () => {
	return (
		<FrontSection
			title="Slow - Seven cards"
			discussionApiUrl={discussionApiUrl}
			editionId={'UK'}
		>
			<DecideContainerByTrails
				trails={trails.slice(0, 7)}
				speed="slow"
				imageLoading="eager"
				aspectRatio={ASPECT_RATIO}
			/>
		</FrontSection>
	);
};
SevenCardSlow.storyName = 'Slow - Seven cards';

export const EightCardSlow = () => {
	return (
		<FrontSection
			title="Slow - Eight cards"
			discussionApiUrl={discussionApiUrl}
			editionId={'UK'}
		>
			<DecideContainerByTrails
				trails={trails.slice(0, 8)}
				speed="slow"
				imageLoading="eager"
				aspectRatio={ASPECT_RATIO}
			/>
		</FrontSection>
	);
};

EightCardSlow.storyName = 'Slow - Eight cards';

export const TwelveCardSlow = () => {
	return (
		<FrontSection
			title="Slow - Twelve cards"
			discussionApiUrl={discussionApiUrl}
			editionId={'UK'}
		>
			<DecideContainerByTrails
				trails={trails.slice(0, 12)}
				speed="slow"
				imageLoading="eager"
				aspectRatio={ASPECT_RATIO}
			/>
		</FrontSection>
	);
};
TwelveCardSlow.storyName = 'Slow - Twelve cards';

export const FiveCardWithSingleBranding = () => {
	return (
		<FrontSection
			title="Five cards with single branding"
			discussionApiUrl={discussionApiUrl}
			editionId={'UK'}
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
				speed="fast"
				imageLoading="eager"
				isTagPage={true}
				aspectRatio={ASPECT_RATIO}
			/>
		</FrontSection>
	);
};
FiveCardWithSingleBranding.storyName = 'Five cards with single branding';

export const FiveCardWithMultipleBranding = () => {
	return (
		<FrontSection
			title="Five cards with multiple branding"
			discussionApiUrl={discussionApiUrl}
			editionId={'UK'}
		>
			<DecideContainerByTrails
				trails={multipleBrandedTrails}
				speed="fast"
				imageLoading="eager"
				isTagPage={true}
				aspectRatio={ASPECT_RATIO}
			/>
		</FrontSection>
	);
};
FiveCardWithMultipleBranding.storyName = 'Five cards with multiple branding';
