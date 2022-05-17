// ----- Imports ----- //

import type { ArticleFormat } from '@guardian/libs';
import { ArticleDesign, ArticleDisplay, ArticlePillar } from '@guardian/libs';
import AdSlot from 'adSlot';
import type { ReactElement } from 'react';

// ----- Stories ----- //

const mockFormat: ArticleFormat = {
	theme: ArticlePillar.News,
	design: ArticleDesign.Standard,
	display: ArticleDisplay.Standard,
};

const Default = (): ReactElement => (
	<AdSlot className={'ad-placeholder'} paragraph={0} format={mockFormat} />
);

// ----- Exports ----- //

export default {
	component: AdSlot,
	title: 'AR/AdSlot',
};

export { Default };
