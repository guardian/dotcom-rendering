/* eslint-disable jsx-a11y/aria-role */

import { css } from '@emotion/react';

import { Design, Display, Pillar, Special } from '@guardian/types';

import { CommentCount } from './CommentCount';
import { decidePalette } from '../lib/decidePalette';

export default {
	component: CommentCount,
	title: 'Components/CommentCount',
};

export const SpecialReportStory = () => {
	return (
		<div
			css={css`
				display: flex;
				flex-direction: row;
				align-items: flex-start;
			`}
		>
			<CommentCount
				isCommentable={true}
				setIsExpanded={() => {}}
				commentCount={306}
				palette={decidePalette({
					theme: Special.SpecialReport,
					display: Display.Standard,
					design: Design.Article,
				})}
			/>
		</div>
	);
};
SpecialReportStory.story = { name: 'with theme SpecialReport' };

export const NewsStory = () => {
	return (
		<div
			css={css`
				display: flex;
				flex-direction: row;
				align-items: flex-start;
			`}
		>
			<CommentCount
				isCommentable={true}
				setIsExpanded={() => {}}
				commentCount={36}
				palette={decidePalette({
					theme: Pillar.News,
					display: Display.Standard,
					design: Design.Article,
				})}
			/>
		</div>
	);
};
NewsStory.story = { name: 'with theme News' };

export const LargeNumber = () => {
	return (
		<div
			css={css`
				display: flex;
				flex-direction: row;
				align-items: flex-start;
			`}
		>
			<CommentCount
				isCommentable={true}
				setIsExpanded={() => {}}
				commentCount={10836}
				palette={decidePalette({
					theme: Pillar.Opinion,
					display: Display.Standard,
					design: Design.Article,
				})}
			/>
		</div>
	);
};
LargeNumber.story = { name: 'with a large number' };

export const Zero = () => {
	return (
		<div
			css={css`
				display: flex;
				flex-direction: row;
				align-items: flex-start;
			`}
		>
			<CommentCount
				isCommentable={true}
				setIsExpanded={() => {}}
				commentCount={0}
				palette={decidePalette({
					theme: Pillar.Opinion,
					display: Display.Standard,
					design: Design.Article,
				})}
			/>
		</div>
	);
};
Zero.story = { name: 'with zero comments' };

export const Undefined = () => {
	return (
		<div
			css={css`
				display: flex;
				flex-direction: row;
				align-items: flex-start;
			`}
		>
			<CommentCount
				isCommentable={true}
				setIsExpanded={() => {}}
				palette={decidePalette({
					theme: Pillar.Opinion,
					display: Display.Standard,
					design: Design.Article,
				})}
			/>
		</div>
	);
};
Undefined.story = { name: 'with count undefined' };
