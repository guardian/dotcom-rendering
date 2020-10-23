// ----- Imports ----- //

import React, { FC } from 'react';
import { withKnobs } from '@storybook/addon-knobs';
import { Design, Display, Pillar } from '@guardian/types/Format';

import { selectPillar } from 'storybookHelpers';
import Bullet from './bullet';


// ----- Stories ----- //

const Default: FC = () =>
    <Bullet
        format={{
            design: Design.Article,
            display: Display.Standard,
            theme: selectPillar(Pillar.News),
        }}
        text="• Lorem ipsum"
    />


// ----- Exports ----- //

export default {
    component: Bullet,
    title: 'Bullet',
    decorators: [ withKnobs ],
}

export {
    Default,
}
