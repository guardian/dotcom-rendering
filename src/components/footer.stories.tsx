
// ----- Imports ----- //

import React, { FC } from 'react';
import { Footer } from "@guardian/src-footer"
import { footerContents } from './shared/footer';


const FooterCcpa = () => <Footer>{footerContents(true)}</Footer>

// ----- Stories ----- //

const Default: FC = () =>
    <FooterCcpa />

export default {
    title: 'Footer',

}

export {
    Default,
}
