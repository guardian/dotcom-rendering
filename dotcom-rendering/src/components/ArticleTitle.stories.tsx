import { css } from '@emotion/react';
import {
	ArticleDesign,
	ArticleDisplay,
	ArticleSpecial,
	Pillar,
} from '@guardian/libs';
import { getAllThemes, getThemeNameAsString } from '../lib/format';
import { ArticleTitle } from './ArticleTitle';

const Wrapper = ({ children }: { children: React.ReactNode }) => (
	<div
		css={css`
			width: 200px;
			padding: 20px;
		`}
	>
		{children}
	</div>
);
const FEArticle = {
	tags: [],
	guardianBaseURL: 'https://theguardian.com',
	inLeftCol: true,
	fallbackToSection: true,
	sectionLabel: 'Section label',
	sectionUrl: '/section_url',
};
const FEBrexit = {
	...FEArticle,
	...{
		sectionLabel: 'Brexit',
		sectionUrl: '/brexit',
		badge: {
			href: '/politics/series/brexit-how-it-came-to-this',
			imageSrc:
				'https://assets.guim.co.uk/images/badges/05c6ace4e60dd0209a3f80eb03e16524/EUReferendumBadge.svg',
		},
	},
};

const FEBeyondTheBlade = {
	...FEArticle,
	...{
		sectionLabel: 'Beyond the blade',
		sectionUrl: '/beyond-the-blade',
		badge: {
			href: '/membership/series/beyond-the-blade',
			imageSrc:
				'https://assets.guim.co.uk/images/badges/bfc00bc58eb966845ccf1200fd8c54e0/beyondthebladebadge.svg',
		},
	},
};

export default {
	component: ArticleTitle,
	title: 'Components/ArticleTitle',
};

export const defaultStory = () => {
	return (
		<Wrapper>
			<ArticleTitle
				{...FEBrexit}
				format={{
					display: ArticleDisplay.Standard,
					theme: Pillar.Sport,
					design: ArticleDesign.Standard,
				}}
			/>
		</Wrapper>
	);
};
defaultStory.storyName = 'Brexit badge';

export const beyondTheBlade = () => {
	return (
		<Wrapper>
			<ArticleTitle
				{...FEBeyondTheBlade}
				format={{
					display: ArticleDisplay.Standard,
					theme: Pillar.News,
					design: ArticleDesign.Standard,
				}}
			/>
		</Wrapper>
	);
};
beyondTheBlade.storyName = 'Beyond the blade badge';

export const immersiveComment = () => {
	return (
		<div
			css={css`
				background-color: lightgray;
				padding: 20px;
			`}
		>
			<ArticleTitle
				{...FEBrexit}
				format={{
					display: ArticleDisplay.Immersive,
					theme: Pillar.Sport,
					design: ArticleDesign.Comment,
				}}
			/>
		</div>
	);
};
immersiveComment.storyName = 'Immersive comment piece';

export const immersiveCommentTag = () => {
	return (
		<div
			css={css`
				background-color: lightgray;
				padding: 20px;
			`}
		>
			<ArticleTitle
				{...FEArticle}
				format={{
					display: ArticleDisplay.Immersive,
					theme: Pillar.Sport,
					design: ArticleDesign.Comment,
				}}
				tags={[
					{
						id: '',
						title: 'Tag title',
						type: 'Blog',
					},
				]}
			/>
		</div>
	);
};
immersiveCommentTag.storyName = 'Immersive comment piece with Blog tag';

export const ImmersiveSeriesTag = () => {
	return (
		<Wrapper>
			<ArticleTitle
				{...FEArticle}
				format={{
					display: ArticleDisplay.Immersive,
					theme: Pillar.Sport,
					design: ArticleDesign.Review,
				}}
				tags={[
					{
						id: '',
						title: 'Series title with the addition of some more text to see how this wraps',
						type: 'Series',
					},
				]}
			/>
		</Wrapper>
	);
};
ImmersiveSeriesTag.storyName = 'Immersive with a Series tag';

export const ArticleBlogTag = () => {
	return (
		<Wrapper>
			<ArticleTitle
				{...FEArticle}
				format={{
					display: ArticleDisplay.Standard,
					theme: Pillar.Sport,
					design: ArticleDesign.Standard,
				}}
				tags={[
					{
						id: '',
						title: 'Blog title',
						type: 'Blog',
					},
				]}
			/>
		</Wrapper>
	);
};
ArticleBlogTag.storyName = 'Article with a Blog tag';

export const LiveblogTitle = () => {
	return (
		<Wrapper>
			<div
				css={css`
					/* stylelint-disable-next-line color-no-hex */
					background-color: #005689;
				`}
			>
				<ArticleTitle
					{...FEArticle}
					format={{
						display: ArticleDisplay.Standard,
						theme: Pillar.Sport,
						design: ArticleDesign.LiveBlog,
					}}
					tags={[
						{
							id: '',
							title: 'Liveblog title',
							type: 'Blog',
						},
					]}
				/>
			</div>
			<div
				css={css`
					/* stylelint-disable-next-line color-no-hex */
					background-color: #ffe500;
				`}
			>
				<ArticleTitle
					{...FEArticle}
					format={{
						display: ArticleDisplay.Standard,
						theme: Pillar.Sport,
						design: ArticleDesign.LiveBlog,
					}}
					tags={[
						{
							id: '',
							title: 'Match liveblog title',
							type: 'Blog',
						},
					]}
					isMatch={true}
				/>
			</div>
		</Wrapper>
	);
};
LiveblogTitle.storyName = 'Liveblog title';

export const ArticleOpinionTag = () => {
	return (
		<Wrapper>
			<ArticleTitle
				{...FEArticle}
				format={{
					display: ArticleDisplay.Standard,
					theme: Pillar.Sport,
					design: ArticleDesign.Standard,
				}}
				tags={[
					{
						id: '',
						title: 'Opinion title',
						type: 'Opinion',
					},
				]}
			/>
		</Wrapper>
	);
};
ArticleOpinionTag.storyName = 'Article with a Opinion tag';

export const ArticleSeriesTag = () => {
	return (
		<Wrapper>
			<ArticleTitle
				{...FEArticle}
				format={{
					display: ArticleDisplay.Standard,
					theme: Pillar.Sport,
					design: ArticleDesign.Standard,
				}}
				tags={[
					{
						id: '',
						title: 'Series title',
						type: 'Series',
					},
				]}
			/>
		</Wrapper>
	);
};
ArticleSeriesTag.storyName = 'Article with a Series tag';

export const SpecialReportTitle = () => {
	return (
		<Wrapper>
			<ArticleTitle
				{...FEArticle}
				format={{
					display: ArticleDisplay.Standard,
					theme: ArticleSpecial.SpecialReport,
					design: ArticleDesign.Standard,
				}}
				tags={[
					{
						id: '',
						title: 'Special',
						type: 'Series',
					},
				]}
			/>
		</Wrapper>
	);
};
SpecialReportTitle.storyName = 'Special report';

export const SpecialReportAlt = () => {
	return (
		<Wrapper>
			<ArticleTitle
				{...FEArticle}
				format={{
					display: ArticleDisplay.Standard,
					theme: ArticleSpecial.SpecialReportAlt,
					design: ArticleDesign.Standard,
				}}
				tags={[
					{
						id: '',
						title: 'Special Report Alt',
						type: 'Series',
					},
				]}
			/>
		</Wrapper>
	);
};
SpecialReportAlt.storyName = 'Special report Alt';

export const ArticleNoTags = () => {
	return (
		<Wrapper>
			<ArticleTitle
				{...FEArticle}
				format={{
					display: ArticleDisplay.Standard,
					theme: Pillar.Culture,
					design: ArticleDesign.Standard,
				}}
			/>
		</Wrapper>
	);
};
ArticleNoTags.storyName = 'Article with no tags';

export const LabsStory = () => {
	return (
		<Wrapper>
			<ArticleTitle
				{...FEArticle}
				format={{
					display: ArticleDisplay.Standard,
					theme: ArticleSpecial.Labs,
					design: ArticleDesign.Standard,
				}}
				tags={[
					{
						id: '',
						title: 'Series title',
						type: 'Series',
					},
				]}
			/>
		</Wrapper>
	);
};
LabsStory.storyName = 'Labs';

export const LongStory = () => {
	return (
		<Wrapper>
			<ArticleTitle
				{...FEArticle}
				format={{
					display: ArticleDisplay.Standard,
					theme: Pillar.News,
					design: ArticleDesign.Standard,
				}}
				tags={[
					{
						id: '',
						title: "Edward Snowden's choice of Hong Kong as haven is a high-stakes gamble",
						type: 'Series',
					},
				]}
			/>
		</Wrapper>
	);
};
LongStory.storyName = 'Long title';

export const LongWord = () => {
	return (
		<Wrapper>
			<ArticleTitle
				{...FEArticle}
				format={{
					display: ArticleDisplay.Standard,
					theme: Pillar.News,
					design: ArticleDesign.Standard,
				}}
				tags={[
					{
						id: '',
						title: 'Antidisestablishmentarianism',
						type: 'Series',
					},
				]}
			/>
		</Wrapper>
	);
};
LongWord.storyName = 'Long word';

export const ArticleDeadBlogTitle = () => {
	return (
		<>
			{getAllThemes({
				display: ArticleDisplay.Standard,
				design: ArticleDesign.DeadBlog,
			}).map((format) => (
				<div key={JSON.stringify(format)}>
					<p>{getThemeNameAsString(format)}</p>
					<ArticleTitle
						{...FEArticle}
						format={format}
						tags={[
							{
								id: '',
								title: 'Deadblog title',
								type: 'Blog',
							},
						]}
					/>
					<br />
					<br />
				</div>
			))}
		</>
	);
};

ArticleDeadBlogTitle.storyName = 'Deadblog - All pillars';
