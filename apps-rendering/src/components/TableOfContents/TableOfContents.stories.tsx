import type { ArticleFormat } from '@guardian/libs';
import {
	ArticleDesign,
	ArticleDisplay,
	ArticlePillar,
	ArticleSpecial,
} from '@guardian/libs';
import { explainer } from 'fixtures/item';
import type { ReactElement } from 'react';
import TableOfContents from '.';

const format: ArticleFormat = {
	design: ArticleDesign.Standard,
	display: ArticleDisplay.Standard,
	theme: ArticlePillar.News,
};

const immersiveDisplayFormat: ArticleFormat = {
	design: ArticleDesign.Standard,
	display: ArticleDisplay.Immersive,
	theme: ArticlePillar.News,
};

const labsThemeFormat: ArticleFormat = {
	design: ArticleDesign.Standard,
	display: ArticleDisplay.Standard,
	theme: ArticleSpecial.Labs,
};

const numberedListDisplayFormat: ArticleFormat = {
	design: ArticleDesign.Standard,
	display: ArticleDisplay.NumberedList,
	theme: ArticlePillar.News,
};

const numberedListDisplayLabsThemeFormat: ArticleFormat = {
	design: ArticleDesign.Standard,
	display: ArticleDisplay.NumberedList,
	theme: ArticleSpecial.Labs,
};

const Default = (): ReactElement => (
	<TableOfContents outline={explainer.outline} format={format} />
);

const Immersive = (): ReactElement => (
	<TableOfContents
		outline={explainer.outline}
		format={immersiveDisplayFormat}
	/>
);

const Labs = (): ReactElement => (
	<TableOfContents outline={explainer.outline} format={labsThemeFormat} />
);

const NumberedList = (): ReactElement => (
	<TableOfContents
		outline={explainer.outline}
		format={numberedListDisplayFormat}
	/>
);

const NumberedListLabs = (): ReactElement => (
	<TableOfContents
		outline={explainer.outline}
		format={numberedListDisplayLabsThemeFormat}
	/>
);
export default {
	component: TableOfContents,
	title: 'AR/TableOfContents',
};

export { Default, Immersive, Labs, NumberedList, NumberedListLabs };
