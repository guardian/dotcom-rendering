import React from 'react';
import { css } from 'emotion';

import { palette } from '@guardian/src-foundations';

import { CardWrapper } from './CardWrapper';
import { SmallHeadline } from '@frontend/web/components/SmallHeadline';

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

    /* We absolutely position the 1 pixel top bar in
       the card so this is required here */
    position: relative;
`;

const listStyles = css`
    /* Here we ensure the card stretches to fill the containing space */
    flex-basis: 100%;
    display: flex;

    /* Set spacing margins on the li element */
    margin-left: 10px;
    margin-right: 10px;
    margin-bottom: 12px;
`;

type Props = {
    linkTo: string;
    pillar: Pillar;
    headlineString: string;
    prefix?: PrefixType;
};

export const Card = ({ linkTo, pillar, headlineString, prefix }: Props) => {
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
                <CardWrapper topBarColour={palette[pillar].main}>
                    <SmallHeadline
                        pillar={pillar}
                        headlineString={headlineString}
                        prefix={prefix}
                    />
                </CardWrapper>
            </a>
        </li>
    );
};
