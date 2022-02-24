// ----- Imports ----- //
import { ArticleDesign, ArticleDisplay, ArticlePillar } from '@guardian/libs';
import { breakpoints } from '@guardian/source-foundations';
import { partition } from '@guardian/types';
import Comment from 'components/layout/comment';
import { comment, editorial, letter } from 'fixtures/item';
import { renderAll } from 'renderer';

// ----- Stories ----- //

export const CommentItem = (): React.ReactNode => {
	return (
		<Comment item={comment}>
			{renderAll(
				{
					theme: comment.theme,
					design: comment.design,
					display: comment.display,
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
					theme: letter.theme,
					design: letter.design,
					display: letter.display,
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
					theme: editorial.theme,
					design: editorial.design,
					display: editorial.display,
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
