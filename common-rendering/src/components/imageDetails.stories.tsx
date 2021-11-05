// ----- Imports ----- //

import { some } from '@guardian/types';
import type { FC } from 'react';

import ImageDetails from './imageDetails';

// ----- Stories ----- //

const Default: FC = () =>
    <ImageDetails
        caption={some('A caption')}
        credit={some('By a person')}
        supportsDarkMode
        id="caption-id"
    />

// ----- Exports ----- //

export default {
    component: ImageDetails,
    title: 'Common/Components/ImageDetails',
}

export {
    Default,
}
