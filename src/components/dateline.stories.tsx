// ----- Imports ----- //

import React, { FC } from 'react';
import { date, withKnobs } from '@storybook/addon-knobs';

import { some } from '@guardian/types/option';
import Dateline from './dateline';


// ----- Stories ----- //

const Default: FC = () =>
    <Dateline date={some(new Date(date('Publish Date', new Date('2019-12-17T03:24:00'))))} />


// ----- Exports ----- //

export default {
    component: Dateline,
    title: 'Dateline',
    decorators: [ withKnobs ],
}

export {
    Default,
}
