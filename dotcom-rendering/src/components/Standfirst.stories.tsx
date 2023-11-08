import {
	ArticleDesign,
	ArticleDisplay,
	ArticleSpecial,
	Pillar,
} from '@guardian/libs';
import { palette as sourcePalette } from '@guardian/source-foundations';
import type { StoryObj } from '@storybook/react';
import { splitTheme } from '../../.storybook/decorators/splitThemeDecorator';
import { Section } from './Section';
import { Standfirst } from './Standfirst';

export default {
	component: Standfirst,
	title: 'Components/Standfirst',
};

const articleFormat = {
	display: ArticleDisplay.Standard,
	design: ArticleDesign.Standard,
	theme: Pillar.News,
};
export const Article: StoryObj = ({ format }: { format: ArticleFormat }) => {
	return (
		<Section fullWidth={true}>
			<Standfirst
				format={format}
				standfirst="This is how Article standfirst text looks. Aut explicabo officia delectus omnis repellendus voluptas <ul><li><a href=\'https://www.theguardian.com/uk'>Bullet 1</a></li><li><a href=\'https://www.theguardian.com/uk'>Bullet 2</a></li></ul>"
			/>
		</Section>
	);
};
Article.storyName = 'Article';
Article.decorators = [splitTheme([articleFormat])];

export const Comment: StoryObj = ({ format }: { format: ArticleFormat }) => {
	return (
		<Section fullWidth={true}>
			<Standfirst
				format={format}
				standfirst="This is how Comment standfirst text looks. Aut explicabo officia delectus omnis repellendus voluptas <ul><li><a href=\'https://www.theguardian.com/uk'>Bullet 1</a></li><li><a href=\'https://www.theguardian.com/uk'>Bullet 2</a></li></ul>"
			/>
		</Section>
	);
};
Comment.storyName = 'Comment';
Comment.decorators = [
	splitTheme([
		{
			display: ArticleDisplay.Standard,
			design: ArticleDesign.Comment,
			theme: Pillar.News,
		},
	]),
];

export const Letter: StoryObj = ({ format }: { format: ArticleFormat }) => {
	return (
		<Section fullWidth={true}>
			<Standfirst
				format={format}
				standfirst="This is how Letter standfirst text looks. Aut explicabo officia delectus omnis repellendus voluptas <ul><li><a href=\'https://www.theguardian.com/uk'>Bullet 1</a></li><li><a href=\'https://www.theguardian.com/uk'>Bullet 2</a></li></ul>"
			/>
		</Section>
	);
};
Letter.storyName = 'Letter';
Letter.decorators = [
	splitTheme([
		{
			display: ArticleDisplay.Standard,
			design: ArticleDesign.Letter,
			theme: Pillar.News,
		},
	]),
];

export const Feature: StoryObj = ({ format }: { format: ArticleFormat }) => {
	return (
		<Section fullWidth={true}>
			<Standfirst
				format={format}
				standfirst="This is how Feature standfirst text looks. Aut explicabo officia delectus omnis repellendus voluptas <ul><li><a href=\'https://www.theguardian.com/uk'>Bullet 1</a></li><li><a href=\'https://www.theguardian.com/uk'>Bullet 2</a></li></ul>"
			/>
		</Section>
	);
};
Feature.storyName = 'Feature';
Feature.decorators = [
	splitTheme([
		{
			display: ArticleDisplay.Standard,
			design: ArticleDesign.Feature,
			theme: Pillar.News,
		},
	]),
];

export const Immersive: StoryObj = ({ format }: { format: ArticleFormat }) => {
	return (
		<Section fullWidth={true}>
			<Standfirst
				format={format}
				standfirst="This is how Immersive standfirst text looks. Aut explicabo officia delectus omnis repellendus voluptas <ul><li><a href=\'https://www.theguardian.com/uk'>Bullet 1</a></li><li><a href=\'https://www.theguardian.com/uk'>Bullet 2</a></li></ul>"
			/>
		</Section>
	);
};
Immersive.storyName = 'Immersive';
Immersive.decorators = [
	splitTheme([
		{
			display: ArticleDisplay.Immersive,
			design: ArticleDesign.Standard,
			theme: Pillar.News,
		},
	]),
];

export const Review: StoryObj = ({ format }: { format: ArticleFormat }) => {
	return (
		<Section fullWidth={true}>
			<Standfirst
				format={format}
				standfirst="This is how Review standfirst text looks. Aut explicabo officia delectus omnis repellendus voluptas <ul><li><a href=\'https://www.theguardian.com/uk'>Bullet 1</a></li><li><a href=\'https://www.theguardian.com/uk'>Bullet 2</a></li></ul>"
			/>
		</Section>
	);
};
Review.storyName = 'Review';
Review.decorators = [
	splitTheme([
		{
			display: ArticleDisplay.Standard,
			design: ArticleDesign.Review,
			theme: Pillar.News,
		},
	]),
];

export const LiveBlog: StoryObj = ({ format }: { format: ArticleFormat }) => {
	return (
		<Section fullWidth={true}>
			<Standfirst
				format={format}
				standfirst="<p>This is how a Liveblog with bullets looks. Aut explicabo officia delectus omnis repellendus voluptas</p> <ul><li><a href=\'https://www.theguardian.com/uk'>Bullet 1</a></li><li><a href=\'https://www.theguardian.com/uk'>Bullet 2</a></li></ul>"
			/>
		</Section>
	);
};
LiveBlog.storyName = 'LiveBlog';
LiveBlog.story = {
	parameters: {
		backgrounds: {
			default: 'red',
			values: [
				{
					name: 'red',
					value: sourcePalette.news[300],
				},
			],
		},
	},
};
LiveBlog.decorators = [
	splitTheme([
		{
			display: ArticleDisplay.Standard,
			design: ArticleDesign.LiveBlog,
			theme: Pillar.News,
		},
	]),
];

export const DeadBlog: StoryObj = ({ format }: { format: ArticleFormat }) => {
	return (
		<Section fullWidth={true}>
			<Standfirst
				format={format}
				standfirst="<p>This is how a Deadblog with bullets looks. Aut explicabo officia delectus omnis repellendus voluptas</p> <ul><li><a href=\'https://www.theguardian.com/uk'>Bullet 1</a></li><li><a href=\'https://www.theguardian.com/uk'>Bullet 2</a></li></ul>"
			/>
		</Section>
	);
};
DeadBlog.storyName = 'DeadBlog';
DeadBlog.decorators = [
	splitTheme([
		{
			display: ArticleDisplay.Standard,
			design: ArticleDesign.DeadBlog,
			theme: Pillar.News,
		},
	]),
];

export const Interview: StoryObj = ({ format }: { format: ArticleFormat }) => {
	return (
		<Section fullWidth={true}>
			<Standfirst
				format={format}
				standfirst="This is how Interview standfirst text looks. Aut explicabo officia delectus omnis repellendus voluptas <ul><li><a href=\'https://www.theguardian.com/uk'>Bullet 1</a></li><li><a href=\'https://www.theguardian.com/uk'>Bullet 2</a></li></ul>"
			/>
		</Section>
	);
};
Interview.storyName = 'Interview';
Interview.decorators = [
	splitTheme([
		{
			display: ArticleDisplay.Standard,
			design: ArticleDesign.Interview,
			theme: Pillar.News,
		},
	]),
];

export const Analysis: StoryObj = ({ format }: { format: ArticleFormat }) => {
	return (
		<Section fullWidth={true}>
			<Standfirst
				format={format}
				standfirst="This is how Analysis standfirst text looks. Aut explicabo officia delectus omnis repellendus voluptas <ul><li><a href=\'https://www.theguardian.com/uk'>Bullet 1</a></li><li><a href=\'https://www.theguardian.com/uk'>Bullet 2</a></li></ul>"
			/>
		</Section>
	);
};
Analysis.storyName = 'Analysis';
Analysis.decorators = [
	splitTheme([
		{
			display: ArticleDisplay.Standard,
			design: ArticleDesign.Analysis,
			theme: Pillar.News,
		},
	]),
];

export const Explainer: StoryObj = ({ format }: { format: ArticleFormat }) => {
	return (
		<Section fullWidth={true}>
			<Standfirst
				format={format}
				standfirst="This is how Explainer standfirst text looks. Aut explicabo officia delectus omnis repellendus voluptas <ul><li><a href=\'https://www.theguardian.com/uk'>Bullet 1</a></li><li><a href=\'https://www.theguardian.com/uk'>Bullet 2</a></li></ul>"
			/>
		</Section>
	);
};
Explainer.storyName = 'Explainer';
Explainer.decorators = [
	splitTheme([
		{
			display: ArticleDisplay.Standard,
			design: ArticleDesign.Explainer,
			theme: Pillar.News,
		},
	]),
];

export const Gallery: StoryObj = ({ format }: { format: ArticleFormat }) => {
	return (
		<Section fullWidth={true}>
			<Standfirst
				format={format}
				standfirst="This is how Gallery standfirst text looks. Aut explicabo officia delectus omnis repellendus voluptas <ul><li><a href=\'https://www.theguardian.com/uk'>Bullet 1</a></li><li><a href=\'https://www.theguardian.com/uk'>Bullet 2</a></li></ul>"
			/>
		</Section>
	);
};
Gallery.storyName = 'Gallery';
Gallery.decorators = [
	splitTheme([
		{
			display: ArticleDisplay.Standard,
			design: ArticleDesign.Gallery,
			theme: Pillar.Culture,
		},
	]),
];

export const Audio: StoryObj = ({ format }: { format: ArticleFormat }) => {
	return (
		<Section fullWidth={true}>
			<Standfirst
				format={format}
				standfirst="This is how Audio standfirst text looks. Aut explicabo officia delectus omnis repellendus voluptas <ul><li><a href=\'https://www.theguardian.com/uk'>Bullet 1</a></li><li><a href=\'https://www.theguardian.com/uk'>Bullet 2</a></li></ul>"
			/>
		</Section>
	);
};
Audio.storyName = 'Audio';
Audio.decorators = [
	splitTheme([
		{
			display: ArticleDisplay.Standard,
			design: ArticleDesign.Audio,
			theme: Pillar.Culture,
		},
	]),
];

export const Video: StoryObj = ({ format }: { format: ArticleFormat }) => {
	return (
		<Section fullWidth={true}>
			<Standfirst
				format={format}
				standfirst="This is how Video standfirst text looks. Aut explicabo officia delectus omnis repellendus voluptas <ul><li><a href=\'https://www.theguardian.com/uk'>Bullet 1</a></li><li><a href=\'https://www.theguardian.com/uk'>Bullet 2</a></li></ul>"
			/>
		</Section>
	);
};
Video.storyName = 'Video';
Video.decorators = [
	splitTheme([
		{
			display: ArticleDisplay.Standard,
			design: ArticleDesign.Video,
			theme: Pillar.Culture,
		},
	]),
];

export const Recipe: StoryObj = ({ format }: { format: ArticleFormat }) => {
	return (
		<Section fullWidth={true}>
			<Standfirst
				format={format}
				standfirst="This is how Recipe standfirst text looks. Aut explicabo officia delectus omnis repellendus voluptas <ul><li><a href=\'https://www.theguardian.com/uk'>Bullet 1</a></li><li><a href=\'https://www.theguardian.com/uk'>Bullet 2</a></li></ul>"
			/>
		</Section>
	);
};
Recipe.storyName = 'Recipe';
Recipe.decorators = [
	splitTheme([
		{
			display: ArticleDisplay.Standard,
			design: ArticleDesign.Recipe,
			theme: Pillar.Lifestyle,
		},
	]),
];

export const MatchReport: StoryObj = ({
	format,
}: {
	format: ArticleFormat;
}) => {
	return (
		<Section fullWidth={true}>
			<Standfirst
				format={format}
				standfirst="This is how MatchReport standfirst text looks. Aut explicabo officia delectus omnis repellendus voluptas <ul><li><a href=\'https://www.theguardian.com/uk'>Bullet 1</a></li><li><a href=\'https://www.theguardian.com/uk'>Bullet 2</a></li></ul>"
			/>
		</Section>
	);
};
MatchReport.storyName = 'MatchReport';
MatchReport.decorators = [
	splitTheme([
		{
			display: ArticleDisplay.Standard,
			design: ArticleDesign.MatchReport,
			theme: Pillar.Sport,
		},
	]),
];

export const Quiz: StoryObj = ({ format }: { format: ArticleFormat }) => {
	return (
		<Section fullWidth={true}>
			<Standfirst
				format={format}
				standfirst="This is how Quiz standfirst text looks. Aut explicabo officia delectus omnis repellendus voluptas <ul><li><a href=\'https://www.theguardian.com/uk'>Bullet 1</a></li><li><a href=\'https://www.theguardian.com/uk'>Bullet 2</a></li></ul>"
			/>
		</Section>
	);
};
Quiz.storyName = 'Quiz';
Quiz.decorators = [
	splitTheme([
		{
			display: ArticleDisplay.Standard,
			design: ArticleDesign.Quiz,
			theme: Pillar.Lifestyle,
		},
	]),
];

export const SpecialReport: StoryObj = ({
	format,
}: {
	format: ArticleFormat;
}) => {
	return (
		<Section fullWidth={true}>
			<Standfirst
				format={format}
				standfirst="This is how SpecialReport standfirst text looks. Aut explicabo officia delectus omnis repellendus voluptas <ul><li><a href=\'https://www.theguardian.com/uk'>Bullet 1</a></li><li><a href=\'https://www.theguardian.com/uk'>Bullet 2</a></li></ul>"
			/>
		</Section>
	);
};
SpecialReport.storyName = 'SpecialReport';
SpecialReport.decorators = [
	splitTheme([
		{
			display: ArticleDisplay.Standard,
			design: ArticleDesign.Standard,
			theme: ArticleSpecial.SpecialReport,
		},
	]),
];

export const SpecialReportAlt: StoryObj = ({
	format,
}: {
	format: ArticleFormat;
}) => {
	return (
		<Section fullWidth={true}>
			<Standfirst
				format={format}
				standfirst="This is how SpecialReportAlt standfirst text looks. Aut explicabo officia delectus omnis repellendus voluptas <ul><li><a href=\'https://www.theguardian.com/uk'>Bullet 1</a></li><li><a href=\'https://www.theguardian.com/uk'>Bullet 2</a></li></ul>"
			/>
		</Section>
	);
};
SpecialReportAlt.storyName = 'SpecialReportAlt';
SpecialReportAlt.decorators = [
	splitTheme([
		{
			display: ArticleDisplay.Standard,
			design: ArticleDesign.Standard,
			theme: ArticleSpecial.SpecialReportAlt,
		},
	]),
];

export const Editorial: StoryObj = ({ format }: { format: ArticleFormat }) => {
	return (
		<Section fullWidth={true}>
			<Standfirst
				format={format}
				standfirst="This is how Editorial standfirst text looks. Aut explicabo officia delectus omnis repellendus voluptas <ul><li><a href=\'https://www.theguardian.com/uk'>Bullet 1</a></li><li><a href=\'https://www.theguardian.com/uk'>Bullet 2</a></li></ul>"
			/>
		</Section>
	);
};
Editorial.storyName = 'Editorial';
Editorial.decorators = [
	splitTheme([
		{
			display: ArticleDisplay.Standard,
			design: ArticleDesign.Editorial,
			theme: Pillar.Opinion,
		},
	]),
];

export const PhotoEssay: StoryObj = ({ format }: { format: ArticleFormat }) => {
	return (
		<Section fullWidth={true}>
			<Standfirst
				format={format}
				standfirst="This is how PhotoEssay standfirst text looks. Aut explicabo officia delectus omnis repellendus voluptas <ul><li><a href=\'https://www.theguardian.com/uk'>Bullet 1</a></li><li><a href=\'https://www.theguardian.com/uk'>Bullet 2</a></li></ul>"
			/>
		</Section>
	);
};
PhotoEssay.storyName = 'PhotoEssay';
PhotoEssay.decorators = [
	splitTheme([
		{
			display: ArticleDisplay.Standard,
			design: ArticleDesign.PhotoEssay,
			theme: Pillar.News,
		},
	]),
];

export const LabsWithLink: StoryObj = ({
	format,
}: {
	format: ArticleFormat;
}) => {
	return (
		<Section fullWidth={true}>
			<Standfirst
				format={format}
				standfirst='<p>Whether your holiday priorities are sampling gastronomic delights, visiting cultural landmarks, adventuring in the great outdoors or just having an easy time with the kids, this quiz will help you plan your itinerary for Brittany, Normandy and the Atlantic Loire Valley</p> <ul> <li>National restrictions may apply, please consult <a href="https://www.gov.uk/guidance/travel-advice-novel-coronavirus" rel="nofollow">government advice</a> before planning travel</li> </ul>'
			/>
		</Section>
	);
};
LabsWithLink.storyName = 'LabsWithLink';
LabsWithLink.decorators = [
	splitTheme([
		{
			display: ArticleDisplay.Standard,
			design: ArticleDesign.Standard,
			theme: ArticleSpecial.Labs,
		},
	]),
];
