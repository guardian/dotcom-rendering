import { css } from '@emotion/react';
import {
	ArticleDesign,
	ArticleDisplay,
	ArticleSpecial,
	Pillar,
} from '@guardian/libs';
import type { StoryObj } from '@storybook/react';
import {
	splitTheme,
	type StoryProps,
} from '../../.storybook/decorators/splitThemeDecorator';
import { HeadlineByline } from './HeadlineByline';

export default {
	component: HeadlineByline,
	title: 'Components/HeadlineByline',
};

export const interviewStory: StoryObj = ({ format }: StoryProps) => {
	return <HeadlineByline format={format} byline="Jane Smith" tags={[]} />;
};
interviewStory.storyName = 'Interview';
interviewStory.decorators = [
	splitTheme([
		{
			display: ArticleDisplay.Standard,
			design: ArticleDesign.Interview,
			theme: Pillar.Culture,
		},
		{
			display: ArticleDisplay.Standard,
			design: ArticleDesign.Comment,
			theme: Pillar.Sport,
		},
		{
			display: ArticleDisplay.Standard,
			design: ArticleDesign.Comment,
			theme: ArticleSpecial.SpecialReport,
		},
	]),
];

export const commentWithBylineImageStory: StoryObj = ({
	format,
}: StoryProps) => {
	// Not visibly different in storybook but will apply a width
	return (
		<HeadlineByline
			format={format}
			byline="Jane Smith"
			tags={[
				{
					id: 'profile/marinahyde',
					type: 'Contributor',
					title: 'Marina Hyde',
					twitterHandle: 'MarinaHyde',
					bylineLargeImageUrl:
						'https://i.guim.co.uk/img/uploads/2018/01/10/Marina_Hyde,_L.png?width=300&quality=85&auto=format&fit=max&s=6476202195914952e48ef41aadb116ff',
				},
			]}
		/>
	);
};
commentWithBylineImageStory.storyName = 'Comment with byline image';
commentWithBylineImageStory.decorators = [
	splitTheme([
		{
			display: ArticleDisplay.Standard,
			design: ArticleDesign.Comment,
			theme: Pillar.Sport,
		},
	]),
];

export const immersiveStory: StoryObj = ({ format }: StoryProps) => {
	return (
		<HeadlineByline
			format={format}
			byline="Jane Smith"
			tags={[
				{
					id: '1',
					type: 'Contributor',
					title: 'Jane Smith',
				},
			]}
		/>
	);
};
immersiveStory.storyName = 'Immersive';
immersiveStory.decorators = [
	splitTheme([
		{
			display: ArticleDisplay.Immersive,
			design: ArticleDesign.Standard,
			theme: Pillar.Lifestyle,
		},
	]),
];

export const ImmersiveComment: StoryObj = ({ format }: StoryProps) => {
	return (
		<div
			css={css`
				background-color: lightgray;
				padding: 20px;
			`}
		>
			<HeadlineByline
				format={format}
				byline="Jane Smith"
				tags={[
					{
						id: '1',
						type: 'Contributor',
						title: 'Jane Smith',
					},
				]}
			/>
		</div>
	);
};
ImmersiveComment.storyName = 'Immersive Comment';
ImmersiveComment.decorators = [
	splitTheme([
		{
			display: ArticleDisplay.Immersive,
			design: ArticleDesign.Comment,
			theme: Pillar.Lifestyle,
		},
	]),
];

export const MultipleStory: StoryObj = ({ format }: StoryProps) => {
	return (
		<HeadlineByline
			format={format}
			byline="Jane Smith, John Doe and Nae Bevan"
			tags={[
				{
					id: '1',
					type: 'Contributor',
					title: 'Jane Smith',
				},
				{
					id: '2',
					type: 'Contributor',
					title: 'John Doe',
				},
				{
					id: '3',
					type: 'Contributor',
					title: 'Nae Bevan',
				},
			]}
		/>
	);
};
MultipleStory.storyName = 'Immersive with multiple contributors';
MultipleStory.decorators = [
	splitTheme([
		{
			display: ArticleDisplay.Immersive,
			design: ArticleDesign.Standard,
			theme: Pillar.Lifestyle,
		},
	]),
];

export const MultipleDuplicateStory: StoryObj = ({ format }: StoryProps) => {
	return (
		<HeadlineByline
			format={format}
			byline="Duncan Campbell and Duncan Campbell"
			tags={[
				{
					id: '1',
					type: 'Contributor',
					title: 'Duncan Campbell',
				},
				{
					id: '2',
					type: 'Contributor',
					title: 'Duncan Campbell',
				},
			]}
		/>
	);
};
MultipleDuplicateStory.storyName =
	'Immersive with multiple contributors with distinct tags but identical names';
MultipleDuplicateStory.decorators = [
	splitTheme([
		{
			display: ArticleDisplay.Immersive,
			design: ArticleDesign.Standard,
			theme: Pillar.Lifestyle,
		},
	]),
];

export const noBylineStory: StoryObj = ({ format }: StoryProps) => (
	<div
		css={css`
			display: flex;
			flex-direction: column;

			p {
				background-color: darkgreen;
				color: aliceblue;
				line-height: 2em;
			}
		`}
	>
		<p>👇 there should be no space between these boxes</p>
		<HeadlineByline format={format} byline="" tags={[]} />
		<p>👆 as and empty byline is transformed in a null</p>
	</div>
);
noBylineStory.storyName = 'No byline';
noBylineStory.decorators = [
	splitTheme([
		{
			display: ArticleDisplay.Standard,
			design: ArticleDesign.Interview,
			theme: Pillar.Culture,
		},
	]),
];

export const Labs: StoryObj = ({ format }: StoryProps) => {
	return (
		<HeadlineByline
			format={format}
			byline="Jane Smith"
			tags={[
				{
					id: '1',
					type: 'Contributor',
					title: 'Jane Smith',
				},
			]}
		/>
	);
};
Labs.storyName = 'Labs Immersive';
Labs.decorators = [
	splitTheme([
		{
			display: ArticleDisplay.Immersive,
			design: ArticleDesign.Standard,
			theme: ArticleSpecial.Labs,
		},
		{
			display: ArticleDisplay.Standard,
			design: ArticleDesign.Comment,
			theme: ArticleSpecial.Labs,
		},
		{
			display: ArticleDisplay.Standard,
			design: ArticleDesign.Interview,
			theme: ArticleSpecial.Labs,
		},
	]),
];
