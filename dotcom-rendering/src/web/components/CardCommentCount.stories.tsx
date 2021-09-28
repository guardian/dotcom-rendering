import { css } from '@emotion/react';

import { ArticleDesign, ArticlePillar, ArticleDisplay } from '@guardian/libs';

import { CardCommentCount } from './CardCommentCount';
import { decidePalette } from '../lib/decidePalette';

export default {
	component: CardCommentCount,
	title: 'Components/CardCommentCount',
};

const Container = ({ children }: { children: React.ReactNode }) => (
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
		<Container>
			<CardCommentCount
				palette={decidePalette({
					design: ArticleDesign.Standard,
					theme: ArticlePillar.News,
					display: ArticleDisplay.Standard,
				})}
				short="11k"
				long="10,899"
			/>
		</Container>
	);
};
CommentCountStory.story = { name: 'default' };

export const MediaStory = () => {
	return (
		<Container>
			<CardCommentCount
				palette={decidePalette({
					design: ArticleDesign.Media,
					theme: ArticlePillar.Culture,
					display: ArticleDisplay.Standard,
				})}
				short="11k"
				long="10,899"
			/>
		</Container>
	);
};
MediaStory.story = { name: 'Media' };
