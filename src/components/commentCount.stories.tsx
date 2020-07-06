// ----- Imports ----- //

import React, { FC } from 'react';
import { withKnobs, boolean } from '@storybook/addon-knobs';

import CommentCount from './commentCount';
import { Pillar, Design, Display } from 'format';
import { selectPillar } from 'storybookHelpers';
import { some } from 'types/option';


// ----- Stories ----- //

const Default: FC = () =>
    <CommentCount
        count={some(1234)}
        pillar={selectPillar(Pillar.News)}
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
