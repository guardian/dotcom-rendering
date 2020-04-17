// ----- Imports ----- //

import React, { FC } from 'react';
import { withKnobs } from '@storybook/addon-knobs';

import Follow from './follow';
import { Pillar, Design, Display } from 'format';
import { selectPillar } from 'storybookHelpers';


// ----- Stories ----- //

const Default: FC = () =>
    <Follow
        contributors={[
            {
                id: 'profile/janesmith',
                apiUrl: 'janesmith.com',
                webTitle: 'Jane Smith',
            }
        ]}
        pillar={selectPillar(Pillar.News)}
        design={Design.Article}
        display={Display.Standard}
    />


// ----- Exports ----- //

export default {
    component: Follow,
    title: 'Follow',
    decorators: [ withKnobs ],
}

export {
    Default,
}
