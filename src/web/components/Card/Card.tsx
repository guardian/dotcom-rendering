import React from 'react';

import { palette } from '@guardian/src-foundations';

import { SmallHeadline } from '@frontend/web/components/SmallHeadline';
import { Standfirst } from '@frontend/web/components/Standfirst';
import { ImageComponent } from '@frontend/web/components/elements/ImageComponent';

import { ContentWrapper } from './components/ContentWrapper';
import { HeadlineWrapper } from './components/HeadlineWrapper';
import { ImageTopLayout } from './components/ImageTopLayout';
import { ImageLeftLayout } from './components/ImageLeftLayout';
import { ImageRightLayout } from './components/ImageRightLayout';
import { ImageWrapper } from './components/ImageWrapper';
import { StandfirstWrapper } from './components/StandfirstWrapper';
import { TopBar } from './components/TopBar';
import { CardLink } from './components/CardLink';
import { CardListItem } from './components/CardListItem';
import { CardAge } from './components/CardAge';

const decideLayout = (image?: CardImageType) => {
    if (!image) {
        return ImageTopLayout;
    }
    switch (image.position) {
        case 'top':
            return ImageTopLayout;
        case 'left':
            return ImageLeftLayout;
        case 'right':
            return ImageRightLayout;
        default:
            return ImageTopLayout;
    }
};

type CoveragesType = {
    image: {
        small: CardPercentageType;
        medium: CardPercentageType;
        large: CardPercentageType;
    };
    content: {
        small: CardPercentageType;
        medium: CardPercentageType;
        large: CardPercentageType;
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
    webPublicationDate?: string;
    prefix?: PrefixType;
    image?: CardImageType;
    standfirst?: string;
};

export const Card = ({
    linkTo,
    pillar,
    headlineString,
    webPublicationDate,
    prefix,
    image,
    standfirst,
}: Props) => {
    // The choice of layout affects where any image is placed
    const Layout = decideLayout(image);

    // If there was no image given or image size was not set, percentage is null and
    // no flex-basis property is set in the wrappers, so content flows normally
    const imageCoverage =
        (image && image.size && coverages.image[image.size]) || '50%';
    const contentCoverage =
        (image && image.size && coverages.content[image.size]) || '50%';

    const spaceContent = !image || (image && image.position === 'top');

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
                                <ImageWrapper percentage={imageCoverage}>
                                    <ImageComponent
                                        element={image.element}
                                        pillar={pillar}
                                        hideCaption={true}
                                    />
                                </ImageWrapper>
                            )}
                            <ContentWrapper
                                percentage={contentCoverage}
                                spaceContent={spaceContent}
                            >
                                <HeadlineWrapper>
                                    <SmallHeadline
                                        pillar={pillar}
                                        headlineString={headlineString}
                                        prefix={prefix}
                                    />
                                </HeadlineWrapper>
                                <div>
                                    {standfirst && (
                                        <StandfirstWrapper>
                                            <Standfirst
                                                pillar={pillar}
                                                standfirst={standfirst}
                                            />
                                        </StandfirstWrapper>
                                    )}
                                    {webPublicationDate && (
                                        <CardAge
                                            webPublicationDate={
                                                webPublicationDate
                                            }
                                        />
                                    )}
                                </div>
                            </ContentWrapper>
                        </>
                    </Layout>
                </TopBar>
            </CardLink>
        </CardListItem>
    );
};
