
// ----- Imports ----- //

import React, { FC } from 'react';
import { Footer } from "@guardian/src-footer"

interface FooterProps {
    showBackToTop: boolean;
}

const Wrapper: FC<FooterProps> = ({showBackToTop}) => <Footer showBackToTop={true} />

// ----- Stories ----- //

const Default: FC = () =>
    <Wrapper showBackToTop={true} />

export default {
    title: 'Footer',

}

export {
    Default,
}
