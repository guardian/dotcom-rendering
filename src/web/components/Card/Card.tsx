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
    display: flex;

    /* We absolutely position the 1 pixel top bar in
       the card so this is required here */
    position: relative;

    /* Set spacing margins on the li element */
    margin-left: 10px;
    margin-right: 10px;
    margin-bottom: 12px;
`;

const fullWidthImage = css`
    img {
        width: 100%;
        display: block;
    }
`;

const flex = (flexNum: number) =>
    css`
        flex: ${flexNum};
    `;

type Props = {
    linkTo: string;
    pillar: Pillar;
    headlineString: string;
    prefix?: PrefixType;
    image?: ImageBlockElement;
    direction?: 'column' | 'row';
};

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

export const Card = ({
    linkTo,
    pillar,
    headlineString,
    prefix,
    image,
    direction = 'column',
}: Props) => {
    const Layout = direction === 'column' ? 'div' : HorizonalLayout;
    return (
        <li className={listStyles}>
            {/* tslint:disable-next-line:react-a11y-anchors */}
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
                            <div className={cx(fullWidthImage, flex(1))}>
                                <ImageComponent
                                    element={image}
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
