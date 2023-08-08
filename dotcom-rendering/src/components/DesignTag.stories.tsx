import { css } from '@emotion/react';
import {
	ArticleDesign,
	ArticleDisplay,
	ArticleSpecial,
	Pillar,
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
				theme: Pillar.News,
			}}
		/>
	);
};
Analysis.storyName = 'with design Analysis';

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
