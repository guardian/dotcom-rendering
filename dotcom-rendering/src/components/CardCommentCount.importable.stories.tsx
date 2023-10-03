import { css } from '@emotion/react';
import { ArticleDesign, ArticleDisplay, Pillar } from '@guardian/libs';
import { useEffect } from 'react';
import { doStorybookHydration } from '../client/islands/doStorybookHydration';
import { CardCommentCount } from './CardCommentCount.importable';
import { Island } from './Island';

export default {
	component: CardCommentCount,
	title: 'Components/CardCommentCount',
};

const Wrapper = ({ children }: { children: React.ReactNode }) => {
	useEffect(doStorybookHydration);

	return (
		<div
			css={css`
				margin: 40px;
			`}
		>
			{children}
		</div>
	);
};

export const CommentCountStory = () => {
	return (
		<Wrapper>
			<Island>
				<CardCommentCount
					format={{
						design: ArticleDesign.Standard,
						theme: Pillar.News,
						display: ArticleDisplay.Standard,
					}}
					discussionApiUrl="https://discussion.theguardian.com/discussion-api"
					discussionId="/p/zemg8"
				/>
			</Island>
		</Wrapper>
	);
};
CommentCountStory.storyName = 'default';

export const GalleryStory = () => {
	return (
		<Wrapper>
			<Island>
				<CardCommentCount
					format={{
						design: ArticleDesign.Gallery,
						theme: Pillar.Culture,
						display: ArticleDisplay.Standard,
					}}
					discussionApiUrl="https://discussion.theguardian.com/discussion-api"
					discussionId="/p/zemg8"
				/>
			</Island>
		</Wrapper>
	);
};
GalleryStory.storyName = 'Gallery';
