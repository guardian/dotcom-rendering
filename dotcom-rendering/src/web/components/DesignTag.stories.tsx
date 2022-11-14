import { css } from '@emotion/react';
import {
	ArticleDesign,
	ArticleDisplay,
	ArticlePillar,
	ArticleSpecial,
} from '@guardian/libs';
import { DesignTag } from './DesignTag';

export default {
	component: DesignTag,
	title: 'Components/DesignTag',
};

export const Analysis = () => {
	return (
		<DesignTag
			format={{
				design: ArticleDesign.Analysis,
				display: ArticleDisplay.Standard,
				theme: ArticlePillar.News,
			}}
		/>
	);
};
Analysis.story = { name: 'with design Analysis' };

export const Interview = () => {
	return (
		<div
			css={css`
				max-width: 400px;
			`}
		>
			<DesignTag
				format={{
					design: ArticleDesign.Interview,
					display: ArticleDisplay.Standard,
					theme: ArticlePillar.Sport,
				}}
			/>
		</div>
	);
};
Interview.story = { name: 'with design Interview' };

export const Explainer = () => {
	return (
		<div
			css={css`
				max-width: 400px;
			`}
		>
			<DesignTag
				format={{
					design: ArticleDesign.Explainer,
					display: ArticleDisplay.Standard,
					theme: ArticlePillar.Sport,
				}}
			/>
		</div>
	);
};
Explainer.story = { name: 'with design Explainer' };

export const Letter = () => {
	return (
		<div
			css={css`
				max-width: 400px;
			`}
		>
			<DesignTag
				format={{
					design: ArticleDesign.Letter,
					display: ArticleDisplay.Standard,
					theme: ArticlePillar.Sport,
				}}
			/>
		</div>
	);
};
Interview.story = { name: 'with design Letter' };

export const SpecialReport = () => {
	return (
		<DesignTag
			format={{
				design: ArticleDesign.Analysis,
				display: ArticleDisplay.Standard,
				theme: ArticleSpecial.SpecialReport,
			}}
		/>
	);
};
SpecialReport.story = { name: 'with design Analysis and theme SpecialReport' };
