// ----- Imports ----- //

import React, { ReactNode } from 'react';
import { css } from '@emotion/core';
import { neutral, background } from '@guardian/src-foundations/palette';
import { from, breakpoints } from '@guardian/src-foundations/mq';

import Series from 'components/series';
import Headline from 'components/headline';
import Standfirst from 'components/standfirst';
import Body from 'components/shared/articleBody';
import Metadata from 'components/metadata';
import { darkModeCss, articleWidthStyles } from 'styles';
import { Keyline } from 'components/shared/keyline';
import HeaderMedia from 'headerMedia';
import { AdvertisementFeature } from 'item';
import Logo from './logo';
import { withDefault, map } from '@guardian/types/option';
import { pipe2 } from 'lib';


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
    item: AdvertisementFeature;
    children: ReactNode[];
}

const AdvertisementFeature = ({ item, children }: Props): JSX.Element => {
    return <main css={[Styles, DarkStyles]}>
        <article css={BorderStyles}>
            <header>
                <HeaderMedia item={item}/>
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
                    {pipe2(item.logo, map(props => <Logo logo={props} />), withDefault(<></>))}
                </section>
            </header>
            <Body className={[articleWidthStyles]} format={item}>
                {children}
            </Body>
        </article>
    </main>
}


// ----- Exports ----- //

export default AdvertisementFeature;
