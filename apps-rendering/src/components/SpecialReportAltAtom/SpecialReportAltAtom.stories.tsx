// ----- Imports ----- //

import { ArticleDesign, ArticleDisplay, ArticleSpecial } from '@guardian/libs';
import type { FC } from 'react';
import SpecialReportAltAtom from '.';

// ----- Stories ----- //

const Default: FC = () => (
    <SpecialReportAltAtom format={{
        design: ArticleDesign.Standard,
        display: ArticleDisplay.Standard,
        theme: ArticleSpecial.SpecialReportAlt,
    }} />
);

// ----- Exports ----- //

export default {
	component: SpecialReportAltAtom,
	title: 'AR/SpecialReportAltAtom',
};

export { Default };
