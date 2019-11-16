import React from 'react';

import { palette } from '@guardian/src-foundations';

import { HeadlineWrapper } from './HeadlineWrapper';
import { ImageLeftLayout } from './ImageLeftLayout';
import { ImageRightLayout } from './ImageRightLayout';
import { ImageWrapper } from './ImageWrapper';
import { TopBar } from './TopBar';
import { CardLink } from './CardLink';
import { CardListItem } from './CardListItem';

import { SmallHeadline } from '@frontend/web/components/SmallHeadline';
import { ImageComponent } from '@frontend/web/components/elements/ImageComponent';

const decideLayout = (image?: CardImageType) => {
    if (!image) {
        return 'div';
    }
    switch (image.position) {
        case 'top':
            return 'div';
        case 'left':
            return ImageLeftLayout;
        case 'right':
            return ImageRightLayout;
        default:
            return 'div';
    }
};

type CoveragesType = {
    image: {
        small: CardCoverageType;
        medium: CardCoverageType;
        large: CardCoverageType;
    };
    headline: {
        small: CardCoverageType;
        medium: CardCoverageType;
        large: CardCoverageType;
    };
};

const coverages: CoveragesType = {
    // coverages is how we set the image size relative to the space given
    // to the hedline. These percentages are passed to flex-basis inside the
    // wrapper components
    image: {
        small: '25%',
        medium: '50%',
        large: '67%',
    },
    headline: {
        small: '75%',
        medium: '50%',
        large: '33%',
    },
};

type CardImageType = {
    element: ImageBlockElement;
    position?: 'left' | 'top' | 'right';
    size?: ImageSizeType;
};

type Props = {
    linkTo: string;
    pillar: Pillar;
    headlineString: string;
    prefix?: PrefixType;
    image?: CardImageType;
};

export const Card = ({
    linkTo,
    pillar,
    headlineString,
    prefix,
    image,
}: Props) => {
    // The choice of layout affects where any image is placed
    const Layout = decideLayout(image);

    // If there was no image given or image size was not set, coverage is null and
    // no flex-basis property is set in the wrappers, so content flows normally
    const imageCoverage = image && image.size && coverages.image[image.size];
    const headlineCoverage =
        image && image.size && coverages.headline[image.size];

    return (
        <CardListItem>
            <CardLink
                linkTo={linkTo}
                backgroundColour={palette.neutral[93]}
                backgroundOnHover={palette.neutral[86]}
            >
                <TopBar topBarColour={palette[pillar].main}>
                    <Layout>
                        <>
                            {image && (
                                <ImageWrapper coverage={imageCoverage}>
                                    <ImageComponent
                                        element={image.element}
                                        pillar={pillar}
                                        hideCaption={true}
                                    />
                                </ImageWrapper>
                            )}
                            <HeadlineWrapper coverage={headlineCoverage}>
                                <SmallHeadline
                                    pillar={pillar}
                                    headlineString={headlineString}
                                    prefix={prefix}
                                />
                            </HeadlineWrapper>
                        </>
                    </Layout>
                </TopBar>
            </CardLink>
        </CardListItem>
    );
};
