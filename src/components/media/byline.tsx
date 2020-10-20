// ----- Imports ----- //

import React, { ReactNode, FC } from 'react';
import { css, SerializedStyles } from '@emotion/core';
import { neutral } from '@guardian/src-foundations/palette';
import { Option, map, withDefault } from '@guardian/types/option';
import { Item, getFormat } from 'item';
import { textSans } from "@guardian/src-foundations/typography";
import { renderText } from "../../renderer";
import { remSpace } from "@guardian/src-foundations";
import Dateline from 'components/dateline';
import { pipe2 } from 'lib';


// ----- Styles ----- //

const styles: SerializedStyles = css`
    .author {
        margin: ${remSpace[2]} 0 ${remSpace[3]} 0;
        color: ${neutral[86]};

        .follow, a {
            color: ${neutral[86]};
        }

        time, .follow {
            ${textSans.xsmall()}
        }

        time {
            ${textSans.xsmall()};
            color: ${neutral[86]};
        }
    }
`;


// ----- Component ----- //

interface Props {
    publicationDate: Option<Date>;
    className: SerializedStyles;
    item: Item;
}

const Byline: FC<Props> = ({ publicationDate, className, item }) => {
    const byline = pipe2(
        item.bylineHtml,
        map(html => <address>{ renderText(html, getFormat(item)) }</address>),
        withDefault<ReactNode>(null),
    );

    return (
        <div css={[className, styles]}>
            <div>
                <div className="author">
                    { byline }
                    <Dateline date={publicationDate} theme={item.theme}/>
                </div>
            </div>
        </div>
    );
}


// ----- Exports ----- //

export default Byline;
