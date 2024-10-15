// ----- Imports ----- //

import {
	ArticleDesign,
	ArticleDisplay,
	type ArticleFormat,
	Pillar,
} from 'articleFormat';
import AdSlot from 'adSlot';
import type { ReactElement } from 'react';

// ----- Stories ----- //

const mockFormat: ArticleFormat = {
	theme: Pillar.News,
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
