// ----- Imports ----- //

import React, { FC } from 'react';
import { withKnobs } from '@storybook/addon-knobs';

import Follow from './follow';
import { Pillar, Design, Display } from '@guardian/types/Format';
import { selectPillar } from 'storybookHelpers';
import { none } from '@guardian/types/option';


// ----- Stories ----- //

const Default: FC = () =>
    <Follow
        contributors={[
            {
                id: 'profile/janesmith',
                apiUrl: 'janesmith.com',
                name: 'Jane Smith',
                image: none,
            }
        ]}
        theme={selectPillar(Pillar.News)}
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
