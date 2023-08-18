import { css } from '@emotion/react';
import {
	ArticleDesign,
	ArticleDisplay,
	ArticleSpecial,
	Pillar,
} from '@guardian/libs';
import { HeadlineByline } from './HeadlineByline';

export default {
	component: HeadlineByline,
	title: 'Components/HeadlineByline',
};

export const interviewStory = () => {
	return (
		<HeadlineByline
			format={{
				display: ArticleDisplay.Standard,
				design: ArticleDesign.Interview,
				theme: Pillar.Culture,
			}}
			byline="Jane Smith"
			tags={[]}
			renderingTarget="Web"
		/>
	);
};
interviewStory.storyName = 'Interview';

export const commentStory = () => {
	return (
		<HeadlineByline
			format={{
				display: ArticleDisplay.Standard,
				design: ArticleDesign.Comment,
				theme: Pillar.Sport,
			}}
			byline="Jane Smith"
			tags={[]}
			renderingTarget="Web"
		/>
	);
};
commentStory.storyName = 'Comment';

export const specialStory = () => {
	return (
		<HeadlineByline
			format={{
				display: ArticleDisplay.Standard,
				design: ArticleDesign.Comment,
				theme: ArticleSpecial.SpecialReport,
			}}
			byline="Jane Smith"
			tags={[]}
			renderingTarget="Web"
		/>
	);
};
specialStory.storyName = 'SpecialReport';

export const commentWithBylineImageStory = () => {
	// Not visibly different in storybook but will apply a width
	return (
		<HeadlineByline
			format={{
				display: ArticleDisplay.Standard,
				design: ArticleDesign.Comment,
				theme: Pillar.Sport,
			}}
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
			renderingTarget="Web"
		/>
	);
};
commentWithBylineImageStory.storyName = 'Comment with byline image';

export const immersiveStory = () => {
	return (
		<HeadlineByline
			format={{
				display: ArticleDisplay.Immersive,
				design: ArticleDesign.Standard,
				theme: Pillar.Lifestyle,
			}}
			byline="Jane Smith"
			tags={[
				{
					id: '1',
					type: 'Contributor',
					title: 'Jane Smith',
				},
			]}
			renderingTarget="Web"
		/>
	);
};
immersiveStory.storyName = 'Immersive';

export const ImmersiveComment = () => {
	return (
		<div
			css={css`
				background-color: lightgray;
				padding: 20px;
			`}
		>
			<HeadlineByline
				format={{
					display: ArticleDisplay.Immersive,
					design: ArticleDesign.Comment,
					theme: Pillar.Lifestyle,
				}}
				byline="Jane Smith"
				tags={[
					{
						id: '1',
						type: 'Contributor',
						title: 'Jane Smith',
					},
				]}
				renderingTarget="Web"
			/>
		</div>
	);
};
ImmersiveComment.storyName = 'Immersive Comment';

export const MultipleStory = () => {
	return (
		<HeadlineByline
			format={{
				display: ArticleDisplay.Immersive,
				design: ArticleDesign.Standard,
				theme: Pillar.Lifestyle,
			}}
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
			renderingTarget="Web"
		/>
	);
};
MultipleStory.storyName = 'Immersive with multiple contributors';

export const MultipleDuplicateStory = () => {
	return (
		<HeadlineByline
			format={{
				display: ArticleDisplay.Immersive,
				design: ArticleDesign.Standard,
				theme: Pillar.Lifestyle,
			}}
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
			renderingTarget="Web"
		/>
	);
};
MultipleDuplicateStory.storyName =
	'Immersive with multiple contributors with distinct tags but identical names';

export const noBylineStory = () => {
	return (
		<HeadlineByline
			format={{
				display: ArticleDisplay.Standard,
				design: ArticleDesign.Interview,
				theme: Pillar.Culture,
			}}
			byline=""
			tags={[]}
			renderingTarget="Web"
		/>
	);
};
noBylineStory.storyName = 'No byline';

export const LabsImmersive = () => {
	return (
		<HeadlineByline
			format={{
				display: ArticleDisplay.Immersive,
				design: ArticleDesign.Standard,
				theme: ArticleSpecial.Labs,
			}}
			byline="Jane Smith"
			tags={[
				{
					id: '1',
					type: 'Contributor',
					title: 'Jane Smith',
				},
			]}
			renderingTarget="Web"
		/>
	);
};
LabsImmersive.storyName = 'Labs Immersive';

export const LabsComment = () => {
	return (
		<HeadlineByline
			format={{
				display: ArticleDisplay.Standard,
				design: ArticleDesign.Comment,
				theme: ArticleSpecial.Labs,
			}}
			byline="Jane Smith"
			tags={[
				{
					id: '1',
					type: 'Contributor',
					title: 'Jane Smith',
				},
			]}
			renderingTarget="Web"
		/>
	);
};
LabsComment.storyName = 'Labs Comment';

export const LabsInterview = () => {
	return (
		<HeadlineByline
			format={{
				display: ArticleDisplay.Standard,
				design: ArticleDesign.Interview,
				theme: ArticleSpecial.Labs,
			}}
			byline="Jane Smith"
			tags={[
				{
					id: '1',
					type: 'Contributor',
					title: 'Jane Smith',
				},
			]}
			renderingTarget="Web"
		/>
	);
};
LabsInterview.storyName = 'Labs Interview';
