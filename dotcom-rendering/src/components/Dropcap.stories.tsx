import { css } from '@emotion/react';
import { ArticleDesign, ArticleDisplay, Pillar } from '@guardian/libs';
import { body } from '@guardian/source-foundations';
import { DropCap } from './DropCap';

export default {
	component: DropCap,
	title: 'Components/DropCap',
};

const Wrapper = ({ children }: { children: React.ReactNode }) => (
	<div
		css={css`
			width: 620px;
			padding: 20px;
		`}
	>
		{children}
	</div>
);

export const Article = () => {
	return (
		<Wrapper>
			<p
				css={css`
					${body.medium()};
				`}
			>
				<DropCap
					letter="T"
					format={{
						design: ArticleDesign.Standard,
						display: ArticleDisplay.Standard,
						theme: Pillar.News,
					}}
				/>
				here once was a dropcap. Lorem ipsum dolor sit amet, consectetur
				adipiscing elit, sed do eiusmod tempor incididunt ut labore et
				dolore magna aliqua. Ut enim ad minim veniam, quis nostrud
				exercitation ullamco laboris nisi ut aliquip ex ea commodo
				consequat. Duis aute irure dolor in reprehenderit in voluptate
				velit esse cillum dolore eu fugiat nulla pariatur. Excepteur
				sint occaecat cupidatat non proident, sunt in culpa qui officia
				deserunt mollit anim id est laborum.
			</p>
		</Wrapper>
	);
};
Article.storyName = 'Article | news';

export const OpinionArticle = () => {
	return (
		<Wrapper>
			<p
				css={css`
					${body.medium()};
				`}
			>
				<DropCap
					letter="L"
					format={{
						design: ArticleDesign.Standard,
						display: ArticleDisplay.Standard,
						theme: Pillar.Opinion,
					}}
				/>
				ong, long ago, there lived a dropcap. Lorem ipsum dolor sit
				amet, consectetur adipiscing elit, sed do eiusmod tempor
				incididunt ut labore et dolore magna aliqua. Ut enim ad minim
				veniam, quis nostrud exercitation ullamco laboris nisi ut
				aliquip ex ea commodo consequat. Duis aute irure dolor in
				reprehenderit in voluptate velit esse cillum dolore eu fugiat
				nulla pariatur. Excepteur sint occaecat cupidatat non proident,
				sunt in culpa qui officia deserunt mollit anim id est laborum.
			</p>
		</Wrapper>
	);
};
OpinionArticle.storyName = 'Article | opinion';

export const Feature = () => {
	return (
		<Wrapper>
			<p
				css={css`
					${body.medium()};
				`}
			>
				<DropCap
					letter="O"
					format={{
						design: ArticleDesign.Feature,
						display: ArticleDisplay.Standard,
						theme: Pillar.Culture,
					}}
				/>
				nce upon a time there was a dropcap. Lorem ipsum dolor sit amet,
				consectetur adipiscing elit, sed do eiusmod tempor incididunt ut
				labore et dolore magna aliqua. Ut enim ad minim veniam, quis
				nostrud exercitation ullamco laboris nisi ut aliquip ex ea
				commodo consequat. Duis aute irure dolor in reprehenderit in
				voluptate velit esse cillum dolore eu fugiat nulla pariatur.
				Excepteur sint occaecat cupidatat non proident, sunt in culpa
				qui officia deserunt mollit anim id est laborum.
			</p>
		</Wrapper>
	);
};
Feature.storyName = 'Feature | culture';

export const PhotoEssay = () => {
	return (
		<Wrapper>
			<p
				css={css`
					${body.medium()};
				`}
			>
				<DropCap
					letter="O"
					format={{
						design: ArticleDesign.PhotoEssay,
						display: ArticleDisplay.Standard,
						theme: Pillar.Sport,
					}}
				/>
				nce upon a time there was a dropcap. Lorem ipsum dolor sit amet,
				consectetur adipiscing elit, sed do eiusmod tempor incididunt ut
				labore et dolore magna aliqua. Ut enim ad minim veniam, quis
				nostrud exercitation ullamco laboris nisi ut aliquip ex ea
				commodo consequat. Duis aute irure dolor in reprehenderit in
				voluptate velit esse cillum dolore eu fugiat nulla pariatur.
				Excepteur sint occaecat cupidatat non proident, sunt in culpa
				qui officia deserunt mollit anim id est laborum.
			</p>
		</Wrapper>
	);
};
PhotoEssay.storyName = 'PhotoEssay | sport';

export const Interview = () => {
	return (
		<Wrapper>
			<p
				css={css`
					${body.medium()};
				`}
			>
				<DropCap
					letter="O"
					format={{
						design: ArticleDesign.Interview,
						display: ArticleDisplay.Standard,
						theme: Pillar.Lifestyle,
					}}
				/>
				nce upon a time there was a dropcap. Lorem ipsum dolor sit amet,
				consectetur adipiscing elit, sed do eiusmod tempor incididunt ut
				labore et dolore magna aliqua. Ut enim ad minim veniam, quis
				nostrud exercitation ullamco laboris nisi ut aliquip ex ea
				commodo consequat. Duis aute irure dolor in reprehenderit in
				voluptate velit esse cillum dolore eu fugiat nulla pariatur.
				Excepteur sint occaecat cupidatat non proident, sunt in culpa
				qui officia deserunt mollit anim id est laborum.
			</p>
		</Wrapper>
	);
};
Interview.storyName = 'Interview | lifestyle';

export const Comment = () => {
	return (
		<Wrapper>
			<p
				css={css`
					${body.medium()};
				`}
			>
				<DropCap
					letter="O"
					format={{
						design: ArticleDesign.Comment,
						display: ArticleDisplay.Standard,
						theme: Pillar.Opinion,
					}}
				/>
				nce upon a time there was a dropcap. Lorem ipsum dolor sit amet,
				consectetur adipiscing elit, sed do eiusmod tempor incididunt ut
				labore et dolore magna aliqua. Ut enim ad minim veniam, quis
				nostrud exercitation ullamco laboris nisi ut aliquip ex ea
				commodo consequat. Duis aute irure dolor in reprehenderit in
				voluptate velit esse cillum dolore eu fugiat nulla pariatur.
				Excepteur sint occaecat cupidatat non proident, sunt in culpa
				qui officia deserunt mollit anim id est laborum.
			</p>
		</Wrapper>
	);
};
Comment.storyName = 'Comment | opinion';

export const CommentSport = () => {
	return (
		<Wrapper>
			<p
				css={css`
					${body.medium()};
				`}
			>
				<DropCap
					letter="O"
					format={{
						design: ArticleDesign.Comment,
						display: ArticleDisplay.Standard,
						theme: Pillar.Sport,
					}}
				/>
				nce upon a time there was a dropcap. Lorem ipsum dolor sit amet,
				consectetur adipiscing elit, sed do eiusmod tempor incididunt ut
				labore et dolore magna aliqua. Ut enim ad minim veniam, quis
				nostrud exercitation ullamco laboris nisi ut aliquip ex ea
				commodo consequat. Duis aute irure dolor in reprehenderit in
				voluptate velit esse cillum dolore eu fugiat nulla pariatur.
				Excepteur sint occaecat cupidatat non proident, sunt in culpa
				qui officia deserunt mollit anim id est laborum.
			</p>
		</Wrapper>
	);
};
CommentSport.storyName = 'Comment | sport';

export const CommentCulture = () => {
	return (
		<Wrapper>
			<p
				css={css`
					${body.medium()};
				`}
			>
				<DropCap
					letter="O"
					format={{
						design: ArticleDesign.Comment,
						display: ArticleDisplay.Standard,
						theme: Pillar.Culture,
					}}
				/>
				nce upon a time there was a dropcap. Lorem ipsum dolor sit amet,
				consectetur adipiscing elit, sed do eiusmod tempor incididunt ut
				labore et dolore magna aliqua. Ut enim ad minim veniam, quis
				nostrud exercitation ullamco laboris nisi ut aliquip ex ea
				commodo consequat. Duis aute irure dolor in reprehenderit in
				voluptate velit esse cillum dolore eu fugiat nulla pariatur.
				Excepteur sint occaecat cupidatat non proident, sunt in culpa
				qui officia deserunt mollit anim id est laborum.
			</p>
		</Wrapper>
	);
};
CommentCulture.storyName = 'Comment | culture';
