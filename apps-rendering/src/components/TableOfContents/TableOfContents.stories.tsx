import type { ArticleFormat } from '@guardian/libs';
import { ArticleDesign, ArticleDisplay, ArticlePillar } from '@guardian/libs';
import { explainer } from 'fixtures/item';
import type { Outline } from 'outline';
import type { ReactElement } from 'react';
import TableOfContents from '.';

const format: ArticleFormat = {
	design: ArticleDesign.Standard,
	display: ArticleDisplay.Standard,
	theme: ArticlePillar.News,
};

const Default = (): ReactElement => (
	<TableOfContents outline={explainer.outline as Outline} format={format} />
);

export default {
	component: TableOfContents,
	title: 'AR/TableOfContents',
};

export { Default };
