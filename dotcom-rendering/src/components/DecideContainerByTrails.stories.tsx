import { ArticleDesign, ArticleDisplay, Pillar } from '@guardian/libs';
import { breakpoints } from '@guardian/source-foundations';
import { lightDecorator } from '../../.storybook/theme-decorators';
import { discussionApiUrl } from '../../fixtures/manual/discussionApiUrl';
import { trails } from '../../fixtures/manual/trails';
import { DecideContainerByTrails } from './DecideContainerByTrails';
import { FrontSection } from './FrontSection';

const articleFormat = {
	display: ArticleDisplay.Standard,
	design: ArticleDesign.Standard,
	theme: Pillar.News,
};

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
		<FrontSection
			title="Fast - One card"
			discussionApiUrl={discussionApiUrl}
		>
			<DecideContainerByTrails
				trails={trails.slice(0, 1)}
				speed="fast"
				imageLoading="eager"
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
		>
			<DecideContainerByTrails
				trails={trails.slice(0, 2)}
				speed="fast"
				imageLoading="eager"
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
		>
			<DecideContainerByTrails
				trails={trails.slice(0, 3)}
				speed="fast"
				imageLoading="eager"
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
		>
			<DecideContainerByTrails
				trails={trails.slice(0, 4)}
				speed="fast"
				imageLoading="eager"
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
		>
			<DecideContainerByTrails
				trails={trails.slice(0, 5)}
				speed="fast"
				imageLoading="eager"
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
		>
			<DecideContainerByTrails
				trails={trails.slice(0, 6)}
				speed="fast"
				imageLoading="eager"
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
		>
			<DecideContainerByTrails
				trails={trails.slice(0, 7)}
				speed="fast"
				imageLoading="eager"
			/>
		</FrontSection>
	);
};
SevenCardFast.storyName = 'Fast - Seven cards';
SevenCardFast.decorators = [lightDecorator(articleFormat)];

export const EightCardFast = () => {
	return (
		<FrontSection
			title="Fast - Eight cards"
			discussionApiUrl={discussionApiUrl}
		>
			<DecideContainerByTrails
				trails={trails.slice(0, 8)}
				speed="fast"
				imageLoading="eager"
			/>
		</FrontSection>
	);
};

EightCardFast.storyName = 'Fast - Eight cards';
EightCardFast.decorators = [lightDecorator(articleFormat)];

export const TwelveCardFast = () => {
	return (
		<FrontSection
			title="Fast - Twelve cards"
			discussionApiUrl={discussionApiUrl}
		>
			<DecideContainerByTrails
				trails={trails.slice(0, 12)}
				speed="fast"
				imageLoading="eager"
			/>
		</FrontSection>
	);
};
TwelveCardFast.storyName = 'Fast - Twelve cards';
TwelveCardFast.decorators = [lightDecorator(articleFormat)];

export const OneCardSlow = () => {
	return (
		<FrontSection
			title="Slow - One card"
			discussionApiUrl={discussionApiUrl}
		>
			<DecideContainerByTrails
				trails={trails.slice(0, 1)}
				speed="slow"
				imageLoading="eager"
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
		>
			<DecideContainerByTrails
				trails={trails.slice(0, 2)}
				speed="slow"
				imageLoading="eager"
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
		>
			<DecideContainerByTrails
				trails={trails.slice(0, 3)}
				speed="slow"
				imageLoading="eager"
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
		>
			<DecideContainerByTrails
				trails={trails.slice(0, 4)}
				speed="slow"
				imageLoading="eager"
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
		>
			<DecideContainerByTrails
				trails={trails.slice(0, 5)}
				speed="slow"
				imageLoading="eager"
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
		>
			<DecideContainerByTrails
				trails={trails.slice(0, 6)}
				speed="slow"
				imageLoading="eager"
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
		>
			<DecideContainerByTrails
				trails={trails.slice(0, 7)}
				speed="slow"
				imageLoading="eager"
			/>
		</FrontSection>
	);
};
SevenCardSlow.storyName = 'Slow - Seven cards';
SevenCardSlow.decorators = [lightDecorator(articleFormat)];

export const EightCardSlow = () => {
	return (
		<FrontSection
			title="Slow - Eight cards"
			discussionApiUrl={discussionApiUrl}
		>
			<DecideContainerByTrails
				trails={trails.slice(0, 8)}
				speed="slow"
				imageLoading="eager"
			/>
		</FrontSection>
	);
};

EightCardSlow.storyName = 'Slow - Eight cards';
EightCardSlow.decorators = [lightDecorator(articleFormat)];

export const TwelveCardSlow = () => {
	return (
		<FrontSection
			title="Slow - Twelve cards"
			discussionApiUrl={discussionApiUrl}
		>
			<DecideContainerByTrails
				trails={trails.slice(0, 12)}
				speed="slow"
				imageLoading="eager"
			/>
		</FrontSection>
	);
};
TwelveCardSlow.storyName = 'Slow - Twelve cards';
TwelveCardSlow.decorators = [lightDecorator(articleFormat)];
