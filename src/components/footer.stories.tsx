// ----- Imports ----- //
import React, { FC, ReactElement } from 'react';
import { Footer } from "@guardian/src-footer"
import { footerContents } from './shared/footer';
import { withKnobs } from '@storybook/addon-knobs';


const FooterCcpa = (): ReactElement => {
    return <Footer >{footerContents(true)}</Footer>

}


// ----- Stories ----- //

const Default: FC = (): ReactElement =>{
    return <FooterCcpa />
}


export default {
    component: FooterCcpa,
    title: 'Footer',
    decorators: [ withKnobs ],

}

export {
    Default,
}
