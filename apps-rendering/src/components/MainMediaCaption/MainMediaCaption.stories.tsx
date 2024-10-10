// ----- Imports ----- //

import { ArticleDesign, ArticleDisplay, Pillar } from '../../articleFormat';
import { some } from '../../../vendor/@guardian/types/index';
import { parseHtml } from 'fixtures/item';
import MainMediaCaption from '.';

// ----- Stories ----- //

const Default = () => (
	<MainMediaCaption
		caption={parseHtml('A caption').toOption()}
		credit={some('By a person')}
		format={{
			design: ArticleDesign.Standard,
			display: ArticleDisplay.Standard,
			theme: Pillar.News,
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
