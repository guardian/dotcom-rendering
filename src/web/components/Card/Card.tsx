import React from 'react';
import { css } from 'emotion';

import { palette } from '@guardian/src-foundations';

import { HeadlineWrapper } from './HeadlineWrapper';
import { ImageLeftLayout } from './ImageLeftLayout';
import { ImageRightLayout } from './ImageRightLayout';
import { ImageWrapper } from './ImageWrapper';
import { TopBar } from './TopBar';

import { SmallHeadline } from '@frontend/web/components/SmallHeadline';
import { ImageComponent } from '@frontend/web/components/elements/ImageComponent';

const linkStyles = ({
    backgroundColour,
    backgroundOnHover,
}: {
    backgroundColour: string;
    backgroundOnHover: string;
}) => css`
    /* a tag specific styles */
    color: inherit;
    text-decoration: none;

    /* The whole card is one link so we card level styles here */
    width: 100%;
    background-color: ${backgroundColour};
    :hover {
        background-color: ${backgroundOnHover};
    }

    /* Sometimes a headline contains it's own link so we use the
       approach described below to deal with nested links
       See: https://css-tricks.com/nested-links/ */
    :before {
        content: '';
        position: absolute;
        left: 0;
        top: 0;
        right: 0;
        bottom: 0;
    }
`;

const listStyles = css`
    /* Here we ensure the card stretches to fill the containing space */
    flex-basis: 100%;
    /* display block here prevents that annoying bar at the bottom of the image problem
    we might be able to remove this if this is already set in global css */
    display: flex;

    /* We absolutely position the 1 pixel top bar in
       the card so this is required here */
    position: relative;

    /* Set spacing margins on the li element */
    margin-left: 10px;
    margin-right: 10px;
    margin-bottom: 12px;
`;

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
        <li className={listStyles}>
            <a
                href={linkTo}
                className={linkStyles({
                    backgroundColour: palette.neutral[93],
                    backgroundOnHover: palette.neutral[86],
                })}
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
            </a>
        </li>
    );
};
