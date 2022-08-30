import {
	ArticleDesign,
	ArticleDisplay,
	ArticleFormat,
	ArticlePillar,
} from '@guardian/libs';
import { explainer } from 'fixtures/item';
import { ReactElement } from 'react';
import TableOfContent from '.';

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
