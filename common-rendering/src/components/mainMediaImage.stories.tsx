// ----- Imports ----- //

import type { FC } from 'react';
import MainMediaImage from './mainMediaImage';
import { image } from '@guardian/common-rendering/src/fixtures/image';
import { ArticleDesign, ArticleDisplay, ArticlePillar } from '@guardian/libs';

// ----- Stories ----- //

const Default: FC = () =>
    <MainMediaImage
        caption="This is a main media image"
        credit="A photographer"
        supportsDarkMode
        lightbox={null}
        format={{
            design: ArticleDesign.Standard,
            display: ArticleDisplay.Standard,
            theme: ArticlePillar.News,
        }}
        image={image}
    />

// ----- Exports ----- //

export default {
    component: Image,
    title: 'Common/Components/MainMediaImage',
}

export {
    Default,
}
