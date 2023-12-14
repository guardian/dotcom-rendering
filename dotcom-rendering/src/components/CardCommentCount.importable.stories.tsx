import { css } from '@emotion/react';
import { space } from '@guardian/source-foundations';
import { CardCommentCount } from './CardCommentCount.importable';
import { Island } from './Island';

export default {
	component: CardCommentCount,
	title: 'Components/CardCommentCount',
};

const Wrapper = ({ children }: { children: React.ReactNode }) => {
	return (
		<div
			css={css`
				padding: ${space[6]}px;
			`}
		>
			{children}
		</div>
	);
};

export const CommentCountStory = () => {
	return (
		<Wrapper>
			<Island priority="critical">
				<CardCommentCount
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
			<Island priority="critical">
				<CardCommentCount
					discussionApiUrl="https://discussion.theguardian.com/discussion-api"
					discussionId="/p/zemg8"
				/>
			</Island>
		</Wrapper>
	);
};
GalleryStory.storyName = 'Gallery';
