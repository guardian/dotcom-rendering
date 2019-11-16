import React from 'react';
import { css, cx } from 'emotion';

import { palette } from '@guardian/src-foundations';

import { CardWrapper } from './CardWrapper';
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

const imageStyles = css`
    img {
        width: 100%;
        display: block;
    }
`;

const flex = (flexNum: number) =>
    css`
        flex: ${flexNum};
    `;

const HorizonalLayout = ({
    children,
}: {
    children: JSX.Element | JSX.Element[];
}) => (
    <div
        className={css`
            display: flex;
            flex-direction: row;
            height: 100%;
        `}
    >
        {children}
    </div>
);

type CardImageType = {
    element: ImageBlockElement;
    position?: 'left' | 'top';
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
    const Layout = image && image.position === 'left' ? HorizonalLayout : 'div';
    return (
        <li className={listStyles}>
            <a
                href={linkTo}
                className={linkStyles({
                    backgroundColour: palette.neutral[93],
                    backgroundOnHover: palette.neutral[86],
                })}
            >
                <Layout>
                    <>
                        {image && (
                            <div className={cx(imageStyles, flex(1))}>
                                <ImageComponent
                                    element={image.element}
                                    pillar={pillar}
                                    hideCaption={true}
                                />
                            </div>
                        )}
                        <div className={flex(3)}>
                            <CardWrapper topBarColour={palette[pillar].main}>
                                <SmallHeadline
                                    pillar={pillar}
                                    headlineString={headlineString}
                                    prefix={prefix}
                                />
                            </CardWrapper>
                        </div>
                    </>
                </Layout>
            </a>
        </li>
    );
};
