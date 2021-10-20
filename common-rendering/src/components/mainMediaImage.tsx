// ----- Imports ----- //

import { css } from '@emotion/react';
import type { SerializedStyles } from '@emotion/react';
import type { FC, ReactNode } from 'react';
import ImageDetails from '@guardian/common-rendering/src/components/imageDetails';
import { fromNullable, none } from '@guardian/types';
import Img from '@guardian/common-rendering/src/components/img';
import type { Lightbox } from '@guardian/common-rendering/src/lightbox';
import type { Sizes } from '@guardian/common-rendering/src/sizes';
import type { Image } from '@guardian/common-rendering/src/image';
import { from } from '@guardian/src-foundations/mq';
import { ArticleDesign, ArticleFormat } from '@guardian/libs';

// ----- Setup ----- //

const captionId = 'main-media-caption';
const desktopWidth = 43.75;

// ----- Component ----- //

const sizes = (format: ArticleFormat): Sizes => {
    switch (format.design) {
        case ArticleDesign.LiveBlog:
        case ArticleDesign.DeadBlog:            
        default:
            return {
                mediaQueries: [
                    // Centre column from here up, which is 700px wide
                    { breakpoint: "desktop", size: `${desktopWidth}rem` }
                ],
                // Image is full width of the screen at narrower breakpoints
                default: '100vw',
            };
    }
}

const styles: SerializedStyles = css`
    position: relative;

    ${from.desktop} {
        width: ${desktopWidth}rem;
    }
`;

interface Props {
    caption: ReactNode | null;
    credit: string | null;
    supportsDarkMode: boolean;
    lightbox: Lightbox | null;
    format: ArticleFormat;
    image: Image;
}

const MainMediaImage: FC<Props> = ({
    caption,
    credit,
    supportsDarkMode,
    lightbox,
    format,
    image,
}) =>
    <figure css={styles} aria-labelledby={captionId}>
        <Img
            format={format}
            supportsDarkMode={supportsDarkMode}
            lightbox={fromNullable(lightbox)}
            sizes={sizes(format)}
            className={none}
            image={image}
        />
        <ImageDetails
            caption={fromNullable(caption)}
            credit={fromNullable(credit)}
            supportsDarkMode={supportsDarkMode}
            id={captionId}
        />
    </figure>

// ----- Exports ----- //

export default MainMediaImage;
