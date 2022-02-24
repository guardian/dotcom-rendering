// ----- Imports ----- //
import type { ArticleFormat } from '@guardian/libs';
import { ArticleDisplay } from '@guardian/libs';
import { breakpoints } from '@guardian/source-foundations';
import type { Option } from '@guardian/types';
import { OptionKind, partition, some } from '@guardian/types';
import Comment from 'components/layout/comment';
import Standard from 'components/layout/standard';
import {
	analysis,
	article,
	comment,
	editorial,
	letter,
	matchReport,
	review,
} from 'fixtures/item';
import { deadBlog, live } from 'fixtures/live';
import type { Item } from 'item';
import type { ReactElement } from 'react';
import { renderAll } from 'renderer';
import Live from './live';

// ----- Functions ----- //

const formatFromItem = (
	item: Item,
	forceDisplay: Option<ArticleDisplay>,
): ArticleFormat => ({
	theme: item.theme,
	design: item.design,
	display:
		forceDisplay.kind === OptionKind.Some
			? forceDisplay.value
			: item.display,
});

// ----- Stories ----- //

export const Article = (): React.ReactNode => {
	return (
		<Standard item={article}>
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
		<Standard item={review}>
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
		<Standard item={matchReport}>
			{renderAll(
				formatFromItem(matchReport, some(ArticleDisplay.Standard)),
				partition(matchReport.body).oks,
			)}
		</Standard>
	);
};
MatchReport.story = { name: 'Match Report' };

export const CommentItem = (): React.ReactNode => {
	return (
		<Comment item={comment}>
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
		<Comment item={letter}>
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
		<Comment item={editorial}>
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
		<Standard item={analysis}>
			{renderAll(
				formatFromItem(analysis, some(ArticleDisplay.Standard)),
				partition(analysis.body).oks,
			)}
		</Standard>
	);
};
Analysis.story = { name: 'Analysis' };

export const LiveBlog = (): ReactElement => (
	<Live item={{ ...live, display: ArticleDisplay.Standard }} />
);
LiveBlog.story = { name: 'LiveBlog ' };

export const DeadBlog = (): ReactElement => (
	<Live item={{ ...deadBlog, display: ArticleDisplay.Standard }} />
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
