import { css } from '@emotion/react';
import { ArticleDesign, ArticleDisplay, Pillar } from '@guardian/libs';
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
					theme: Pillar.News,
					display: ArticleDisplay.Standard,
				}}
				short="11k"
				long="10,899"
			/>
		</Wrapper>
	);
};
CommentCountStory.storyName = 'default';

export const GalleryStory = () => {
	return (
		<Wrapper>
			<CardCommentCount
				format={{
					design: ArticleDesign.Gallery,
					theme: Pillar.Culture,
					display: ArticleDisplay.Standard,
				}}
				short="11k"
				long="10,899"
			/>
		</Wrapper>
	);
};
GalleryStory.storyName = 'Gallery';
