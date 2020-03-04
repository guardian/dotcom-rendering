// ----- Imports ----- //

import React, { FC } from 'react';

import Paragraph from './paragraph';


// ----- Stories ----- //

const Default: FC = () =>
    <Paragraph>
        Ever since Mexico City was founded on an island in the lake of Texcoco its inhabitants have dreamed of water: containing it, draining it and now retaining it.
    </Paragraph>


// ----- Exports ----- //

export default {
    component: Paragraph,
    title: 'Paragraph',
}

export {
    Default,
}
