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

type CardImageType = {
    element: ImageBlockElement;
    position?: 'left' | 'top' | 'right';
};

type Props = {
    linkTo: string;
    pillar: Pillar;
    headlineString: string;
    prefix?: PrefixType;
    image?: CardImageType;
    size?: CardSizeType;
};

export const Card = ({
    linkTo,
    pillar,
    headlineString,
    prefix,
    image,
    size = 'small',
}: Props) => {
    const Layout = decideLayout(image);
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
                                <ImageWrapper size={size}>
                                    <ImageComponent
                                        element={image.element}
                                        pillar={pillar}
                                        hideCaption={true}
                                    />
                                </ImageWrapper>
                            )}
                            <HeadlineWrapper size={size}>
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
