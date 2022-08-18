// ----- Imports ----- //
import { Edition } from '@guardian/apps-rendering-api-models/edition';
import type { ArticleFormat } from '@guardian/libs';
import { ArticleDisplay } from '@guardian/libs';
import { breakpoints } from '@guardian/source-foundations';
import type { Option } from '@guardian/types';
import { partition, some, withDefault } from '@guardian/types';
import Comment from 'components/Layout/CommentLayout';
import Standard from 'components/Layout/StandardLayout';
import {
	analysis,
	article,
	comment,
	editorial,
	feature,
	interview,
	letter,
	matchReport,
	photoEssay,
	printShop,
	quiz,
	recipe,
	review,
} from 'fixtures/item';
import { deadBlog, live } from 'fixtures/live';
import type { Item } from 'item';
import type { ReactElement } from 'react';
import { renderAll } from 'renderer';
import Live from './LiveLayout';

// ----- Functions ----- //

const formatFromItem = (
	item: Item,
	forceDisplay: Option<ArticleDisplay>,
): ArticleFormat => ({
	theme: item.theme,
	design: item.design,
	display: withDefault(item.display)(forceDisplay),
});

// ----- Stories ----- //

export const Article = (): React.ReactNode => {
	return (
		<Standard item={article} edition={Edition.UK}>
			{renderAll(
				formatFromItem(article, some(ArticleDisplay.Standard)),
				partition(article.body).oks,
			)}
		</Standard>
	);
};
Article.story = { name: 'Article' };

export const Review = (): React.ReactNode => {
	return (
		<Standard item={review} edition={Edition.UK}>
			{renderAll(
				formatFromItem(review, some(ArticleDisplay.Standard)),
				partition(review.body).oks,
			)}
		</Standard>
	);
};
Review.story = { name: 'Review' };

export const MatchReport = (): React.ReactNode => {
	return (
		<Standard item={matchReport} edition={Edition.UK}>
			{renderAll(
				formatFromItem(matchReport, some(ArticleDisplay.Standard)),
				partition(matchReport.body).oks,
			)}
		</Standard>
	);
};
MatchReport.story = { name: 'Match Report' };

export const PrintShop = (): React.ReactNode => {
	return (
		<Standard item={printShop} edition={Edition.UK}>
			{renderAll(
				formatFromItem(printShop, some(ArticleDisplay.Standard)),
				partition(printShop.body).oks,
			)}
		</Standard>
	);
};
PrintShop.story = { name: 'PrintShop' };

export const PhotoEssay = (): React.ReactNode => {
	return (
		<Standard item={photoEssay} edition={Edition.UK}>
			{renderAll(
				formatFromItem(photoEssay, some(ArticleDisplay.Standard)),
				partition(photoEssay.body).oks,
			)}
		</Standard>
	);
};
PhotoEssay.story = { name: 'Photo Essay' };

export const Feature = (): React.ReactNode => {
	return (
		<Standard item={feature} edition={Edition.UK}>
			{renderAll(
				formatFromItem(feature, some(ArticleDisplay.Standard)),
				partition(feature.body).oks,
			)}
		</Standard>
	);
};
Feature.story = { name: 'Feature' };

export const Interview = (): React.ReactNode => {
	return (
		<Standard item={interview} edition={Edition.UK}>
			{renderAll(
				formatFromItem(interview, some(ArticleDisplay.Standard)),
				partition(interview.body).oks,
			)}
		</Standard>
	);
};
Interview.story = { name: 'Interview' };

export const Quiz = (): React.ReactNode => {
	return (
		<Standard item={quiz} edition={Edition.UK}>
			{renderAll(
				formatFromItem(quiz, some(ArticleDisplay.Standard)),
				partition(quiz.body).oks,
			)}
		</Standard>
	);
};
Quiz.story = { name: 'Quiz' };

export const Recipe = (): React.ReactNode => {
	return (
		<Standard item={recipe} edition={Edition.UK}>
			{renderAll(
				formatFromItem(recipe, some(ArticleDisplay.Standard)),
				partition(recipe.body).oks,
			)}
		</Standard>
	);
};
Recipe.story = { name: 'Recipe' };

export const CommentItem = (): React.ReactNode => {
	return (
		<Comment item={comment} edition={Edition.UK}>
			{renderAll(
				formatFromItem(comment, some(ArticleDisplay.Standard)),
				partition(comment.body).oks,
			)}
		</Comment>
	);
};
CommentItem.story = { name: 'Comment' };

export const Letter = (): React.ReactNode => {
	return (
		<Comment item={letter} edition={Edition.UK}>
			{renderAll(
				formatFromItem(letter, some(ArticleDisplay.Standard)),
				partition(letter.body).oks,
			)}
		</Comment>
	);
};
Letter.story = { name: 'Letter' };

export const Editorial = (): React.ReactNode => {
	return (
		<Comment item={editorial} edition={Edition.UK}>
			{renderAll(
				formatFromItem(editorial, some(ArticleDisplay.Standard)),
				partition(editorial.body).oks,
			)}
		</Comment>
	);
};
Editorial.story = { name: 'Editorial' };

export const Analysis = (): React.ReactNode => {
	return (
		<Standard item={analysis} edition={Edition.UK}>
			{renderAll(
				formatFromItem(analysis, some(ArticleDisplay.Standard)),
				partition(analysis.body).oks,
			)}
		</Standard>
	);
};
Analysis.story = { name: 'Analysis' };

export const LiveBlog = (): ReactElement => (
	<Live
		item={{ ...live, display: ArticleDisplay.Standard }}
		edition={Edition.UK}
	/>
);
LiveBlog.story = { name: 'LiveBlog ' };

export const DeadBlog = (): ReactElement => (
	<Live
		item={{ ...deadBlog, display: ArticleDisplay.Standard }}
		edition={Edition.UK}
	/>
);
DeadBlog.story = { name: 'DeadBlog ' };

export default {
	title: 'AR/Layouts/Standard',
	parameters: {
		layout: 'fullscreen',
		chromatic: {
			diffThreshold: 0.4,
			viewports: [
				breakpoints.mobile,
				breakpoints.phablet,
				breakpoints.tablet,
				breakpoints.wide,
			],
		},
	},
};
