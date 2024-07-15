import { css } from '@emotion/react';
import { ArticleDesign } from '@guardian/libs';
import { breakpoints, textSans17 } from '@guardian/source/foundations';
import type { Meta, StoryFn } from '@storybook/react';
import { discussionApiUrl } from '../../fixtures/manual/discussionApiUrl';
import { trails } from '../../fixtures/manual/trails';
import type {
	DCRContainerPalette,
	DCRFrontCard,
	DCRGroupedTrails,
} from '../types/front';
import { Carousel } from './Carousel.importable';
import { DynamicFast } from './DynamicFast';
import { FrontSection } from './FrontSection';
import { Island } from './Island';
import { LabsSection } from './LabsSection';
import { Section } from './Section';

const groupedTrails = {
	snap: [],
	huge: [],
	veryBig: [{ isBoosted: true, ...trails[0] }, trails[1]],
	big: [trails[2], trails[3]],
	standard: [
		trails[4],
		trails[5],
		trails[6],
		trails[7],
		trails[8],
		trails[9],
	],
} satisfies DCRGroupedTrails;

const meta = {
	title: 'Layouts/Palettes',
	render: ({
		containerPalette,
	}: {
		containerPalette?: DCRContainerPalette;
	}) => {
		return (
			<FrontSection
				title={containerPalette}
				containerPalette={containerPalette}
				showDateHeader={true}
				editionId={'UK'}
				discussionApiUrl={discussionApiUrl}
				toggleable={true}
				sectionId={containerPalette}
			>
				<DynamicFast
					groupedTrails={groupedTrails}
					containerPalette={containerPalette}
					showAge={true}
					absoluteServerTimes={true}
					imageLoading="eager"
				/>
			</FrontSection>
		);
	},
	parameters: {
		chromatic: {
			viewports: [
				breakpoints.mobile,
				breakpoints.tablet,
				breakpoints.wide,
			],
		},
	},
} satisfies Meta;

export default meta;

export const EventPalette = {
	args: { containerPalette: 'EventPalette' },
};

export const EventAltPalette = {
	args: { containerPalette: 'EventAltPalette' },
};

export const SombrePalette = {
	args: { containerPalette: 'SombrePalette' },
};

export const SombreAltPalette = {
	args: { containerPalette: 'SombreAltPalette' },
};

export const BreakingPalette = {
	args: { containerPalette: 'BreakingPalette' },
};

export const LongRunningPalette = {
	args: { containerPalette: 'LongRunningPalette' },
};

export const LongRunningAltPalette = {
	args: { containerPalette: 'LongRunningAltPalette' },
};

export const InvestigationPalette = {
	args: { containerPalette: 'InvestigationPalette' },
};

export const SpecialReportAltPalette = {
	args: { containerPalette: 'SpecialReportAltPalette' },
};

export const BrandedPalette = {
	args: { containerPalette: 'Branded' },
	render: () => (
		<LabsSection
			title="Branded Palette"
			discussionApiUrl={discussionApiUrl}
			editionId={'UK'}
			key="Branded"
			ajaxUrl=""
			collectionId=""
			ophanComponentLink=""
			ophanComponentName=""
			pageId=""
			sectionId="Branded"
			badge={{
				imageSrc:
					'https://static.theguardian.com/commercial/sponsor/22/Feb/2024/17ea91fc-659b-4c51-8410-9907241c1710-Guardian.orglogos-for%20badge.png',
				href: 'https://theguardian.org',
			}}
		>
			<DynamicFast
				groupedTrails={groupedTrails}
				containerPalette="Branded"
				showAge={true}
				absoluteServerTimes={true}
				imageLoading="eager"
			/>
		</LabsSection>
	),
};

const carouselRenderer = ({
	containerPalette: palette,
}: {
	containerPalette: DCRContainerPalette;
}) => {
	const overrideDesign =
		(design: ArticleDesign) => (format: ArticleFormat) => ({
			...format,
			design,
		});

	const trailDesign =
		palette === 'MediaPalette' ? ArticleDesign.Video : ArticleDesign.Audio;

	const overriddenTrails = trails.map((trail) => ({
		...trail,
		format: overrideDesign(trailDesign)(trail.format),
	})) satisfies DCRFrontCard[];

	return (
		<Section
			fullWidth={true}
			containerPalette={palette}
			showDateHeader={true}
			editionId={'UK'}
			key={palette}
			toggleable={true}
			sectionId={palette}
		>
			<Island priority="feature" defer={{ until: 'visible' }}>
				<Carousel
					isOnwardContent={false}
					heading={palette}
					trails={overriddenTrails.slice(0, 10)}
					onwardsSource="more-on-this-story"
					leftColSize="compact"
					url={'https://www.theguardian.com'}
					discussionApiUrl={discussionApiUrl}
					palette={palette}
					absoluteServerTimes={true}
				/>
			</Island>
		</Section>
	);
};

export const MediaPalette = {
	args: { containerPalette: 'MediaPalette' },
	render: carouselRenderer,
	decorators: [
		(Story: StoryFn) => (
			<>
				<span
					css={css`
						${textSans17}
					`}
				>
					<em>
						The media palette is only used with video cards in a
						carousel
					</em>
				</span>
				<Story />
			</>
		),
	],
};

export const PodcastPalette = {
	args: { containerPalette: 'PodcastPalette' },
	render: carouselRenderer,
	decorators: [
		(Story: StoryFn) => (
			<>
				<span
					css={css`
						${textSans17}
						padding-bottom: 4px;
					`}
				>
					<em>
						The podcast palette is only used with audio cards in a
						carousel
					</em>
				</span>
				<Story />
			</>
		),
	],
};
