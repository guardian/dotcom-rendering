// ----- Imports ----- //

import React, { FC } from 'react';
import { withKnobs, boolean, number } from '@storybook/addon-knobs';

import CommentCount from './commentCount';
import { Pillar, Design, Display } from '@guardian/types/Format';
import { selectPillar } from 'storybookHelpers';
import { some } from '@guardian/types/option';


// ----- Stories ----- //

const Default: FC = () =>
    <CommentCount
        count={some(number('Count', 1234, { min: 0 }))}
        theme={selectPillar(Pillar.News)}
        design={Design.Article}
        display={Display.Standard}
        commentable={boolean('Commentable', true)}
    />


// ----- Exports ----- //

export default {
    component: CommentCount,
    title: 'CommentCount',
    decorators: [ withKnobs ],
}

export {
    Default,
}
