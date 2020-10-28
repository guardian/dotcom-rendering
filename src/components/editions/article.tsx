// ----- Imports ----- //

import React, { FC } from 'react';
import { css } from '@emotion/core';
import { border } from '@guardian/src-foundations/palette';
import { remSpace } from '@guardian/src-foundations';
import { Lines } from '@guardian/src-ed-lines';
import { Design } from '@guardian/types/Format';
import { partition } from '@guardian/types/result';

import { Item } from 'item';
import { renderAll } from 'renderer';
import Standfirst from 'components/editions/standfirst';
import HeaderImage from 'components/editions/headerImage';
import Series from 'components/editions/series';
import Headline from 'components/editions/headline';
import Byline from 'components/editions/byline';


// ----- Component ----- //

interface Props {
    item: Item;
}

const headerStyles = css`
    margin: 0 ${remSpace[3]} ${remSpace[4]};
`;

const bodyStyles = css`
    border-top: 1px solid ${border.secondary};
    padding: 0 ${remSpace[4]};
`;

const Article: FC<Props> = ({ item }) => {
    if (item.design === Design.Live) {
        return <p>Not implemented</p>
    }

    return (
        <main>
            <article>
                <header css={headerStyles}>
                    <HeaderImage item={item} />
                    <Series item={item} />
                    <Headline item={item} />
                    <Standfirst item={item} />
                    <Lines />
                    <Byline item={item} />
                </header>
                <section css={bodyStyles}>
                    {renderAll(item, partition(item.body).oks)}
                </section>
            </article>
        </main>
    );
}


// ----- Exports ----- //

export default Article;
