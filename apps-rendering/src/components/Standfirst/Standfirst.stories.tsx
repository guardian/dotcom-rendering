// ----- Imports ----- //

import { ArticleDesign, ArticleDisplay, ArticlePillar } from '@guardian/libs';
import { getAllThemes, getThemeNameAsString } from 'fixtures/article';
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
import AnalysisStandfirst from './AnalysisStandfirst';
import Standfirst from './';

// ----- Stories ----- //

const Default = (): ReactElement => (
	<Standfirst
		item={{
			...article,
			display: ArticleDisplay.Standard,
			theme: ArticlePillar.News,
		}}
	/>
);

const Review = (): ReactElement => (
	<Standfirst
		item={{
			...review,
			display: ArticleDisplay.Standard,
			theme: ArticlePillar.Culture,
		}}
	/>
);

const Feature = (): ReactElement => (
	<Standfirst
		item={{
			...feature,
			display: ArticleDisplay.Standard,
			theme: ArticlePillar.Sport,
		}}
	/>
);

const Comment = (): ReactElement => (
	<Standfirst
		item={{
			...comment,
			display: ArticleDisplay.Standard,
			theme: ArticlePillar.Opinion,
		}}
	/>
);

const Link = (): ReactElement => (
	<Standfirst
		item={{
			...articleWithStandfirstLink,
			display: ArticleDisplay.Standard,
			theme: ArticlePillar.News,
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
			display: ArticleDisplay.Standard,
			theme: ArticlePillar.Culture,
		}}
	/>
);

// ----- Exports ----- //

export default {
	component: Standfirst,
	title: 'AR/Standfirst',
};

export { Default, Review, Feature, Comment, Link, Deadblog, Analysis };
