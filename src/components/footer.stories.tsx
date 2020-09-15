
// ----- Imports ----- //

import React, { FC } from 'react';
import { Footer } from "@guardian/src-footer"

const Wrapper = () => <Footer showBackToTop={true} />
// ----- Stories ----- //

const Default: FC = () =>
    <Wrapper />

export default {
    title: 'Footer',

}

export {
    Default,
}
