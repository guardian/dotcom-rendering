import { css } from '@emotion/react';
import {
	ArticleDesign,
	ArticleDisplay,
	ArticleSpecial,
	Pillar,
} from '@guardian/libs';
import { lightDecorator } from '../../.storybook/decorators/themeDecorator';
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
				theme: Pillar.News,
			}}
		/>
	);
};
Analysis.storyName = 'with design Analysis';
Analysis.decorators = [
	lightDecorator([
		{
			design: ArticleDesign.Analysis,
			display: ArticleDisplay.Standard,
			theme: Pillar.News,
		},
	]),
];

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
					theme: Pillar.Sport,
				}}
			/>
		</div>
	);
};
Interview.storyName = 'with design Interview';
Interview.decorators = [
	lightDecorator([
		{
			design: ArticleDesign.Interview,
			display: ArticleDisplay.Standard,
			theme: Pillar.Sport,
		},
	]),
];

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
					theme: Pillar.Sport,
				}}
			/>
		</div>
	);
};
Explainer.storyName = 'with design Explainer';
Explainer.decorators = [
	lightDecorator([
		{
			design: ArticleDesign.Explainer,
			display: ArticleDisplay.Standard,
			theme: Pillar.Sport,
		},
	]),
];

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
					theme: Pillar.Sport,
				}}
			/>
		</div>
	);
};
Letter.storyName = 'with design Letter';
Letter.decorators = [
	lightDecorator([
		{
			design: ArticleDesign.Letter,
			display: ArticleDisplay.Standard,
			theme: Pillar.Sport,
		},
	]),
];

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
SpecialReport.storyName = 'with design Analysis and theme SpecialReport';
SpecialReport.decorators = [
	lightDecorator([
		{
			design: ArticleDesign.Analysis,
			display: ArticleDisplay.Standard,
			theme: ArticleSpecial.SpecialReport,
		},
	]),
];

export const Timeline = () => {
	return (
		<div
			css={css`
				max-width: 400px;
			`}
		>
			<DesignTag
				format={{
					design: ArticleDesign.Timeline,
					display: ArticleDisplay.Standard,
					theme: Pillar.Sport,
				}}
			/>
		</div>
	);
};
Timeline.storyName = 'with design Timeline';
Timeline.decorators = [
	lightDecorator([
		{
			design: ArticleDesign.Timeline,
			display: ArticleDisplay.Standard,
			theme: Pillar.Sport,
		},
	]),
];

export const Profile = () => {
	return (
		<div
			css={css`
				max-width: 400px;
			`}
		>
			<DesignTag
				format={{
					design: ArticleDesign.Profile,
					display: ArticleDisplay.Standard,
					theme: Pillar.Sport,
				}}
			/>
		</div>
	);
};
Profile.storyName = 'with design Profile';
Profile.decorators = [
	lightDecorator([
		{
			design: ArticleDesign.Profile,
			display: ArticleDisplay.Standard,
			theme: Pillar.Sport,
		},
	]),
];
