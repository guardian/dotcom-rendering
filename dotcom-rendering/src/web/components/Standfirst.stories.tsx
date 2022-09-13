import {
	ArticleDesign,
	ArticleDisplay,
	ArticlePillar,
	ArticleSpecial,
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
					theme: ArticlePillar.News,
				}}
				standfirst="This is how Article standfirst text looks. Aut explicabo officia delectus omnis repellendus voluptas <ul><li><a href=\'https://www.theguardian.com/uk'>Bullet 1</a></li><li><a href=\'https://www.theguardian.com/uk'>Bullet 2</a></li></ul>"
			/>
		</Section>
	);
};
Article.story = { name: 'Article' };

export const Comment = () => {
	return (
		<Section fullWidth={true}>
			<Standfirst
				format={{
					display: ArticleDisplay.Standard,
					design: ArticleDesign.Comment,
					theme: ArticlePillar.News,
				}}
				standfirst="This is how Comment standfirst text looks. Aut explicabo officia delectus omnis repellendus voluptas <ul><li><a href=\'https://www.theguardian.com/uk'>Bullet 1</a></li><li><a href=\'https://www.theguardian.com/uk'>Bullet 2</a></li></ul>"
			/>
		</Section>
	);
};
Comment.story = { name: 'Comment' };

export const Letter = () => {
	return (
		<Section fullWidth={true}>
			<Standfirst
				format={{
					display: ArticleDisplay.Standard,
					design: ArticleDesign.Letter,
					theme: ArticlePillar.News,
				}}
				standfirst="This is how Letter standfirst text looks. Aut explicabo officia delectus omnis repellendus voluptas <ul><li><a href=\'https://www.theguardian.com/uk'>Bullet 1</a></li><li><a href=\'https://www.theguardian.com/uk'>Bullet 2</a></li></ul>"
			/>
		</Section>
	);
};
Letter.story = { name: 'Letter' };

export const Feature = () => {
	return (
		<Section fullWidth={true}>
			<Standfirst
				format={{
					display: ArticleDisplay.Standard,
					design: ArticleDesign.Feature,
					theme: ArticlePillar.News,
				}}
				standfirst="This is how Feature standfirst text looks. Aut explicabo officia delectus omnis repellendus voluptas <ul><li><a href=\'https://www.theguardian.com/uk'>Bullet 1</a></li><li><a href=\'https://www.theguardian.com/uk'>Bullet 2</a></li></ul>"
			/>
		</Section>
	);
};
Feature.story = { name: 'Feature' };

export const Immersive = () => {
	return (
		<Section fullWidth={true}>
			<Standfirst
				format={{
					display: ArticleDisplay.Immersive,
					design: ArticleDesign.Standard,
					theme: ArticlePillar.News,
				}}
				standfirst="This is how Immersive standfirst text looks. Aut explicabo officia delectus omnis repellendus voluptas <ul><li><a href=\'https://www.theguardian.com/uk'>Bullet 1</a></li><li><a href=\'https://www.theguardian.com/uk'>Bullet 2</a></li></ul>"
			/>
		</Section>
	);
};
Immersive.story = { name: 'Immersive' };

export const Review = () => {
	return (
		<Section fullWidth={true}>
			<Standfirst
				format={{
					display: ArticleDisplay.Standard,
					design: ArticleDesign.Review,
					theme: ArticlePillar.News,
				}}
				standfirst="This is how Review standfirst text looks. Aut explicabo officia delectus omnis repellendus voluptas <ul><li><a href=\'https://www.theguardian.com/uk'>Bullet 1</a></li><li><a href=\'https://www.theguardian.com/uk'>Bullet 2</a></li></ul>"
			/>
		</Section>
	);
};
Review.story = { name: 'Review' };

export const LiveBlog = () => {
	return (
		<Section fullWidth={true}>
			<Standfirst
				format={{
					display: ArticleDisplay.Standard,
					design: ArticleDesign.LiveBlog,
					theme: ArticlePillar.News,
				}}
				standfirst="<p>This is how a Liveblog with bullets looks. Aut explicabo officia delectus omnis repellendus voluptas</p> <ul><li><a href=\'https://www.theguardian.com/uk'>Bullet 1</a></li><li><a href=\'https://www.theguardian.com/uk'>Bullet 2</a></li></ul>"
			/>
		</Section>
	);
};
LiveBlog.story = {
	name: 'LiveBlog',
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
					theme: ArticlePillar.News,
				}}
				standfirst="<p>This is how a Deadblog with bullets looks. Aut explicabo officia delectus omnis repellendus voluptas</p> <ul><li><a href=\'https://www.theguardian.com/uk'>Bullet 1</a></li><li><a href=\'https://www.theguardian.com/uk'>Bullet 2</a></li></ul>"
			/>
		</Section>
	);
};
DeadBlog.story = { name: 'DeadBlog' };

export const Interview = () => {
	return (
		<Section fullWidth={true}>
			<Standfirst
				format={{
					display: ArticleDisplay.Standard,
					design: ArticleDesign.Interview,
					theme: ArticlePillar.News,
				}}
				standfirst="This is how Interview standfirst text looks. Aut explicabo officia delectus omnis repellendus voluptas <ul><li><a href=\'https://www.theguardian.com/uk'>Bullet 1</a></li><li><a href=\'https://www.theguardian.com/uk'>Bullet 2</a></li></ul>"
			/>
		</Section>
	);
};
Interview.story = { name: 'Interview' };

export const Analysis = () => {
	return (
		<Section fullWidth={true}>
			<Standfirst
				format={{
					display: ArticleDisplay.Standard,
					design: ArticleDesign.Analysis,
					theme: ArticlePillar.News,
				}}
				standfirst="This is how Analysis standfirst text looks. Aut explicabo officia delectus omnis repellendus voluptas <ul><li><a href=\'https://www.theguardian.com/uk'>Bullet 1</a></li><li><a href=\'https://www.theguardian.com/uk'>Bullet 2</a></li></ul>"
			/>
		</Section>
	);
};
Analysis.story = { name: 'Analysis' };

export const Explainer = () => {
	return (
		<Section fullWidth={true}>
			<Standfirst
				format={{
					display: ArticleDisplay.Standard,
					design: ArticleDesign.Explainer,
					theme: ArticlePillar.News,
				}}
				standfirst="This is how Explainer standfirst text looks. Aut explicabo officia delectus omnis repellendus voluptas <ul><li><a href=\'https://www.theguardian.com/uk'>Bullet 1</a></li><li><a href=\'https://www.theguardian.com/uk'>Bullet 2</a></li></ul>"
			/>
		</Section>
	);
};
Explainer.story = { name: 'Explainer' };

export const Gallery = () => {
	return (
		<Section fullWidth={true}>
			<Standfirst
				format={{
					display: ArticleDisplay.Standard,
					design: ArticleDesign.Gallery,
					theme: ArticlePillar.Culture,
				}}
				standfirst="This is how Gallery standfirst text looks. Aut explicabo officia delectus omnis repellendus voluptas <ul><li><a href=\'https://www.theguardian.com/uk'>Bullet 1</a></li><li><a href=\'https://www.theguardian.com/uk'>Bullet 2</a></li></ul>"
			/>
		</Section>
	);
};
Gallery.story = { name: 'Gallery' };

export const Audio = () => {
	return (
		<Section fullWidth={true}>
			<Standfirst
				format={{
					display: ArticleDisplay.Standard,
					design: ArticleDesign.Audio,
					theme: ArticlePillar.Culture,
				}}
				standfirst="This is how Audio standfirst text looks. Aut explicabo officia delectus omnis repellendus voluptas <ul><li><a href=\'https://www.theguardian.com/uk'>Bullet 1</a></li><li><a href=\'https://www.theguardian.com/uk'>Bullet 2</a></li></ul>"
			/>
		</Section>
	);
};
Audio.story = { name: 'Audio' };

export const Video = () => {
	return (
		<Section fullWidth={true}>
			<Standfirst
				format={{
					display: ArticleDisplay.Standard,
					design: ArticleDesign.Video,
					theme: ArticlePillar.Culture,
				}}
				standfirst="This is how Video standfirst text looks. Aut explicabo officia delectus omnis repellendus voluptas <ul><li><a href=\'https://www.theguardian.com/uk'>Bullet 1</a></li><li><a href=\'https://www.theguardian.com/uk'>Bullet 2</a></li></ul>"
			/>
		</Section>
	);
};
Video.story = { name: 'Video' };

export const Recipe = () => {
	return (
		<Section fullWidth={true}>
			<Standfirst
				format={{
					display: ArticleDisplay.Standard,
					design: ArticleDesign.Recipe,
					theme: ArticlePillar.Lifestyle,
				}}
				standfirst="This is how Recipe standfirst text looks. Aut explicabo officia delectus omnis repellendus voluptas <ul><li><a href=\'https://www.theguardian.com/uk'>Bullet 1</a></li><li><a href=\'https://www.theguardian.com/uk'>Bullet 2</a></li></ul>"
			/>
		</Section>
	);
};
Recipe.story = { name: 'Recipe' };

export const MatchReport = () => {
	return (
		<Section fullWidth={true}>
			<Standfirst
				format={{
					display: ArticleDisplay.Standard,
					design: ArticleDesign.MatchReport,
					theme: ArticlePillar.Sport,
				}}
				standfirst="This is how MatchReport standfirst text looks. Aut explicabo officia delectus omnis repellendus voluptas <ul><li><a href=\'https://www.theguardian.com/uk'>Bullet 1</a></li><li><a href=\'https://www.theguardian.com/uk'>Bullet 2</a></li></ul>"
			/>
		</Section>
	);
};
MatchReport.story = { name: 'MatchReport' };

export const Quiz = () => {
	return (
		<Section fullWidth={true}>
			<Standfirst
				format={{
					display: ArticleDisplay.Standard,
					design: ArticleDesign.Quiz,
					theme: ArticlePillar.Lifestyle,
				}}
				standfirst="This is how Quiz standfirst text looks. Aut explicabo officia delectus omnis repellendus voluptas <ul><li><a href=\'https://www.theguardian.com/uk'>Bullet 1</a></li><li><a href=\'https://www.theguardian.com/uk'>Bullet 2</a></li></ul>"
			/>
		</Section>
	);
};
Quiz.story = { name: 'Quiz' };

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
SpecialReport.story = { name: 'SpecialReport' };

export const Editorial = () => {
	return (
		<Section fullWidth={true}>
			<Standfirst
				format={{
					display: ArticleDisplay.Standard,
					design: ArticleDesign.Editorial,
					theme: ArticlePillar.Opinion,
				}}
				standfirst="This is how Editorial standfirst text looks. Aut explicabo officia delectus omnis repellendus voluptas <ul><li><a href=\'https://www.theguardian.com/uk'>Bullet 1</a></li><li><a href=\'https://www.theguardian.com/uk'>Bullet 2</a></li></ul>"
			/>
		</Section>
	);
};
Editorial.story = { name: 'Editorial' };

export const PhotoEssay = () => {
	return (
		<Section fullWidth={true}>
			<Standfirst
				format={{
					display: ArticleDisplay.Standard,
					design: ArticleDesign.PhotoEssay,
					theme: ArticlePillar.News,
				}}
				standfirst="This is how PhotoEssay standfirst text looks. Aut explicabo officia delectus omnis repellendus voluptas <ul><li><a href=\'https://www.theguardian.com/uk'>Bullet 1</a></li><li><a href=\'https://www.theguardian.com/uk'>Bullet 2</a></li></ul>"
			/>
		</Section>
	);
};
PhotoEssay.story = { name: 'PhotoEssay' };

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
LabsWithLink.story = { name: 'LabsWithLink' };
