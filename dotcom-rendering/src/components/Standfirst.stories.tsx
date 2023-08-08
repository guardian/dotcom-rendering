import {
	ArticleDesign,
	ArticleDisplay,
	ArticleSpecial,
	Pillar,
} from '@guardian/libs';
import { news } from '@guardian/source-foundations';
import { Section } from './Section';
import { Standfirst } from './Standfirst';

export default {
	component: Standfirst,
	title: 'Components/Standfirst',
};

export const Article = () => {
	return (
		<Section fullWidth={true}>
			<Standfirst
				format={{
					display: ArticleDisplay.Standard,
					design: ArticleDesign.Standard,
					theme: Pillar.News,
				}}
				standfirst="This is how Article standfirst text looks. Aut explicabo officia delectus omnis repellendus voluptas <ul><li><a href=\'https://www.theguardian.com/uk'>Bullet 1</a></li><li><a href=\'https://www.theguardian.com/uk'>Bullet 2</a></li></ul>"
			/>
		</Section>
	);
};
Article.storyName = 'Article';

export const Comment = () => {
	return (
		<Section fullWidth={true}>
			<Standfirst
				format={{
					display: ArticleDisplay.Standard,
					design: ArticleDesign.Comment,
					theme: Pillar.News,
				}}
				standfirst="This is how Comment standfirst text looks. Aut explicabo officia delectus omnis repellendus voluptas <ul><li><a href=\'https://www.theguardian.com/uk'>Bullet 1</a></li><li><a href=\'https://www.theguardian.com/uk'>Bullet 2</a></li></ul>"
			/>
		</Section>
	);
};
Comment.storyName = 'Comment';

export const Letter = () => {
	return (
		<Section fullWidth={true}>
			<Standfirst
				format={{
					display: ArticleDisplay.Standard,
					design: ArticleDesign.Letter,
					theme: Pillar.News,
				}}
				standfirst="This is how Letter standfirst text looks. Aut explicabo officia delectus omnis repellendus voluptas <ul><li><a href=\'https://www.theguardian.com/uk'>Bullet 1</a></li><li><a href=\'https://www.theguardian.com/uk'>Bullet 2</a></li></ul>"
			/>
		</Section>
	);
};
Letter.storyName = 'Letter';

export const Feature = () => {
	return (
		<Section fullWidth={true}>
			<Standfirst
				format={{
					display: ArticleDisplay.Standard,
					design: ArticleDesign.Feature,
					theme: Pillar.News,
				}}
				standfirst="This is how Feature standfirst text looks. Aut explicabo officia delectus omnis repellendus voluptas <ul><li><a href=\'https://www.theguardian.com/uk'>Bullet 1</a></li><li><a href=\'https://www.theguardian.com/uk'>Bullet 2</a></li></ul>"
			/>
		</Section>
	);
};
Feature.storyName = 'Feature';

export const Immersive = () => {
	return (
		<Section fullWidth={true}>
			<Standfirst
				format={{
					display: ArticleDisplay.Immersive,
					design: ArticleDesign.Standard,
					theme: Pillar.News,
				}}
				standfirst="This is how Immersive standfirst text looks. Aut explicabo officia delectus omnis repellendus voluptas <ul><li><a href=\'https://www.theguardian.com/uk'>Bullet 1</a></li><li><a href=\'https://www.theguardian.com/uk'>Bullet 2</a></li></ul>"
			/>
		</Section>
	);
};
Immersive.storyName = 'Immersive';

export const Review = () => {
	return (
		<Section fullWidth={true}>
			<Standfirst
				format={{
					display: ArticleDisplay.Standard,
					design: ArticleDesign.Review,
					theme: Pillar.News,
				}}
				standfirst="This is how Review standfirst text looks. Aut explicabo officia delectus omnis repellendus voluptas <ul><li><a href=\'https://www.theguardian.com/uk'>Bullet 1</a></li><li><a href=\'https://www.theguardian.com/uk'>Bullet 2</a></li></ul>"
			/>
		</Section>
	);
};
Review.storyName = 'Review';

export const LiveBlog = () => {
	return (
		<Section fullWidth={true}>
			<Standfirst
				format={{
					display: ArticleDisplay.Standard,
					design: ArticleDesign.LiveBlog,
					theme: Pillar.News,
				}}
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
					value: news[300],
				},
			],
		},
	},
};

export const DeadBlog = () => {
	return (
		<Section fullWidth={true}>
			<Standfirst
				format={{
					display: ArticleDisplay.Standard,
					design: ArticleDesign.DeadBlog,
					theme: Pillar.News,
				}}
				standfirst="<p>This is how a Deadblog with bullets looks. Aut explicabo officia delectus omnis repellendus voluptas</p> <ul><li><a href=\'https://www.theguardian.com/uk'>Bullet 1</a></li><li><a href=\'https://www.theguardian.com/uk'>Bullet 2</a></li></ul>"
			/>
		</Section>
	);
};
DeadBlog.storyName = 'DeadBlog';

export const Interview = () => {
	return (
		<Section fullWidth={true}>
			<Standfirst
				format={{
					display: ArticleDisplay.Standard,
					design: ArticleDesign.Interview,
					theme: Pillar.News,
				}}
				standfirst="This is how Interview standfirst text looks. Aut explicabo officia delectus omnis repellendus voluptas <ul><li><a href=\'https://www.theguardian.com/uk'>Bullet 1</a></li><li><a href=\'https://www.theguardian.com/uk'>Bullet 2</a></li></ul>"
			/>
		</Section>
	);
};
Interview.storyName = 'Interview';

export const Analysis = () => {
	return (
		<Section fullWidth={true}>
			<Standfirst
				format={{
					display: ArticleDisplay.Standard,
					design: ArticleDesign.Analysis,
					theme: Pillar.News,
				}}
				standfirst="This is how Analysis standfirst text looks. Aut explicabo officia delectus omnis repellendus voluptas <ul><li><a href=\'https://www.theguardian.com/uk'>Bullet 1</a></li><li><a href=\'https://www.theguardian.com/uk'>Bullet 2</a></li></ul>"
			/>
		</Section>
	);
};
Analysis.storyName = 'Analysis';

export const Explainer = () => {
	return (
		<Section fullWidth={true}>
			<Standfirst
				format={{
					display: ArticleDisplay.Standard,
					design: ArticleDesign.Explainer,
					theme: Pillar.News,
				}}
				standfirst="This is how Explainer standfirst text looks. Aut explicabo officia delectus omnis repellendus voluptas <ul><li><a href=\'https://www.theguardian.com/uk'>Bullet 1</a></li><li><a href=\'https://www.theguardian.com/uk'>Bullet 2</a></li></ul>"
			/>
		</Section>
	);
};
Explainer.storyName = 'Explainer';

export const Gallery = () => {
	return (
		<Section fullWidth={true}>
			<Standfirst
				format={{
					display: ArticleDisplay.Standard,
					design: ArticleDesign.Gallery,
					theme: Pillar.Culture,
				}}
				standfirst="This is how Gallery standfirst text looks. Aut explicabo officia delectus omnis repellendus voluptas <ul><li><a href=\'https://www.theguardian.com/uk'>Bullet 1</a></li><li><a href=\'https://www.theguardian.com/uk'>Bullet 2</a></li></ul>"
			/>
		</Section>
	);
};
Gallery.storyName = 'Gallery';

export const Audio = () => {
	return (
		<Section fullWidth={true}>
			<Standfirst
				format={{
					display: ArticleDisplay.Standard,
					design: ArticleDesign.Audio,
					theme: Pillar.Culture,
				}}
				standfirst="This is how Audio standfirst text looks. Aut explicabo officia delectus omnis repellendus voluptas <ul><li><a href=\'https://www.theguardian.com/uk'>Bullet 1</a></li><li><a href=\'https://www.theguardian.com/uk'>Bullet 2</a></li></ul>"
			/>
		</Section>
	);
};
Audio.storyName = 'Audio';

export const Video = () => {
	return (
		<Section fullWidth={true}>
			<Standfirst
				format={{
					display: ArticleDisplay.Standard,
					design: ArticleDesign.Video,
					theme: Pillar.Culture,
				}}
				standfirst="This is how Video standfirst text looks. Aut explicabo officia delectus omnis repellendus voluptas <ul><li><a href=\'https://www.theguardian.com/uk'>Bullet 1</a></li><li><a href=\'https://www.theguardian.com/uk'>Bullet 2</a></li></ul>"
			/>
		</Section>
	);
};
Video.storyName = 'Video';

export const Recipe = () => {
	return (
		<Section fullWidth={true}>
			<Standfirst
				format={{
					display: ArticleDisplay.Standard,
					design: ArticleDesign.Recipe,
					theme: Pillar.Lifestyle,
				}}
				standfirst="This is how Recipe standfirst text looks. Aut explicabo officia delectus omnis repellendus voluptas <ul><li><a href=\'https://www.theguardian.com/uk'>Bullet 1</a></li><li><a href=\'https://www.theguardian.com/uk'>Bullet 2</a></li></ul>"
			/>
		</Section>
	);
};
Recipe.storyName = 'Recipe';

export const MatchReport = () => {
	return (
		<Section fullWidth={true}>
			<Standfirst
				format={{
					display: ArticleDisplay.Standard,
					design: ArticleDesign.MatchReport,
					theme: Pillar.Sport,
				}}
				standfirst="This is how MatchReport standfirst text looks. Aut explicabo officia delectus omnis repellendus voluptas <ul><li><a href=\'https://www.theguardian.com/uk'>Bullet 1</a></li><li><a href=\'https://www.theguardian.com/uk'>Bullet 2</a></li></ul>"
			/>
		</Section>
	);
};
MatchReport.storyName = 'MatchReport';

export const Quiz = () => {
	return (
		<Section fullWidth={true}>
			<Standfirst
				format={{
					display: ArticleDisplay.Standard,
					design: ArticleDesign.Quiz,
					theme: Pillar.Lifestyle,
				}}
				standfirst="This is how Quiz standfirst text looks. Aut explicabo officia delectus omnis repellendus voluptas <ul><li><a href=\'https://www.theguardian.com/uk'>Bullet 1</a></li><li><a href=\'https://www.theguardian.com/uk'>Bullet 2</a></li></ul>"
			/>
		</Section>
	);
};
Quiz.storyName = 'Quiz';

export const SpecialReport = () => {
	return (
		<Section fullWidth={true}>
			<Standfirst
				format={{
					display: ArticleDisplay.Standard,
					design: ArticleDesign.Standard,
					theme: ArticleSpecial.SpecialReport,
				}}
				standfirst="This is how SpecialReport standfirst text looks. Aut explicabo officia delectus omnis repellendus voluptas <ul><li><a href=\'https://www.theguardian.com/uk'>Bullet 1</a></li><li><a href=\'https://www.theguardian.com/uk'>Bullet 2</a></li></ul>"
			/>
		</Section>
	);
};
SpecialReport.storyName = 'SpecialReport';

export const SpecialReportAlt = () => {
	return (
		<Section fullWidth={true}>
			<Standfirst
				format={{
					display: ArticleDisplay.Standard,
					design: ArticleDesign.Standard,
					theme: ArticleSpecial.SpecialReportAlt,
				}}
				standfirst="This is how SpecialReportAlt standfirst text looks. Aut explicabo officia delectus omnis repellendus voluptas <ul><li><a href=\'https://www.theguardian.com/uk'>Bullet 1</a></li><li><a href=\'https://www.theguardian.com/uk'>Bullet 2</a></li></ul>"
			/>
		</Section>
	);
};
SpecialReportAlt.storyName = 'SpecialReportAlt';

export const Editorial = () => {
	return (
		<Section fullWidth={true}>
			<Standfirst
				format={{
					display: ArticleDisplay.Standard,
					design: ArticleDesign.Editorial,
					theme: Pillar.Opinion,
				}}
				standfirst="This is how Editorial standfirst text looks. Aut explicabo officia delectus omnis repellendus voluptas <ul><li><a href=\'https://www.theguardian.com/uk'>Bullet 1</a></li><li><a href=\'https://www.theguardian.com/uk'>Bullet 2</a></li></ul>"
			/>
		</Section>
	);
};
Editorial.storyName = 'Editorial';

export const PhotoEssay = () => {
	return (
		<Section fullWidth={true}>
			<Standfirst
				format={{
					display: ArticleDisplay.Standard,
					design: ArticleDesign.PhotoEssay,
					theme: Pillar.News,
				}}
				standfirst="This is how PhotoEssay standfirst text looks. Aut explicabo officia delectus omnis repellendus voluptas <ul><li><a href=\'https://www.theguardian.com/uk'>Bullet 1</a></li><li><a href=\'https://www.theguardian.com/uk'>Bullet 2</a></li></ul>"
			/>
		</Section>
	);
};
PhotoEssay.storyName = 'PhotoEssay';

export const LabsWithLink = () => {
	return (
		<Section fullWidth={true}>
			<Standfirst
				format={{
					display: ArticleDisplay.Standard,
					design: ArticleDesign.Standard,
					theme: ArticleSpecial.Labs,
				}}
				standfirst='<p>Whether your holiday priorities are sampling gastronomic delights, visiting cultural landmarks, adventuring in the great outdoors or just having an easy time with the kids, this quiz will help you plan your itinerary for Brittany, Normandy and the Atlantic Loire Valley</p> <ul> <li>National restrictions may apply, please consult <a href="https://www.gov.uk/guidance/travel-advice-novel-coronavirus" rel="nofollow">government advice</a> before planning travel</li> </ul>'
			/>
		</Section>
	);
};
LabsWithLink.storyName = 'LabsWithLink';
