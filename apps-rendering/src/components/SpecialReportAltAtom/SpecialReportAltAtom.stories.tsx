// ----- Imports ----- //

import {
	ArticleDesign,
	ArticleDisplay,
	ArticleSpecial,
} from '../../articleFormat';
import SpecialReportAltAtom from '.';

// ----- Stories ----- //

const Default = () => (
	<SpecialReportAltAtom
		format={{
			design: ArticleDesign.Standard,
			display: ArticleDisplay.Standard,
			theme: ArticleSpecial.SpecialReportAlt,
		}}
	/>
);

// ----- Exports ----- //

export default {
	component: SpecialReportAltAtom,
	title: 'AR/SpecialReportAltAtom',
};

export { Default };
