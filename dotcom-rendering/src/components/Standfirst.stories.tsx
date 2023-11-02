import {
	ArticleDesign,
	ArticleDisplay,
	ArticleSpecial,
	Pillar,
} from '@guardian/libs';
import { palette as sourcePalette } from '@guardian/source-foundations';
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
export const Article = () => {
	return (
		<Section fullWidth={true}>
			<Standfirst
				format={articleFormat}
				standfirst="This is how Article standfirst text looks. Aut explicabo officia delectus omnis repellendus voluptas <ul><li><a href=\'https://www.theguardian.com/uk'>Bullet 1</a></li><li><a href=\'https://www.theguardian.com/uk'>Bullet 2</a></li></ul>"
			/>
		</Section>
	);
};
Article.storyName = 'Article';
Article.decorators = [splitTheme(articleFormat)];

const commentFormat = {
	display: ArticleDisplay.Standard,
	design: ArticleDesign.Comment,
	theme: Pillar.News,
};
export const Comment = () => {
	return (
		<Section fullWidth={true}>
			<Standfirst
				format={commentFormat}
				standfirst="This is how Comment standfirst text looks. Aut explicabo officia delectus omnis repellendus voluptas <ul><li><a href=\'https://www.theguardian.com/uk'>Bullet 1</a></li><li><a href=\'https://www.theguardian.com/uk'>Bullet 2</a></li></ul>"
			/>
		</Section>
	);
};
Comment.storyName = 'Comment';
Comment.decorators = [splitTheme(commentFormat)];

const letterFormat = {
	display: ArticleDisplay.Standard,
	design: ArticleDesign.Letter,
	theme: Pillar.News,
};
export const Letter = () => {
	return (
		<Section fullWidth={true}>
			<Standfirst
				format={letterFormat}
				standfirst="This is how Letter standfirst text looks. Aut explicabo officia delectus omnis repellendus voluptas <ul><li><a href=\'https://www.theguardian.com/uk'>Bullet 1</a></li><li><a href=\'https://www.theguardian.com/uk'>Bullet 2</a></li></ul>"
			/>
		</Section>
	);
};
Letter.storyName = 'Letter';
Letter.decorators = [splitTheme(letterFormat)];

const featureFormat = {
	display: ArticleDisplay.Standard,
	design: ArticleDesign.Feature,
	theme: Pillar.News,
};
export const Feature = () => {
	return (
		<Section fullWidth={true}>
			<Standfirst
				format={featureFormat}
				standfirst="This is how Feature standfirst text looks. Aut explicabo officia delectus omnis repellendus voluptas <ul><li><a href=\'https://www.theguardian.com/uk'>Bullet 1</a></li><li><a href=\'https://www.theguardian.com/uk'>Bullet 2</a></li></ul>"
			/>
		</Section>
	);
};
Feature.storyName = 'Feature';
Feature.decorators = [splitTheme(featureFormat)];

const immersiveFormat = {
	display: ArticleDisplay.Immersive,
	design: ArticleDesign.Standard,
	theme: Pillar.News,
};
export const Immersive = () => {
	return (
		<Section fullWidth={true}>
			<Standfirst
				format={immersiveFormat}
				standfirst="This is how Immersive standfirst text looks. Aut explicabo officia delectus omnis repellendus voluptas <ul><li><a href=\'https://www.theguardian.com/uk'>Bullet 1</a></li><li><a href=\'https://www.theguardian.com/uk'>Bullet 2</a></li></ul>"
			/>
		</Section>
	);
};
Immersive.storyName = 'Immersive';
Immersive.decorators = [splitTheme(immersiveFormat)];

const reviewFormat = {
	display: ArticleDisplay.Standard,
	design: ArticleDesign.Review,
	theme: Pillar.News,
};
export const Review = () => {
	return (
		<Section fullWidth={true}>
			<Standfirst
				format={reviewFormat}
				standfirst="This is how Review standfirst text looks. Aut explicabo officia delectus omnis repellendus voluptas <ul><li><a href=\'https://www.theguardian.com/uk'>Bullet 1</a></li><li><a href=\'https://www.theguardian.com/uk'>Bullet 2</a></li></ul>"
			/>
		</Section>
	);
};
Review.storyName = 'Review';
Review.decorators = [splitTheme(reviewFormat)];

const liveblogFormat = {
	display: ArticleDisplay.Standard,
	design: ArticleDesign.LiveBlog,
	theme: Pillar.News,
};
export const LiveBlog = () => {
	return (
		<Section fullWidth={true}>
			<Standfirst
				format={liveblogFormat}
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
LiveBlog.decorators = [splitTheme(liveblogFormat)];

const deadblogFormat = {
	display: ArticleDisplay.Standard,
	design: ArticleDesign.DeadBlog,
	theme: Pillar.News,
};
export const DeadBlog = () => {
	return (
		<Section fullWidth={true}>
			<Standfirst
				format={deadblogFormat}
				standfirst="<p>This is how a Deadblog with bullets looks. Aut explicabo officia delectus omnis repellendus voluptas</p> <ul><li><a href=\'https://www.theguardian.com/uk'>Bullet 1</a></li><li><a href=\'https://www.theguardian.com/uk'>Bullet 2</a></li></ul>"
			/>
		</Section>
	);
};
DeadBlog.storyName = 'DeadBlog';
DeadBlog.decorators = [splitTheme(deadblogFormat)];

const interviewFormat = {
	display: ArticleDisplay.Standard,
	design: ArticleDesign.Interview,
	theme: Pillar.News,
};
export const Interview = () => {
	return (
		<Section fullWidth={true}>
			<Standfirst
				format={interviewFormat}
				standfirst="This is how Interview standfirst text looks. Aut explicabo officia delectus omnis repellendus voluptas <ul><li><a href=\'https://www.theguardian.com/uk'>Bullet 1</a></li><li><a href=\'https://www.theguardian.com/uk'>Bullet 2</a></li></ul>"
			/>
		</Section>
	);
};
Interview.storyName = 'Interview';
Interview.decorators = [splitTheme(interviewFormat)];

const analysisFormat = {
	display: ArticleDisplay.Standard,
	design: ArticleDesign.Analysis,
	theme: Pillar.News,
};
export const Analysis = () => {
	return (
		<Section fullWidth={true}>
			<Standfirst
				format={analysisFormat}
				standfirst="This is how Analysis standfirst text looks. Aut explicabo officia delectus omnis repellendus voluptas <ul><li><a href=\'https://www.theguardian.com/uk'>Bullet 1</a></li><li><a href=\'https://www.theguardian.com/uk'>Bullet 2</a></li></ul>"
			/>
		</Section>
	);
};
Analysis.storyName = 'Analysis';
Analysis.decorators = [splitTheme(analysisFormat)];

const ExplainerFormat = {
	display: ArticleDisplay.Standard,
	design: ArticleDesign.Explainer,
	theme: Pillar.News,
};
export const Explainer = () => {
	return (
		<Section fullWidth={true}>
			<Standfirst
				format={ExplainerFormat}
				standfirst="This is how Explainer standfirst text looks. Aut explicabo officia delectus omnis repellendus voluptas <ul><li><a href=\'https://www.theguardian.com/uk'>Bullet 1</a></li><li><a href=\'https://www.theguardian.com/uk'>Bullet 2</a></li></ul>"
			/>
		</Section>
	);
};
Explainer.storyName = 'Explainer';
Explainer.decorators = [splitTheme(ExplainerFormat)];

const GalleryFormat = {
	display: ArticleDisplay.Standard,
	design: ArticleDesign.Gallery,
	theme: Pillar.Culture,
};
export const Gallery = () => {
	return (
		<Section fullWidth={true}>
			<Standfirst
				format={GalleryFormat}
				standfirst="This is how Gallery standfirst text looks. Aut explicabo officia delectus omnis repellendus voluptas <ul><li><a href=\'https://www.theguardian.com/uk'>Bullet 1</a></li><li><a href=\'https://www.theguardian.com/uk'>Bullet 2</a></li></ul>"
			/>
		</Section>
	);
};
Gallery.storyName = 'Gallery';
Gallery.decorators = [splitTheme(GalleryFormat)];

const audioFormat = {
	display: ArticleDisplay.Standard,
	design: ArticleDesign.Audio,
	theme: Pillar.Culture,
};
export const Audio = () => {
	return (
		<Section fullWidth={true}>
			<Standfirst
				format={audioFormat}
				standfirst="This is how Audio standfirst text looks. Aut explicabo officia delectus omnis repellendus voluptas <ul><li><a href=\'https://www.theguardian.com/uk'>Bullet 1</a></li><li><a href=\'https://www.theguardian.com/uk'>Bullet 2</a></li></ul>"
			/>
		</Section>
	);
};
Audio.storyName = 'Audio';
Audio.decorators = [splitTheme(audioFormat)];

const videoFormat = {
	display: ArticleDisplay.Standard,
	design: ArticleDesign.Video,
	theme: Pillar.Culture,
};
export const Video = () => {
	return (
		<Section fullWidth={true}>
			<Standfirst
				format={videoFormat}
				standfirst="This is how Video standfirst text looks. Aut explicabo officia delectus omnis repellendus voluptas <ul><li><a href=\'https://www.theguardian.com/uk'>Bullet 1</a></li><li><a href=\'https://www.theguardian.com/uk'>Bullet 2</a></li></ul>"
			/>
		</Section>
	);
};
Video.storyName = 'Video';
Video.decorators = [splitTheme(videoFormat)];

const recipeFormat = {
	display: ArticleDisplay.Standard,
	design: ArticleDesign.Recipe,
	theme: Pillar.Lifestyle,
};
export const Recipe = () => {
	return (
		<Section fullWidth={true}>
			<Standfirst
				format={recipeFormat}
				standfirst="This is how Recipe standfirst text looks. Aut explicabo officia delectus omnis repellendus voluptas <ul><li><a href=\'https://www.theguardian.com/uk'>Bullet 1</a></li><li><a href=\'https://www.theguardian.com/uk'>Bullet 2</a></li></ul>"
			/>
		</Section>
	);
};
Recipe.storyName = 'Recipe';
Recipe.decorators = [splitTheme(recipeFormat)];

const matchReportFormat = {
	display: ArticleDisplay.Standard,
	design: ArticleDesign.MatchReport,
	theme: Pillar.Sport,
};
export const MatchReport = () => {
	return (
		<Section fullWidth={true}>
			<Standfirst
				format={matchReportFormat}
				standfirst="This is how MatchReport standfirst text looks. Aut explicabo officia delectus omnis repellendus voluptas <ul><li><a href=\'https://www.theguardian.com/uk'>Bullet 1</a></li><li><a href=\'https://www.theguardian.com/uk'>Bullet 2</a></li></ul>"
			/>
		</Section>
	);
};
MatchReport.storyName = 'MatchReport';
MatchReport.decorators = [splitTheme(matchReportFormat)];

const quizFormat = {
	display: ArticleDisplay.Standard,
	design: ArticleDesign.Quiz,
	theme: Pillar.Lifestyle,
};
export const Quiz = () => {
	return (
		<Section fullWidth={true}>
			<Standfirst
				format={quizFormat}
				standfirst="This is how Quiz standfirst text looks. Aut explicabo officia delectus omnis repellendus voluptas <ul><li><a href=\'https://www.theguardian.com/uk'>Bullet 1</a></li><li><a href=\'https://www.theguardian.com/uk'>Bullet 2</a></li></ul>"
			/>
		</Section>
	);
};
Quiz.storyName = 'Quiz';
Quiz.decorators = [splitTheme(quizFormat)];

const specialReport = {
	display: ArticleDisplay.Standard,
	design: ArticleDesign.Standard,
	theme: ArticleSpecial.SpecialReport,
};
export const SpecialReport = () => {
	return (
		<Section fullWidth={true}>
			<Standfirst
				format={specialReport}
				standfirst="This is how SpecialReport standfirst text looks. Aut explicabo officia delectus omnis repellendus voluptas <ul><li><a href=\'https://www.theguardian.com/uk'>Bullet 1</a></li><li><a href=\'https://www.theguardian.com/uk'>Bullet 2</a></li></ul>"
			/>
		</Section>
	);
};
SpecialReport.storyName = 'SpecialReport';
SpecialReport.decorators = [splitTheme(specialReport)];

const SpecialReportAltFormat = {
	display: ArticleDisplay.Standard,
	design: ArticleDesign.Standard,
	theme: ArticleSpecial.SpecialReportAlt,
};
export const SpecialReportAlt = () => {
	return (
		<Section fullWidth={true}>
			<Standfirst
				format={SpecialReportAltFormat}
				standfirst="This is how SpecialReportAlt standfirst text looks. Aut explicabo officia delectus omnis repellendus voluptas <ul><li><a href=\'https://www.theguardian.com/uk'>Bullet 1</a></li><li><a href=\'https://www.theguardian.com/uk'>Bullet 2</a></li></ul>"
			/>
		</Section>
	);
};
SpecialReportAlt.storyName = 'SpecialReportAlt';
SpecialReportAlt.decorators = [splitTheme(SpecialReportAltFormat)];

const editorialFormat = {
	display: ArticleDisplay.Standard,
	design: ArticleDesign.Editorial,
	theme: Pillar.Opinion,
};
export const Editorial = () => {
	return (
		<Section fullWidth={true}>
			<Standfirst
				format={editorialFormat}
				standfirst="This is how Editorial standfirst text looks. Aut explicabo officia delectus omnis repellendus voluptas <ul><li><a href=\'https://www.theguardian.com/uk'>Bullet 1</a></li><li><a href=\'https://www.theguardian.com/uk'>Bullet 2</a></li></ul>"
			/>
		</Section>
	);
};
Editorial.storyName = 'Editorial';
Editorial.decorators = [splitTheme(editorialFormat)];

const photoFormat = {
	display: ArticleDisplay.Standard,
	design: ArticleDesign.PhotoEssay,
	theme: Pillar.News,
};
export const PhotoEssay = () => {
	return (
		<Section fullWidth={true}>
			<Standfirst
				format={photoFormat}
				standfirst="This is how PhotoEssay standfirst text looks. Aut explicabo officia delectus omnis repellendus voluptas <ul><li><a href=\'https://www.theguardian.com/uk'>Bullet 1</a></li><li><a href=\'https://www.theguardian.com/uk'>Bullet 2</a></li></ul>"
			/>
		</Section>
	);
};
PhotoEssay.storyName = 'PhotoEssay';
PhotoEssay.decorators = [splitTheme(photoFormat)];

const labsWithLinkFormat = {
	display: ArticleDisplay.Standard,
	design: ArticleDesign.Standard,
	theme: ArticleSpecial.Labs,
};
export const LabsWithLink = () => {
	return (
		<Section fullWidth={true}>
			<Standfirst
				format={labsWithLinkFormat}
				standfirst='<p>Whether your holiday priorities are sampling gastronomic delights, visiting cultural landmarks, adventuring in the great outdoors or just having an easy time with the kids, this quiz will help you plan your itinerary for Brittany, Normandy and the Atlantic Loire Valley</p> <ul> <li>National restrictions may apply, please consult <a href="https://www.gov.uk/guidance/travel-advice-novel-coronavirus" rel="nofollow">government advice</a> before planning travel</li> </ul>'
			/>
		</Section>
	);
};
LabsWithLink.storyName = 'LabsWithLink';
LabsWithLink.decorators = [splitTheme(labsWithLinkFormat)];
