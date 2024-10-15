// ----- Imports ----- //

import type { ReactElement } from 'react';
import Cartoon from './index';
import { ArticleDesign, ArticleDisplay, Pillar } from '../../../articleFormat';
import { cartoonData } from '../../../fixtures/cartoon';

// ----- Setup ------ //

const format = {
	design: ArticleDesign.Picture,
	display: ArticleDisplay.Standard,
	theme: Pillar.Opinion,
};

// ----- Stories ----- //

const Default = (): ReactElement => (
	<Cartoon cartoon={cartoonData} format={format} />
);

// ----- Exports ----- //

export default {
	component: Cartoon,
	title: 'AR/Editions/Cartoon',
};

export { Default };
