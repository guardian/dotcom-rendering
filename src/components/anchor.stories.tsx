// ----- Imports ----- //

import React, {FC} from 'react';
import Anchor from "./anchor";
import {text, withKnobs} from "@storybook/addon-knobs";
import { Pillar, Design, Display } from '@guardian/types/Format';
import {selectPillar} from "../storybookHelpers";

// ----- Setup ----- //

const link = (): string =>
    text('Link', 'https://theguardian.com');

const copy = (): string =>
    text('Copy', '“everything that was recommended was done”.');

// ----- Stories ----- //

const Default: FC = () =>
    <Anchor
        format={{
            design: Design.Article,
            display: Display.Standard,
            theme: selectPillar(Pillar.News)
        }}
        href={link()}
    >
        {copy()}
    </Anchor>;


// ----- Exports ----- //

export default {
    component: Anchor,
    title: 'Anchor',
    decorators: [ withKnobs ],
}

export {
    Default,
}
