import React from 'react';

import { palette } from '@guardian/src-foundations';

import { SmallHeadline } from '@frontend/web/components/SmallHeadline';
import { Standfirst } from '@frontend/web/components/Standfirst';
import { ImageComponent } from '@frontend/web/components/elements/ImageComponent';

import { ContentWrapper } from './components/ContentWrapper';
import { HeadlineWrapper } from './components/HeadlineWrapper';
import { ImageLeftLayout } from './components/ImageLeftLayout';
import { ImageRightLayout } from './components/ImageRightLayout';
import { ImageWrapper } from './components/ImageWrapper';
import { StandfirstWrapper } from './components/StandfirstWrapper';
import { TopBar } from './components/TopBar';
import { CardLink } from './components/CardLink';
import { CardListItem } from './components/CardListItem';

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
    content: {
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
    content: {
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
    standfirst?: string;
};

export const Card = ({
    linkTo,
    pillar,
    headlineString,
    prefix,
    image,
    standfirst,
}: Props) => {
    // The choice of layout affects where any image is placed
    const Layout = decideLayout(image);

    // If there was no image given or image size was not set, coverage is null and
    // no flex-basis property is set in the wrappers, so content flows normally
    const imageCoverage = image && image.size && coverages.image[image.size];
    const contentCoverage =
        image && image.size && coverages.content[image.size];

    return (
        <CardListItem>
            <CardLink
                linkTo={linkTo}
                backgroundColour={palette.neutral[97]}
                backgroundOnHover={palette.neutral[93]}
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
                            <ContentWrapper coverage={contentCoverage}>
                                <>
                                    <HeadlineWrapper>
                                        <SmallHeadline
                                            pillar={pillar}
                                            headlineString={headlineString}
                                            prefix={prefix}
                                        />
                                    </HeadlineWrapper>
                                    {standfirst && (
                                        <StandfirstWrapper>
                                            <Standfirst
                                                pillar={pillar}
                                                standfirst={standfirst}
                                            />
                                        </StandfirstWrapper>
                                    )}
                                </>
                            </ContentWrapper>
                        </>
                    </Layout>
                </TopBar>
            </CardLink>
        </CardListItem>
    );
};
