import {
	ArticleDesign,
	ArticleDisplay,
	ArticleSpecial,
	Pillar,
} from '@guardian/libs';
import { breakpoints } from '@guardian/source-foundations';
import { lightDecorator } from '../../.storybook/theme-decorators';
import { discussionApiUrl } from '../../fixtures/manual/discussionApiUrl';
import { trails } from '../../fixtures/manual/trails';
import type { DCRGroupedTrails } from '../types/front';
import { DynamicPackage } from './DynamicPackage';
import { FrontSection } from './FrontSection';

const articleFormat: ArticleFormat = {
	display: ArticleDisplay.Standard,
	design: ArticleDesign.Standard,
	theme: Pillar.News,
};

const defaultGroupedTrails: DCRGroupedTrails = {
	huge: [],
	veryBig: [],
	big: [],
	standard: [],
	snap: [],
};

export default {
	component: DynamicPackage,
	title: 'Components/DynamicPackage',
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

export const One = () => (
	<FrontSection
		title="Dynamic Package"
		showTopBorder={true}
		discussionApiUrl={discussionApiUrl}
	>
		<DynamicPackage
			groupedTrails={{
				...defaultGroupedTrails,
				snap: [],
				standard: trails.slice(0, 1),
			}}
			containerPalette="LongRunningPalette"
			imageLoading="eager"
		/>
	</FrontSection>
);
One.storyName = 'With one standard card';

export const Two = () => (
	<FrontSection
		title="Dynamic Package"
		showTopBorder={true}
		discussionApiUrl={discussionApiUrl}
	>
		<DynamicPackage
			groupedTrails={{
				...defaultGroupedTrails,
				snap: [],
				standard: trails.slice(0, 2),
			}}
			containerPalette="LongRunningPalette"
			imageLoading="eager"
		/>
	</FrontSection>
);
Two.storyName = 'With two standard cards';

export const Three = () => (
	<FrontSection title="Dynamic Package" discussionApiUrl={discussionApiUrl}>
		<DynamicPackage
			groupedTrails={{
				...defaultGroupedTrails,
				snap: [],
				standard: trails.slice(0, 3),
			}}
			containerPalette="LongRunningPalette"
			imageLoading="eager"
		/>
	</FrontSection>
);
Three.storyName = 'With three standard cards';

export const Four = () => (
	<FrontSection title="Dynamic Package" discussionApiUrl={discussionApiUrl}>
		<DynamicPackage
			groupedTrails={{
				...defaultGroupedTrails,
				snap: [],
				standard: trails.slice(0, 4),
			}}
			containerPalette="LongRunningPalette"
			imageLoading="eager"
		/>
	</FrontSection>
);
Four.storyName = 'With four standard cards';

export const Five = () => (
	<FrontSection title="Dynamic Package" discussionApiUrl={discussionApiUrl}>
		<DynamicPackage
			groupedTrails={{
				...defaultGroupedTrails,
				snap: [],
				standard: trails.slice(0, 5),
			}}
			containerPalette="LongRunningPalette"
			imageLoading="eager"
		/>
	</FrontSection>
);
Five.storyName = 'With five standard cards';

export const Six = () => (
	<FrontSection
		title="Dynamic Package"
		showTopBorder={true}
		discussionApiUrl={discussionApiUrl}
	>
		<DynamicPackage
			groupedTrails={{
				...defaultGroupedTrails,
				snap: [],
				standard: trails.slice(0, 6),
			}}
			containerPalette="LongRunningPalette"
			imageLoading="eager"
		/>
	</FrontSection>
);
Six.storyName = 'With six standard cards';

export const Seven = () => (
	<FrontSection
		title="Dynamic Package"
		showTopBorder={true}
		discussionApiUrl={discussionApiUrl}
	>
		<DynamicPackage
			groupedTrails={{
				...defaultGroupedTrails,
				snap: [],
				standard: trails.slice(0, 7),
			}}
			containerPalette="LongRunningPalette"
			imageLoading="eager"
		/>
	</FrontSection>
);
Seven.storyName = 'With seven standard cards';
Seven.decorators = [lightDecorator(articleFormat)];

export const Eight = () => (
	<FrontSection
		title="Dynamic Package"
		showTopBorder={true}
		discussionApiUrl={discussionApiUrl}
	>
		<DynamicPackage
			groupedTrails={{
				...defaultGroupedTrails,
				snap: [],
				standard: trails.slice(0, 8),
			}}
			containerPalette="LongRunningPalette"
			imageLoading="eager"
		/>
	</FrontSection>
);
Eight.storyName = 'With eight standard cards';
Eight.decorators = [lightDecorator(articleFormat)];

export const Nine = () => (
	<FrontSection
		title="Dynamic Package"
		showTopBorder={true}
		discussionApiUrl={discussionApiUrl}
	>
		<DynamicPackage
			groupedTrails={{
				...defaultGroupedTrails,
				snap: [],
				standard: trails.slice(0, 9),
			}}
			containerPalette="LongRunningPalette"
			imageLoading="eager"
		/>
	</FrontSection>
);
Nine.storyName = 'With nine standard cards';
Nine.decorators = [lightDecorator(articleFormat)];

export const Boosted1 = () => {
	const primary = trails[0];

	return (
		<FrontSection
			title="Dynamic Package"
			showTopBorder={true}
			discussionApiUrl={discussionApiUrl}
		>
			<DynamicPackage
				groupedTrails={{
					...defaultGroupedTrails,
					snap: [],
					standard: [{ ...primary, isBoosted: true }],
				}}
				showAge={true}
				containerPalette="LongRunningPalette"
				imageLoading="eager"
			/>
		</FrontSection>
	);
};
Boosted1.storyName = 'With one standard card - boosted';

export const Boosted2 = () => {
	const primary = trails[0];
	const remaining = trails.slice(1, 2);

	return (
		<FrontSection
			title="Dynamic Package"
			showTopBorder={true}
			discussionApiUrl={discussionApiUrl}
		>
			<DynamicPackage
				groupedTrails={{
					...defaultGroupedTrails,
					snap: [],
					standard: [{ ...primary, isBoosted: true }, ...remaining],
				}}
				showAge={true}
				containerPalette="LongRunningPalette"
				imageLoading="eager"
			/>
		</FrontSection>
	);
};
Boosted2.storyName = 'With two standard cards - boosted';

export const Boosted3 = () => {
	const primary = trails[0];
	const remaining = trails.slice(1, 3);

	return (
		<FrontSection
			title="Dynamic Package"
			discussionApiUrl={discussionApiUrl}
		>
			<DynamicPackage
				groupedTrails={{
					...defaultGroupedTrails,
					snap: [],
					standard: [{ ...primary, isBoosted: true }, ...remaining],
				}}
				showAge={true}
				containerPalette="LongRunningPalette"
				imageLoading="eager"
			/>
		</FrontSection>
	);
};
Boosted3.storyName = 'With three standard cards - boosted';

export const Boosted4 = () => {
	const primary = trails[0];
	const remaining = trails.slice(1, 4);

	return (
		<FrontSection
			title="Dynamic Package"
			discussionApiUrl={discussionApiUrl}
		>
			<DynamicPackage
				groupedTrails={{
					...defaultGroupedTrails,
					snap: [],
					standard: [{ ...primary, isBoosted: true }, ...remaining],
				}}
				showAge={true}
				containerPalette="LongRunningPalette"
				imageLoading="eager"
			/>
		</FrontSection>
	);
};
Boosted4.storyName = 'With four standard cards - boosted';

export const Boosted5 = () => {
	const primary = trails[0];
	const remaining = trails.slice(1, 5);

	return (
		<FrontSection
			title="Dynamic Package"
			discussionApiUrl={discussionApiUrl}
		>
			<DynamicPackage
				groupedTrails={{
					...defaultGroupedTrails,
					snap: [],
					standard: [{ ...primary, isBoosted: true }, ...remaining],
				}}
				showAge={true}
				containerPalette="LongRunningPalette"
				imageLoading="eager"
			/>
		</FrontSection>
	);
};
Boosted5.storyName = 'With five standard cards - boosted';

export const Boosted8 = () => {
	const primary = trails[0];
	const remaining = trails.slice(1, 8);

	return (
		<FrontSection
			title="Dynamic Package"
			showTopBorder={true}
			discussionApiUrl={discussionApiUrl}
		>
			<DynamicPackage
				groupedTrails={{
					...defaultGroupedTrails,
					snap: [],
					standard: [{ ...primary, isBoosted: true }, ...remaining],
				}}
				showAge={true}
				containerPalette="LongRunningPalette"
				imageLoading="eager"
			/>
		</FrontSection>
	);
};
Boosted8.storyName = 'With eight standard cards - boosted';
Boosted8.decorators = [lightDecorator(articleFormat)];

export const Boosted9 = () => {
	const primary = trails[0];
	const remaining = trails.slice(1, 9);

	return (
		<FrontSection
			title="Dynamic Package"
			showTopBorder={true}
			discussionApiUrl={discussionApiUrl}
		>
			<DynamicPackage
				groupedTrails={{
					...defaultGroupedTrails,
					snap: [],
					standard: [{ ...primary, isBoosted: true }, ...remaining],
				}}
				showAge={true}
				containerPalette="LongRunningPalette"
				imageLoading="eager"
			/>
		</FrontSection>
	);
};
Boosted9.storyName = 'With nine standard cards - boosted';
Boosted9.decorators = [lightDecorator(articleFormat)];

export const OneSnapThreeStandard = () => (
	<FrontSection title="Dynamic Package" discussionApiUrl={discussionApiUrl}>
		<DynamicPackage
			groupedTrails={{
				...defaultGroupedTrails,
				snap: [trails[0]],
				standard: trails.slice(1, 4),
			}}
			containerPalette="LongRunningPalette"
			imageLoading="eager"
		/>
	</FrontSection>
);
OneSnapThreeStandard.storyName = 'With one snap - three standard cards';

export const ThreeSnapTwoStandard = () => (
	<FrontSection title="Dynamic Package" discussionApiUrl={discussionApiUrl}>
		<DynamicPackage
			groupedTrails={{
				...defaultGroupedTrails,
				snap: trails.slice(0, 3),
				standard: trails.slice(3, 5),
			}}
			containerPalette="LongRunningPalette"
			imageLoading="eager"
		/>
	</FrontSection>
);
ThreeSnapTwoStandard.storyName = 'With three snaps - two standard cards';

export const ThreeSnapTwoStandard2ndBoosted = () => (
	<FrontSection title="Dynamic Package" discussionApiUrl={discussionApiUrl}>
		<DynamicPackage
			groupedTrails={{
				...defaultGroupedTrails,
				snap: [trails[0], { ...trails[1], isBoosted: true }, trails[2]],
				standard: trails.slice(3, 5),
			}}
			containerPalette="LongRunningPalette"
			imageLoading="eager"
		/>
	</FrontSection>
);
ThreeSnapTwoStandard2ndBoosted.storyName =
	'With three snaps (2nd boosted) - two standard cards';

export const SpecialReportWithoutPalette = () => (
	<FrontSection
		title="Dynamic Package"
		showTopBorder={true}
		discussionApiUrl={discussionApiUrl}
	>
		<DynamicPackage
			groupedTrails={{
				...defaultGroupedTrails,
				snap: trails.slice(0, 1),
				standard: [
					{
						format: {
							display: ArticleDisplay.Immersive,
							theme: ArticleSpecial.SpecialReport,
							design: ArticleDesign.Standard,
						},
						url: '/news/2016/apr/08/mossack-fonseca-law-firm-hide-money-panama-papers',
						kickerText: 'Mossack Fonseca',
						headline:
							'inside the firm that helps the super-rich hide their money',
						showQuotedHeadline: false,
						dataLinkName: 'news | group-0 | card-@1',
						mainMedia: undefined,
						showLivePlayable: false,
						isExternalLink: false,
						webPublicationDate: '2016-04-08T12:15:09.000Z',
						image: 'https://media.guim.co.uk/bc9acaefba82b18506aa4e60801d0a6af7176a44/0_106_3000_1800/3000.jpg',
						isBoosted: false,
						trailText:
							'As Panama Papers shine light on offshore world, Luke Harding takes a closer look at company exploiting tropical tax havens',
						supportingContent: [],
						byline: 'Luke Harding',
						snapData: {},
						isCrossword: false,
						discussionApiUrl,
					},
				],
			}}
			imageLoading="eager"
		/>
	</FrontSection>
);
One.storyName = 'With one standard card';

export const VideoSublinks = () => (
	<FrontSection
		title="Dynamic Package"
		showTopBorder={true}
		discussionApiUrl={discussionApiUrl}
	>
		<DynamicPackage
			groupedTrails={{
				...defaultGroupedTrails,
				snap: [],
				standard: trails.slice(-1),
			}}
			containerPalette="LongRunningPalette"
			imageLoading="eager"
		/>
	</FrontSection>
);
VideoSublinks.storyName = 'With one video card, and supporting content';
