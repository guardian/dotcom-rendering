import { breakpoints } from '@guardian/source/foundations';
import type { Meta, StoryObj } from '@storybook/react-webpack5';
import { discussionApiUrl } from '../../fixtures/manual/discussionApiUrl';
import {
	audioTrails,
	galleryTrails,
	selfHostedVideo45Card,
	selfHostedVideo53Card,
	selfHostedVideo54Card,
	selfHostedVideo916Card,
	trails,
	youtubeVideoTrails,
} from '../../fixtures/manual/trails';
import type { DCRContainerPalette, DCRFrontCard } from '../types/front';
import { FrontSection } from './FrontSection';
import { StaticFeatureTwo } from './StaticFeatureTwo';

const meta = {
	component: StaticFeatureTwo,
	title: 'Front Containers/StaticFeatureTwo',
	parameters: {
		chromatic: {
			viewports: [
				breakpoints.mobile,
				breakpoints.tablet,
				breakpoints.wide,
			],
		},
	},
	args: {
		trails: trails.slice(0, 2),
		imageLoading: 'eager',
		aspectRatio: '4:5',
		collectionId: 1,
	},
	render: (args) => (
		<FrontSection
			title="Static feature two"
			discussionApiUrl={discussionApiUrl}
			editionId="UK"
			containerLevel="Primary"
		>
			<StaticFeatureTwo {...args} />
		</FrontSection>
	),
} satisfies Meta<typeof StaticFeatureTwo>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default = {};

const containerPalettes = [
	'InvestigationPalette',
	'LongRunningPalette',
	'SombrePalette',
	'BreakingPalette',
	'EventPalette',
	'EventAltPalette',
	'LongRunningAltPalette',
	'SombreAltPalette',
	'SpecialReportAltPalette',
	'Branded',
] as const satisfies readonly DCRContainerPalette[];

const audioCards = audioTrails.slice(0, 2);
export const Audio = {
	args: {
		...Default,
		trails: audioCards,
	},
} satisfies Story;

const galleryCards = galleryTrails.slice(0, 2);
export const Gallery = {
	args: {
		...Default,
		trails: galleryCards,
	},
} satisfies Story;

const youtubeVideoCards = youtubeVideoTrails.slice(0, 2);
export const YoutubeVideo = {
	args: {
		...Default,
		trails: youtubeVideoCards,
	},
} satisfies Story;

export const SelfHostedVideo = {
	render: (args) => {
		const Section = ({
			title,
			videos,
		}: {
			title: string;
			videos: DCRFrontCard[];
		}) => (
			<FrontSection
				title={title}
				discussionApiUrl={discussionApiUrl}
				editionId="UK"
				showTopBorder={true}
			>
				<StaticFeatureTwo {...args} trails={videos} />
			</FrontSection>
		);

		return (
			<>
				<Section
					title="Video the same aspect ratio as container"
					videos={[selfHostedVideo45Card, selfHostedVideo45Card]}
				/>
				<Section
					title="Video taller than the container"
					videos={[selfHostedVideo916Card, selfHostedVideo916Card]}
				/>
				<Section
					title="Video wider than the container"
					videos={[selfHostedVideo54Card, selfHostedVideo53Card]}
				/>
			</>
		);
	},
	args: {
		...Default,
		trails: [selfHostedVideo45Card],
	},
	parameters: {
		chromatic: {
			disableSnapshot: true,
		},
	},
} satisfies Story;

export const WithSpecialPaletteVariations = {
	parameters: {
		/** We only want one breakpoint snapshotted for special palette variations */
		chromatic: { viewports: [breakpoints.desktop] },
	},
	render: (args) => (
		<>
			{containerPalettes.map((containerPalette) => (
				<FrontSection
					title={containerPalette}
					discussionApiUrl={discussionApiUrl}
					editionId="UK"
					key={containerPalette}
					containerPalette={containerPalette}
					containerLevel="Primary"
				>
					<StaticFeatureTwo
						{...args}
						containerPalette={containerPalette}
					/>
				</FrontSection>
			))}
		</>
	),
} satisfies Story;
