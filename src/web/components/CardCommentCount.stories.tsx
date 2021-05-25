import { css } from '@emotion/react';

import { Design, Pillar, Display } from '@guardian/types';

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
					design: Design.Article,
					theme: Pillar.News,
					display: Display.Standard,
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
					design: Design.Media,
					theme: Pillar.Culture,
					display: Display.Standard,
				})}
				short="11k"
				long="10,899"
			/>
		</Container>
	);
};
MediaStory.story = { name: 'Media' };
