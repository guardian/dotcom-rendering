import { breakpoints, news } from '@guardian/src-foundations';
import {
	ArticleDisplay,
	ArticleDesign,
	ArticlePillar,
	ArticleSpecial,
} from '@guardian/libs';
import { ElementContainer } from './ElementContainer';

import { Standfirst } from './Standfirst';

export default {
	component: Standfirst,
	title: 'Components/Standfirst',
	chromatic: { viewports : [breakpoints.tablet, breakpoints.wide] }
};

export const Article = () => {
	return (
		<ElementContainer>
			<Standfirst
				format={{
					display: ArticleDisplay.Standard,
					design: ArticleDesign.Standard,
					theme: ArticlePillar.News,
				}}
				standfirst="This is how Article standfirst text looks. Aut explicabo officia delectus omnis repellendus voluptas"
			/>
		</ElementContainer>
	);
};
Article.story = { name: 'Article' };

export const Comment = () => {
	return (
		<ElementContainer>
			<Standfirst
				format={{
					display: ArticleDisplay.Standard,
					design: ArticleDesign.Comment,
					theme: ArticlePillar.News,
				}}
				standfirst="This is how Comment standfirst text looks. Aut explicabo officia delectus omnis repellendus voluptas"
			/>
		</ElementContainer>
	);
};
Comment.story = { name: 'Comment' };

export const Feature = () => {
	return (
		<ElementContainer>
			<Standfirst
				format={{
					display: ArticleDisplay.Standard,
					design: ArticleDesign.Feature,
					theme: ArticlePillar.News,
				}}
				standfirst="This is how Feature standfirst text looks. Aut explicabo officia delectus omnis repellendus voluptas"
			/>
		</ElementContainer>
	);
};
Feature.story = { name: 'Feature' };

export const Immersive = () => {
	return (
		<ElementContainer>
			<Standfirst
				format={{
					display: ArticleDisplay.Immersive,
					design: ArticleDesign.Standard,
					theme: ArticlePillar.News,
				}}
				standfirst="This is how Immersive standfirst text looks. Aut explicabo officia delectus omnis repellendus voluptas"
			/>
		</ElementContainer>
	);
};
Immersive.story = { name: 'Immersive' };

export const Review = () => {
	return (
		<ElementContainer>
			<Standfirst
				format={{
					display: ArticleDisplay.Standard,
					design: ArticleDesign.Review,
					theme: ArticlePillar.News,
				}}
				standfirst="This is how Review standfirst text looks. Aut explicabo officia delectus omnis repellendus voluptas"
			/>
		</ElementContainer>
	);
};
Review.story = { name: 'Review' };

export const LiveBlog = () => {
	return (
		<ElementContainer>
			<Standfirst
				format={{
					display: ArticleDisplay.Standard,
					design: ArticleDesign.LiveBlog,
					theme: ArticlePillar.News,
				}}
				standfirst="This is how LiveBlog standfirst text looks. Aut explicabo officia delectus omnis repellendus voluptas"
			/>
		</ElementContainer>
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
		<ElementContainer>
			<Standfirst
				format={{
					display: ArticleDisplay.Standard,
					design: ArticleDesign.DeadBlog,
					theme: ArticlePillar.News,
				}}
				standfirst="This is how DeadBlog standfirst text looks. Aut explicabo officia delectus omnis repellendus voluptas"
			/>
		</ElementContainer>
	);
};
DeadBlog.story = { name: 'DeadBlog' };

export const Interview = () => {
	return (
		<ElementContainer>
			<Standfirst
				format={{
					display: ArticleDisplay.Standard,
					design: ArticleDesign.Interview,
					theme: ArticlePillar.News,
				}}
				standfirst="This is how Interview standfirst text looks. Aut explicabo officia delectus omnis repellendus voluptas"
			/>
		</ElementContainer>
	);
};
Interview.story = { name: 'Interview' };

export const Analysis = () => {
	return (
		<ElementContainer>
			<Standfirst
				format={{
					display: ArticleDisplay.Standard,
					design: ArticleDesign.Analysis,
					theme: ArticlePillar.News,
				}}
				standfirst="This is how Analysis standfirst text looks. Aut explicabo officia delectus omnis repellendus voluptas"
			/>
		</ElementContainer>
	);
};
Analysis.story = { name: 'Analysis' };

export const Media = () => {
	return (
		<ElementContainer>
			<Standfirst
				format={{
					display: ArticleDisplay.Standard,
					design: ArticleDesign.Media,
					theme: ArticlePillar.Culture,
				}}
				standfirst="This is how Media standfirst text looks. Aut explicabo officia delectus omnis repellendus voluptas"
			/>
		</ElementContainer>
	);
};
Media.story = { name: 'Media' };

export const Recipe = () => {
	return (
		<ElementContainer>
			<Standfirst
				format={{
					display: ArticleDisplay.Standard,
					design: ArticleDesign.Recipe,
					theme: ArticlePillar.Lifestyle,
				}}
				standfirst="This is how Recipe standfirst text looks. Aut explicabo officia delectus omnis repellendus voluptas"
			/>
		</ElementContainer>
	);
};
Recipe.story = { name: 'Recipe' };

export const MatchReport = () => {
	return (
		<ElementContainer>
			<Standfirst
				format={{
					display: ArticleDisplay.Standard,
					design: ArticleDesign.MatchReport,
					theme: ArticlePillar.Sport,
				}}
				standfirst="This is how MatchReport standfirst text looks. Aut explicabo officia delectus omnis repellendus voluptas"
			/>
		</ElementContainer>
	);
};
MatchReport.story = { name: 'MatchReport' };

export const Quiz = () => {
	return (
		<ElementContainer>
			<Standfirst
				format={{
					display: ArticleDisplay.Standard,
					design: ArticleDesign.Quiz,
					theme: ArticlePillar.Lifestyle,
				}}
				standfirst="This is how Quiz standfirst text looks. Aut explicabo officia delectus omnis repellendus voluptas"
			/>
		</ElementContainer>
	);
};
Quiz.story = { name: 'Quiz' };

export const SpecialReport = () => {
	return (
		<ElementContainer>
			<Standfirst
				format={{
					display: ArticleDisplay.Standard,
					design: ArticleDesign.Standard,
					theme: ArticleSpecial.SpecialReport,
				}}
				standfirst="This is how SpecialReport standfirst text looks. Aut explicabo officia delectus omnis repellendus voluptas"
			/>
		</ElementContainer>
	);
};
SpecialReport.story = { name: 'SpecialReport' };

export const Editorial = () => {
	return (
		<ElementContainer>
			<Standfirst
				format={{
					display: ArticleDisplay.Standard,
					design: ArticleDesign.Editorial,
					theme: ArticlePillar.Opinion,
				}}
				standfirst="This is how Editorial standfirst text looks. Aut explicabo officia delectus omnis repellendus voluptas"
			/>
		</ElementContainer>
	);
};
Editorial.story = { name: 'Editorial' };

export const PhotoEssay = () => {
	return (
		<ElementContainer>
			<Standfirst
				format={{
					display: ArticleDisplay.Standard,
					design: ArticleDesign.PhotoEssay,
					theme: ArticlePillar.News,
				}}
				standfirst="This is how PhotoEssay standfirst text looks. Aut explicabo officia delectus omnis repellendus voluptas"
			/>
		</ElementContainer>
	);
};
PhotoEssay.story = { name: 'PhotoEssay' };

export const LabsWithLink = () => {
	return (
		<ElementContainer>
			<Standfirst
				format={{
					display: ArticleDisplay.Standard,
					design: ArticleDesign.Standard,
					theme: ArticleSpecial.Labs,
				}}
				standfirst='<p>Whether your holiday priorities are sampling gastronomic delights, visiting cultural landmarks, adventuring in the great outdoors or just having an easy time with the kids, this quiz will help you plan your itinerary for Brittany, Normandy and the Atlantic Loire Valley</p> <ul> <li>National restrictions may apply, please consult <a href="https://www.gov.uk/guidance/travel-advice-novel-coronavirus" rel="nofollow">government advice</a> before planning travel</li> </ul>'
			/>
		</ElementContainer>
	);
};
LabsWithLink.story = { name: 'LabsWithLink' };
