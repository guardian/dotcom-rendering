// ----- Imports ----- //

import { ArticleDesign, ArticleDisplay, ArticlePillar } from '@guardian/libs';
import { some } from '../../../vendor/@guardian/types/index';
import { parseHtml } from 'fixtures/item';
import type { FC } from 'react';
import MainMediaCaption from '.';

// ----- Stories ----- //

const Default: FC = () => (
	<MainMediaCaption
		caption={parseHtml('A caption').toOption()}
		credit={some('By a person')}
		format={{
			design: ArticleDesign.Standard,
			display: ArticleDisplay.Standard,
			theme: ArticlePillar.News,
		}}
		id="caption-id"
	/>
);

// ----- Exports ----- //

export default {
	component: MainMediaCaption,
	title: 'AR/MainMediaCaption',
};

export { Default };
