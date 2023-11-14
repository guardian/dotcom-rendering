import type { ArticleFormat } from '@guardian/libs';
import {
	ArticleDesign,
	ArticleDisplay,
	ArticleSpecial,
	Pillar,
} from '@guardian/libs';
import { breakpoints, palette } from '@guardian/source-foundations';
import type { SplitThemeStory } from '../../.storybook/decorators/splitThemeDecorator';
import { splitTheme } from '../../.storybook/decorators/splitThemeDecorator';
import type { DCRContainerPalette } from '../types/front';
import { CardHeadline } from './CardHeadline';
import { ContainerOverrides } from './ContainerOverrides';
import { Section } from './Section';

export default {
	component: CardHeadline,
	title: 'Components/CardHeadline',
};

const smallHeadlineSizes: SmallHeadlineSize[] = [
	'ginormous',
	'huge',
	'large',
	'medium',
	'small',
	'tiny',
];

export const Article: SplitThemeStory = {
	render: ({ format }) => (
		<Section fullWidth={true} showTopBorder={false} showSideBorders={false}>
			<CardHeadline
				headlineText="This is how an Article card headline looks"
				format={format}
			/>
		</Section>
	),
	decorators: [
		splitTheme([
			{
				display: ArticleDisplay.Standard,
				design: ArticleDesign.Standard,
				theme: Pillar.News,
			},
		]),
	],
};

export const Analysis: SplitThemeStory = {
	render: ({ format }) => (
		<>
			{smallHeadlineSizes.map((size) => (
				<div key={size}>
					<Section
						fullWidth={true}
						showTopBorder={false}
						showSideBorders={false}
					>
						<CardHeadline
							headlineText={`This is how a ${size} ${
								Pillar[format.theme] ??
								ArticleSpecial[format.theme] ??
								'Unknown'
							} card headline looks`}
							format={format}
							size={size}
						/>
					</Section>
				</div>
			))}
		</>
	),
	decorators: [
		splitTheme([
			{
				display: ArticleDisplay.Standard,
				design: ArticleDesign.Analysis,
				theme: Pillar.News,
			},
			{
				display: ArticleDisplay.Standard,
				design: ArticleDesign.Analysis,
				theme: Pillar.Sport,
			},
			{
				display: ArticleDisplay.Standard,
				design: ArticleDesign.Analysis,
				theme: Pillar.Culture,
			},
			{
				display: ArticleDisplay.Standard,
				design: ArticleDesign.Analysis,
				theme: Pillar.Opinion,
			},
			{
				display: ArticleDisplay.Standard,
				design: ArticleDesign.Analysis,
				theme: Pillar.Lifestyle,
			},
			{
				display: ArticleDisplay.Standard,
				design: ArticleDesign.Analysis,
				theme: ArticleSpecial.SpecialReport,
			},
		]),
	],
};

export const Feature: SplitThemeStory = {
	render: ({ format }) => (
		<Section fullWidth={true} showTopBorder={false} showSideBorders={false}>
			<CardHeadline
				headlineText="This is how a Feature card headline looks"
				format={format}
			/>
		</Section>
	),
	decorators: [
		splitTheme([
			{
				display: ArticleDisplay.Standard,
				design: ArticleDesign.Feature,
				theme: Pillar.News,
			},
		]),
	],
};

export const Size: SplitThemeStory = {
	render: ({ format }: { format: ArticleFormat }) => (
		<>
			{smallHeadlineSizes.map((size) => (
				<div key={size}>
					<Section
						fullWidth={true}
						showTopBorder={false}
						showSideBorders={false}
					>
						<CardHeadline
							headlineText={`This is how a ${size} card headline looks`}
							format={format}
							size={size}
						/>
					</Section>
					<br />
				</div>
			))}
		</>
	),
	decorators: [
		splitTheme([
			{
				display: ArticleDisplay.Standard,
				design: ArticleDesign.Standard,
				theme: Pillar.News,
			},
		]),
	],
};

export const MobileSize: SplitThemeStory = {
	render: ({ format }: { format: ArticleFormat }) => (
		<>
			{smallHeadlineSizes.map((size) => (
				<div key={size}>
					<Section
						fullWidth={true}
						showTopBorder={false}
						showSideBorders={false}
					>
						<CardHeadline
							headlineText={`This is how a mobile ${size} card headline looks`}
							format={format}
							size="medium"
							sizeOnMobile={size}
						/>
					</Section>
					<br />
				</div>
			))}
		</>
	),
	decorators: [
		splitTheme([
			{
				display: ArticleDisplay.Standard,
				design: ArticleDesign.Standard,
				theme: Pillar.News,
			},
		]),
	],
	parameters: {
		chromatic: {
			viewports: [breakpoints.mobile],
		},
	},
};

export const liveStory: SplitThemeStory = {
	storyName: 'With Live kicker',
	render: ({ format }: { format: ArticleFormat }) => (
		<Section fullWidth={true} showTopBorder={false} showSideBorders={false}>
			<CardHeadline
				headlineText="This is how a card headline with a live kicker looks"
				format={format}
				kickerText="Live"
			/>
		</Section>
	),
	decorators: [
		splitTheme([
			{
				display: ArticleDisplay.Standard,
				design: ArticleDesign.Standard,
				theme: Pillar.News,
			},
		]),
	],
};

export const noLineBreak: SplitThemeStory = {
	storyName: 'With Live kicker but no line break',
	render: ({ format }) => (
		<Section fullWidth={true} showTopBorder={false} showSideBorders={false}>
			<CardHeadline
				headlineText="This is how a card headline with no kicker linebreak looks"
				format={format}
				kickerText="Live"
				hideLineBreak={true}
			/>
		</Section>
	),
	decorators: [
		splitTheme([
			{
				display: ArticleDisplay.Standard,
				design: ArticleDesign.Standard,
				theme: Pillar.News,
			},
		]),
	],
};

export const pulsingDot: SplitThemeStory = {
	storyName: 'With pulsing dot',
	render: ({ format }: { format: ArticleFormat }) => (
		<Section fullWidth={true} showTopBorder={false} showSideBorders={false}>
			<CardHeadline
				headlineText="This is how a card headline with a pulsing dot looks"
				format={format}
				kickerText="Live"
				showPulsingDot={true}
			/>
		</Section>
	),
	decorators: [
		splitTheme([
			{
				display: ArticleDisplay.Standard,
				design: ArticleDesign.Standard,
				theme: Pillar.News,
			},
		]),
	],
};

export const cultureVariant: SplitThemeStory = {
	storyName: 'With a culture kicker',
	render: ({ format }) => (
		<Section fullWidth={true} showTopBorder={false} showSideBorders={false}>
			<CardHeadline
				headlineText="This is how a Feature card headline with the culture pillar looks"
				format={format}
				kickerText="Art and stuff"
			/>
		</Section>
	),
	decorators: [
		splitTheme([
			{
				display: ArticleDisplay.Standard,
				design: ArticleDesign.Feature,
				theme: Pillar.Culture,
			},
		]),
	],
};

export const Opinion: SplitThemeStory = {
	storyName: 'Opinion (Quotes)',
	render: ({ format }: { format: ArticleFormat }) => (
		<Section fullWidth={true} showTopBorder={false} showSideBorders={false}>
			<CardHeadline
				headlineText="This is how small card headline for opinion articles look"
				format={format}
				showQuotes={true}
				size="small"
			/>
		</Section>
	),
	decorators: [
		splitTheme([
			{
				display: ArticleDisplay.Standard,
				design: ArticleDesign.Comment,
				theme: Pillar.Opinion,
			},
		]),
	],
};

export const OpinionKicker: SplitThemeStory = {
	storyName: 'With an opinion kicker',
	render: ({ format }) => (
		<>
			{smallHeadlineSizes.map((size) => (
				<div key={size}>
					<Section
						fullWidth={true}
						showTopBorder={false}
						showSideBorders={false}
					>
						<CardHeadline
							headlineText={`This is how a ${size} opinion card headline with a kicker and quotes looks`}
							format={format}
							showQuotes={true}
							kickerText="George Monbiot"
							size={size}
						/>
					</Section>
					<br />
				</div>
			))}
		</>
	),
	decorators: [
		splitTheme([
			{
				display: ArticleDisplay.Standard,
				design: ArticleDesign.Standard,
				theme: Pillar.Opinion,
			},
		]),
	],
};

export const SpecialReport: SplitThemeStory = {
	storyName: 'With theme SpecialReport',
	render: ({ format }) => (
		<Section
			fullWidth={true}
			showTopBorder={false}
			showSideBorders={false}
			backgroundColour="grey"
		>
			<ContainerOverrides isDynamo={false}>
				<CardHeadline
					headlineText="This is how a Special Report card headline with kicker and quotes looks"
					format={format}
					showQuotes={true}
					kickerText="Special Report"
				/>
			</ContainerOverrides>
		</Section>
	),
	decorators: [
		splitTheme([
			{
				display: ArticleDisplay.Standard,
				design: ArticleDesign.Standard,
				theme: ArticleSpecial.SpecialReport,
			},
		]),
	],
};

export const Busy: SplitThemeStory = {
	storyName: 'Lifestyle opinion',
	render: ({ format }: { format: ArticleFormat }) => (
		<Section fullWidth={true} showTopBorder={false} showSideBorders={false}>
			<CardHeadline
				headlineText="I look life a buffoon. I feel incredible. And then I vomit"
				format={format}
				showQuotes={true}
				kickerText="Aerial Yoga"
			/>
		</Section>
	),
	decorators: [
		splitTheme([
			{
				display: ArticleDisplay.Standard,
				design: ArticleDesign.Feature,
				theme: Pillar.Lifestyle,
			},
		]),
	],
};

export const Byline: SplitThemeStory = {
	storyName: 'With byline',
	render: ({ format }) => (
		<Section
			fullWidth={true}
			showSideBorders={false}
			backgroundColour={
				format.theme === ArticleSpecial.SpecialReport
					? palette.specialReport[300]
					: undefined
			}
		>
			<ContainerOverrides isDynamo={false}>
				<CardHeadline
					headlineText="I look life a buffoon. I feel incredible. And then I vomit"
					format={format}
					byline={`${
						Pillar[format.theme] ??
						ArticleSpecial[format.theme] ??
						'Unknown'
					} byline`}
					showByline={true}
				/>
			</ContainerOverrides>
		</Section>
	),
	decorators: [
		splitTheme([
			{
				display: ArticleDisplay.Standard,
				design: ArticleDesign.Feature,
				theme: ArticleSpecial.Labs,
			},
			{
				display: ArticleDisplay.Standard,
				design: ArticleDesign.Feature,
				theme: Pillar.News,
			},
			{
				display: ArticleDisplay.Standard,
				design: ArticleDesign.Feature,
				theme: Pillar.Sport,
			},
			{
				display: ArticleDisplay.Standard,
				design: ArticleDesign.Feature,
				theme: Pillar.Culture,
			},
			{
				display: ArticleDisplay.Standard,
				design: ArticleDesign.Feature,
				theme: Pillar.Lifestyle,
			},
			{
				display: ArticleDisplay.Standard,
				design: ArticleDesign.Feature,
				theme: Pillar.Opinion,
			},
			{
				display: ArticleDisplay.Standard,
				design: ArticleDesign.Feature,
				theme: ArticleSpecial.SpecialReport,
			},
		]),
	],
};

const containerPalettes = [
	'EventPalette',
	'SombreAltPalette',
	'EventAltPalette',
	'InvestigationPalette',
	'LongRunningAltPalette',
	'LongRunningPalette',
	'SombrePalette',
	'BreakingPalette',
	'SpecialReportAltPalette',
	'Branded',
	'MediaPalette',
	'PodcastPalette',
] as const satisfies readonly DCRContainerPalette[];
export const WithContainerOverrides: SplitThemeStory = {
	render: ({ format }) => (
		<>
			{containerPalettes.map((containerPalette) => (
				<Section
					key={containerPalette}
					fullWidth={true}
					showSideBorders={false}
					containerPalette={containerPalette}
				>
					<ContainerOverrides
						containerPalette={containerPalette}
						isDynamo={false}
					>
						<CardHeadline
							headlineText={`This is a ${
								Pillar[format.theme] ??
								ArticleSpecial[format.theme] ??
								'Unknown'
							} headline`}
							containerPalette={containerPalette}
							format={format}
							byline={`inside a ${containerPalette} container`}
							showByline={true}
						/>
					</ContainerOverrides>
				</Section>
			))}
		</>
	),
	decorators: [splitTheme()],
};
