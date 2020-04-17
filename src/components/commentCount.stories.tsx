// ----- Imports ----- //

import React, { FC } from 'react';
import { withKnobs, number, boolean } from '@storybook/addon-knobs';

import CommentCount from './commentCount';
import { Pillar, Design, Display } from 'format';
import { selectPillar } from 'storybookHelpers';


// ----- Stories ----- //

const Default: FC = () =>
    <CommentCount
        count={number('Count', 1234, { min: 0 })}
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
