// ----- Imports ----- //

import React, { ReactNode } from 'react';
import { css } from '@emotion/core';
import { neutral, background } from '@guardian/src-foundations/palette';
import { from, breakpoints } from '@guardian/src-foundations/mq';

import HeaderImage from 'components/headerImage';
import Series from 'components/series';
import Headline from 'components/headline';
import Standfirst from 'components/standfirst';
import Body from 'components/shared/articleBody';
import Metadata from 'components/metadata';
import { darkModeCss, articleWidthStyles } from 'styles';
import { Keyline } from 'components/shared/keyline';
import { Standard, getFormat } from 'item';


// ----- Styles ----- //

const Styles = css`
    background: ${neutral[97]};
`;

const DarkStyles = darkModeCss`
    background: ${background.inverse};
`;

const BorderStyles = css`
    background: ${neutral[100]};
    ${darkModeCss`background: ${background.inverse};`}

    ${from.wide} {
        width: ${breakpoints.wide}px;
        margin: 0 auto;
    }
`;


// ----- Component ----- //

interface Props {
    item: Standard;
    children: ReactNode[];
}

const AdvertisementFeature = ({ item, children }: Props): JSX.Element => {
    return <main css={[Styles, DarkStyles]}>
        <article css={BorderStyles}>
            <header>
                <HeaderImage
                    image={item.mainImage}
                    format={getFormat(item)}
                />
                <div>
                    <Series item={item} />
                    <Headline item={item} />
                    <div css={articleWidthStyles}>
                        <Standfirst item={item} />
                    </div>
                </div>
                <Keyline {...item} />
                <section css={articleWidthStyles}>
                    <Metadata item={item} />
                </section>
            </header>
            <Body className={[articleWidthStyles]}>
                {children}
            </Body>
        </article>
    </main>
}


// ----- Exports ----- //

export default AdvertisementFeature;
