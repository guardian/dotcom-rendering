// ----- Imports ----- //
import { ArticleDesign, ArticleDisplay, ArticlePillar } from '@guardian/libs';
import { breakpoints } from '@guardian/source-foundations';
import { partition } from '@guardian/types';
import Comment from 'components/layout/comment';
import { comment, editorial, letter } from 'fixtures/item';
import { renderAll } from 'renderer';

// ----- Stories ----- //

const display = ArticleDisplay.Standard;

export const CommentItem = (): React.ReactNode => {
	return (
		<Comment item={comment}>
			{renderAll(
				{
					theme: ArticlePillar.Opinion,
					design: ArticleDesign.Comment,
					display,
				},
				partition(comment.body).oks,
			)}
		</Comment>
	);
};
CommentItem.story = { name: 'Comment Item' };

export const Letter = (): React.ReactNode => {
	return (
		<Comment item={letter}>
			{renderAll(
				{
					theme: ArticlePillar.Opinion,
					design: ArticleDesign.Letter,
					display,
				},
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
				{
					theme: ArticlePillar.Opinion,
					design: ArticleDesign.Editorial,
					display,
				},
				partition(editorial.body).oks,
			)}
		</Comment>
	);
};
Editorial.story = { name: 'Editorial' };

export default {
	title: 'AR/Layouts/Comment',
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
