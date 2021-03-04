import React from 'react';
import { css } from 'emotion';

import { Display, Design, Pillar, Special } from '@guardian/types';

import { HeadlineByline } from './HeadlineByline';

export default {
	component: HeadlineByline,
	title: 'Components/HeadlineByline',
};

export const interviewStory = () => {
	return (
		<HeadlineByline
			format={{
				display: Display.Standard,
				design: Design.Interview,
				theme: Pillar.Culture,
			}}
			byline="Jane Smith"
			tags={[]}
		/>
	);
};
interviewStory.story = { name: 'Interview' };

export const commentStory = () => {
	return (
		<HeadlineByline
			format={{
				display: Display.Standard,
				design: Design.Comment,
				theme: Pillar.Sport,
			}}
			byline="Jane Smith"
			tags={[]}
		/>
	);
};
commentStory.story = { name: 'Comment' };

export const specialStory = () => {
	return (
		<HeadlineByline
			format={{
				display: Display.Standard,
				design: Design.Comment,
				theme: Special.SpecialReport,
			}}
			byline="Jane Smith"
			tags={[]}
		/>
	);
};
specialStory.story = { name: 'SpecialReport' };

export const commentWithBylineImageStory = () => {
	// Not visibly different in storybook but will apply a width
	return (
		<HeadlineByline
			format={{
				display: Display.Standard,
				design: Design.Comment,
				theme: Pillar.Sport,
			}}
			byline="Jane Smith"
			tags={[
				{
					id: 'profile/marinahyde',
					type: 'Contributor',
					title: 'Marina Hyde',
					twitterHandle: 'MarinaHyde',
					bylineImageUrl:
						'https://i.guim.co.uk/img/uploads/2018/01/10/Marina_Hyde,_L.png?width=300&quality=85&auto=format&fit=max&s=6476202195914952e48ef41aadb116ff',
				},
			]}
		/>
	);
};
commentWithBylineImageStory.story = { name: 'Comment with byline image' };

export const immersiveStory = () => {
	return (
		<HeadlineByline
			format={{
				display: Display.Immersive,
				design: Design.Article,
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
		/>
	);
};
immersiveStory.story = { name: 'Immersive' };

export const ImmersiveComment = () => {
	return (
		<div
			className={css`
				background-color: lightgray;
				padding: 20px;
			`}
		>
			<HeadlineByline
				format={{
					display: Display.Immersive,
					design: Design.Comment,
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
			/>
		</div>
	);
};
ImmersiveComment.story = { name: 'Immersive Comment' };

export const MultipleStory = () => {
	return (
		<HeadlineByline
			format={{
				display: Display.Immersive,
				design: Design.Article,
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
		/>
	);
};
MultipleStory.story = { name: 'Immersive with multiple contributors' };

export const noBylineStory = () => {
	return (
		<HeadlineByline
			format={{
				display: Display.Standard,
				design: Design.Interview,
				theme: Pillar.Culture,
			}}
			byline=""
			tags={[]}
		/>
	);
};
noBylineStory.story = { name: 'No byline' };
