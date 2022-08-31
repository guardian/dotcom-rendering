import type { ArticleFormat } from '@guardian/libs';
import { ArticleDesign, ArticleDisplay, ArticlePillar } from '@guardian/libs';
import { explainer } from 'fixtures/item';
import type { ReactElement } from 'react';
import TableOfContent from './';

const format: ArticleFormat = {
	design: ArticleDesign.Standard,
	display: ArticleDisplay.Standard,
	theme: ArticlePillar.News,
};

const Default = (): ReactElement => (
	<TableOfContent outline={explainer.outline} format={format} />
);

export default {
	component: TableOfContent,
	title: 'AR/TableOfContent',
};

export { Default };
