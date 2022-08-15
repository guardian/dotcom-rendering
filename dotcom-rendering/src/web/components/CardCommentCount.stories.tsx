import { css } from '@emotion/react';
import { ArticleDesign, ArticleDisplay, ArticlePillar } from '@guardian/libs';
import { CardCommentCount } from './CardCommentCount';

export default {
	component: CardCommentCount,
	title: 'Components/CardCommentCount',
};

const Wrapper = ({ children }: { children: React.ReactNode }) => (
	<div
		css={css`
			margin: 40px;
		`}
	>
		{children}
	</div>
);

export const CommentCountStory = () => {
	return (
		<Wrapper>
			<CardCommentCount
				format={{
					design: ArticleDesign.Standard,
					theme: ArticlePillar.News,
					display: ArticleDisplay.Standard,
				}}
				short="11k"
				long="10,899"
			/>
		</Wrapper>
	);
};
CommentCountStory.story = { name: 'default' };

export const GalleryStory = () => {
	return (
		<Wrapper>
			<CardCommentCount
				format={{
					design: ArticleDesign.Gallery,
					theme: ArticlePillar.Culture,
					display: ArticleDisplay.Standard,
				}}
				short="11k"
				long="10,899"
			/>
		</Wrapper>
	);
};
GalleryStory.story = { name: 'Gallery' };
