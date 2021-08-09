import { news } from '@guardian/src-foundations';
import { Display, Design, Pillar, Special } from '@guardian/types';
import { ElementContainer } from './ElementContainer';

import { Standfirst } from './Standfirst';

export default {
	component: Standfirst,
	title: 'Components/Standfirst',
};

export const Article = () => {
	return (
		<ElementContainer>
			<Standfirst
				format={{
					display: Display.Standard,
					design: Design.Article,
					theme: Pillar.News,
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
					display: Display.Standard,
					design: Design.Comment,
					theme: Pillar.News,
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
					display: Display.Standard,
					design: Design.Feature,
					theme: Pillar.News,
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
					display: Display.Immersive,
					design: Design.Article,
					theme: Pillar.News,
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
					display: Display.Standard,
					design: Design.Review,
					theme: Pillar.News,
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
					display: Display.Standard,
					design: Design.LiveBlog,
					theme: Pillar.News,
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
					display: Display.Standard,
					design: Design.DeadBlog,
					theme: Pillar.News,
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
					display: Display.Standard,
					design: Design.Interview,
					theme: Pillar.News,
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
					display: Display.Standard,
					design: Design.Analysis,
					theme: Pillar.News,
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
					display: Display.Standard,
					design: Design.Media,
					theme: Pillar.Culture,
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
					display: Display.Standard,
					design: Design.Recipe,
					theme: Pillar.Lifestyle,
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
					display: Display.Standard,
					design: Design.MatchReport,
					theme: Pillar.Sport,
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
					display: Display.Standard,
					design: Design.Quiz,
					theme: Pillar.Lifestyle,
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
					display: Display.Standard,
					design: Design.Article,
					theme: Special.SpecialReport,
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
					display: Display.Standard,
					design: Design.Editorial,
					theme: Pillar.Opinion,
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
					display: Display.Standard,
					design: Design.PhotoEssay,
					theme: Pillar.News,
				}}
				standfirst="This is how PhotoEssay standfirst text looks. Aut explicabo officia delectus omnis repellendus voluptas"
			/>
		</ElementContainer>
	);
};
PhotoEssay.story = { name: 'PhotoEssay' };
