import { news } from '@guardian/src-foundations';
import { Display, Design, Pillar, Special } from '@guardian/types';
import { Section } from './Section';

import { Standfirst } from './Standfirst';

export default {
	component: Standfirst,
	title: 'Components/Standfirst',
};

export const Article = () => {
	return (
		<Section>
			<Standfirst
				format={{
					display: Display.Standard,
					design: Design.Article,
					theme: Pillar.News,
				}}
				standfirst="This is how Article standfirst text looks. Aut explicabo officia delectus omnis repellendus voluptas"
			/>
		</Section>
	);
};
Article.story = { name: 'Article' };

export const Comment = () => {
	return (
		<Section>
			<Standfirst
				format={{
					display: Display.Standard,
					design: Design.Comment,
					theme: Pillar.News,
				}}
				standfirst="This is how Comment standfirst text looks. Aut explicabo officia delectus omnis repellendus voluptas"
			/>
		</Section>
	);
};
Comment.story = { name: 'Comment' };

export const Feature = () => {
	return (
		<Section>
			<Standfirst
				format={{
					display: Display.Standard,
					design: Design.Feature,
					theme: Pillar.News,
				}}
				standfirst="This is how Feature standfirst text looks. Aut explicabo officia delectus omnis repellendus voluptas"
			/>
		</Section>
	);
};
Feature.story = { name: 'Feature' };

export const Immersive = () => {
	return (
		<Section>
			<Standfirst
				format={{
					display: Display.Immersive,
					design: Design.Article,
					theme: Pillar.News,
				}}
				standfirst="This is how Immersive standfirst text looks. Aut explicabo officia delectus omnis repellendus voluptas"
			/>
		</Section>
	);
};
Immersive.story = { name: 'Immersive' };

export const Review = () => {
	return (
		<Section>
			<Standfirst
				format={{
					display: Display.Standard,
					design: Design.Review,
					theme: Pillar.News,
				}}
				standfirst="This is how Review standfirst text looks. Aut explicabo officia delectus omnis repellendus voluptas"
			/>
		</Section>
	);
};
Review.story = { name: 'Review' };

export const LiveBlog = () => {
	return (
		<Section>
			<Standfirst
				format={{
					display: Display.Standard,
					design: Design.LiveBlog,
					theme: Pillar.News,
				}}
				standfirst="This is how LiveBlog standfirst text looks. Aut explicabo officia delectus omnis repellendus voluptas"
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
		<Section>
			<Standfirst
				format={{
					display: Display.Standard,
					design: Design.DeadBlog,
					theme: Pillar.News,
				}}
				standfirst="This is how DeadBlog standfirst text looks. Aut explicabo officia delectus omnis repellendus voluptas"
			/>
		</Section>
	);
};
DeadBlog.story = { name: 'DeadBlog' };

export const Interview = () => {
	return (
		<Section>
			<Standfirst
				format={{
					display: Display.Standard,
					design: Design.Interview,
					theme: Pillar.News,
				}}
				standfirst="This is how Interview standfirst text looks. Aut explicabo officia delectus omnis repellendus voluptas"
			/>
		</Section>
	);
};
Interview.story = { name: 'Interview' };

export const Analysis = () => {
	return (
		<Section>
			<Standfirst
				format={{
					display: Display.Standard,
					design: Design.Analysis,
					theme: Pillar.News,
				}}
				standfirst="This is how Analysis standfirst text looks. Aut explicabo officia delectus omnis repellendus voluptas"
			/>
		</Section>
	);
};
Analysis.story = { name: 'Analysis' };

export const Media = () => {
	return (
		<Section>
			<Standfirst
				format={{
					display: Display.Standard,
					design: Design.Media,
					theme: Pillar.Culture,
				}}
				standfirst="This is how Media standfirst text looks. Aut explicabo officia delectus omnis repellendus voluptas"
			/>
		</Section>
	);
};
Media.story = { name: 'Media' };

export const Recipe = () => {
	return (
		<Section>
			<Standfirst
				format={{
					display: Display.Standard,
					design: Design.Recipe,
					theme: Pillar.Lifestyle,
				}}
				standfirst="This is how Recipe standfirst text looks. Aut explicabo officia delectus omnis repellendus voluptas"
			/>
		</Section>
	);
};
Recipe.story = { name: 'Recipe' };

export const MatchReport = () => {
	return (
		<Section>
			<Standfirst
				format={{
					display: Display.Standard,
					design: Design.MatchReport,
					theme: Pillar.Sport,
				}}
				standfirst="This is how MatchReport standfirst text looks. Aut explicabo officia delectus omnis repellendus voluptas"
			/>
		</Section>
	);
};
MatchReport.story = { name: 'MatchReport' };

export const Quiz = () => {
	return (
		<Section>
			<Standfirst
				format={{
					display: Display.Standard,
					design: Design.Quiz,
					theme: Pillar.Lifestyle,
				}}
				standfirst="This is how Quiz standfirst text looks. Aut explicabo officia delectus omnis repellendus voluptas"
			/>
		</Section>
	);
};
Quiz.story = { name: 'Quiz' };

export const SpecialReport = () => {
	return (
		<Section>
			<Standfirst
				format={{
					display: Display.Standard,
					design: Design.Article,
					theme: Special.SpecialReport,
				}}
				standfirst="This is how SpecialReport standfirst text looks. Aut explicabo officia delectus omnis repellendus voluptas"
			/>
		</Section>
	);
};
SpecialReport.story = { name: 'SpecialReport' };

export const Editorial = () => {
	return (
		<Section>
			<Standfirst
				format={{
					display: Display.Standard,
					design: Design.Editorial,
					theme: Pillar.Opinion,
				}}
				standfirst="This is how Editorial standfirst text looks. Aut explicabo officia delectus omnis repellendus voluptas"
			/>
		</Section>
	);
};
Editorial.story = { name: 'Editorial' };

export const PhotoEssay = () => {
	return (
		<Section>
			<Standfirst
				format={{
					display: Display.Standard,
					design: Design.PhotoEssay,
					theme: Pillar.News,
				}}
				standfirst="This is how PhotoEssay standfirst text looks. Aut explicabo officia delectus omnis repellendus voluptas"
			/>
		</Section>
	);
};
PhotoEssay.story = { name: 'PhotoEssay' };
