import React from 'react';

import { Display, Design } from '@guardian/types';
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
				display={Display.Standard}
				design={Design.Article}
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
				display={Display.Standard}
				design={Design.Comment}
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
				display={Display.Standard}
				design={Design.Feature}
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
				display={Display.Immersive}
				design={Design.Article}
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
				display={Display.Standard}
				design={Design.Review}
				standfirst="This is how Review standfirst text looks. Aut explicabo officia delectus omnis repellendus voluptas"
			/>
		</Section>
	);
};
Review.story = { name: 'Review' };

export const Live = () => {
	return (
		<Section>
			<Standfirst
				display={Display.Standard}
				design={Design.LiveBlog}
				standfirst="This is how Live standfirst text looks. Aut explicabo officia delectus omnis repellendus voluptas"
			/>
		</Section>
	);
};
Live.story = { name: 'Live' };

export const Interview = () => {
	return (
		<Section>
			<Standfirst
				display={Display.Standard}
				design={Design.Interview}
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
				display={Display.Standard}
				design={Design.Analysis}
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
				display={Display.Standard}
				design={Design.Media}
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
				display={Display.Standard}
				design={Design.Recipe}
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
				display={Display.Standard}
				design={Design.MatchReport}
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
				display={Display.Standard}
				design={Design.Quiz}
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
				display={Display.Standard}
				design={Design.Article}
				standfirst="This is how SpecialReport standfirst text looks. Aut explicabo officia delectus omnis repellendus voluptas"
			/>
		</Section>
	);
};
SpecialReport.story = { name: 'SpecialReport' };

export const GuardianView = () => {
	return (
		<Section>
			<Standfirst
				display={Display.Standard}
				design={Design.Editorial}
				standfirst="This is how GuardianView standfirst text looks. Aut explicabo officia delectus omnis repellendus voluptas"
			/>
		</Section>
	);
};
GuardianView.story = { name: 'GuardianView' };

export const PhotoEssay = () => {
	return (
		<Section>
			<Standfirst
				display={Display.Standard}
				design={Design.PhotoEssay}
				standfirst="This is how PhotoEssay standfirst text looks. Aut explicabo officia delectus omnis repellendus voluptas"
			/>
		</Section>
	);
};
PhotoEssay.story = { name: 'PhotoEssay' };
