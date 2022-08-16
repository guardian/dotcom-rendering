// ----- Imports ----- //

import {
	getAllThemes,
	getThemeNameAsString,
} from '@guardian/common-rendering/src/fixtures/article';
import { ArticleDesign, ArticleDisplay, ArticlePillar } from '@guardian/libs';
import { boolean, withKnobs } from '@storybook/addon-knobs';
import {
	analysis,
	article,
	articleWithStandfirstLink,
	comment,
	feature,
	review,
} from 'fixtures/item';
import { deadBlog } from 'fixtures/live';
import type { ReactElement } from 'react';
import { selectPillar } from 'storybookHelpers';
import Standfirst from './';
import AnalysisStandfirst from './AnalysisStandfirst';

// ----- Stories ----- //

const Default = (): ReactElement => (
	<Standfirst
		item={{
			...article,
			display: boolean('Immersive', false)
				? ArticleDisplay.Immersive
				: ArticleDisplay.Standard,
			theme: selectPillar(ArticlePillar.News),
		}}
	/>
);

const Review = (): ReactElement => (
	<Standfirst
		item={{
			...review,
			display: boolean('Immersive', false)
				? ArticleDisplay.Immersive
				: ArticleDisplay.Standard,
			theme: selectPillar(ArticlePillar.Culture),
		}}
	/>
);

const Feature = (): ReactElement => (
	<Standfirst
		item={{
			...feature,
			display: boolean('Immersive', false)
				? ArticleDisplay.Immersive
				: ArticleDisplay.Standard,
			theme: selectPillar(ArticlePillar.Sport),
		}}
	/>
);

const Comment = (): ReactElement => (
	<Standfirst
		item={{
			...comment,
			display: boolean('Immersive', false)
				? ArticleDisplay.Immersive
				: ArticleDisplay.Standard,
			theme: selectPillar(ArticlePillar.Opinion),
		}}
	/>
);

const Link = (): ReactElement => (
	<Standfirst
		item={{
			...articleWithStandfirstLink,
			display: ArticleDisplay.Standard,
			theme: selectPillar(ArticlePillar.News),
		}}
	/>
);

const Deadblog = (): ReactElement => {
	return (
		<>
			{getAllThemes({
				display: ArticleDisplay.Standard,
				design: ArticleDesign.DeadBlog,
			}).map((format) => (
				<div key={format.theme}>
					<p>{getThemeNameAsString(format)}</p>
					<Standfirst
						item={{
							...deadBlog,
							theme: format.theme,
						}}
					/>
					<br />
				</div>
			))}
		</>
	);
};

const Analysis = (): ReactElement => (
	<AnalysisStandfirst
		item={{
			...analysis,
			display: boolean('Immersive', false)
				? ArticleDisplay.Immersive
				: ArticleDisplay.Standard,
			theme: selectPillar(ArticlePillar.Culture),
		}}
	/>
);

// ----- Exports ----- //

export default {
	component: Standfirst,
	title: 'AR/Standfirst',
	decorators: [withKnobs],
};

export { Default, Review, Feature, Comment, Link, Deadblog, Analysis };
