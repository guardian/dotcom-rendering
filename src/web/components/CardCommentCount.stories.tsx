import React from 'react';
import { css } from 'emotion';

import { Design, Pillar } from '@guardian/types';

import { CardCommentCount } from './CardCommentCount';

export default {
	component: CardCommentCount,
	title: 'Components/CardCommentCount',
};

const Container = ({ children }: { children: React.ReactNode }) => (
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
				design={Design.Article}
				pillar={Pillar.News}
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
				design={Design.Media}
				pillar={Pillar.Culture}
				short="11k"
				long="10,899"
			/>
		</Container>
	);
};
MediaStory.story = { name: 'Media' };
