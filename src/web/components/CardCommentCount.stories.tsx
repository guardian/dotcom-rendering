import React from 'react';
import { css } from 'emotion';

import { CardCommentCount } from './CardCommentCount';

export default {
	component: CardCommentCount,
	title: 'Components/CardCommentCount',
};

const Container = ({ children }: { children: JSXElements }) => (
	<div
		className={css`
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
				designType="Article"
				pillar="news"
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
				designType="Media"
				pillar="culture"
				short="11k"
				long="10,899"
			/>
		</Container>
	);
};
MediaStory.story = { name: 'Media' };
