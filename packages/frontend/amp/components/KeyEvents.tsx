import React from 'react';
import { css } from 'emotion';
import { headline } from '@guardian/pasteup/typography';
import { palette } from '@guardian/pasteup/palette';
import { pillarPalette } from '@frontend/lib/pillars';
import DownArrow from '@guardian/pasteup/icons/down-arrow.svg';
import { blockLink } from '@frontend/amp/lib/block-link';

const headingStyle = css`
    ${headline(3)};
    background-color: ${palette.neutral[100]};
    padding: 0.375rem 0.625rem;

    span {
        background-color: #767676;
        float: right;
        position: relative;
    }

    svg {
        fill: ${palette.neutral[100]};
        color: black;
        display: block;
    }
`;

const listItemStyle = css`
    display: table;
    width: 100%;
    overflow: hidden;
    min-height: 2.5rem;
    border-bottom: 0.0625rem solid #dcdcdc;
    padding: 0.125rem 0 0.375rem;
`;

const timeStyle = css`
    font-size: 0.8125rem;
    line-height: 1.125rem;
    font-family: 'Guardian Text Sans Web', 'Helvetica Neue', Helvetica, Arial,
        'Lucida Grande', sans-serif;
    display: table-cell;
    width: 6.75rem;
    font-weight: bold;
`;

const listTitleStyle = (pillar: Pillar) => css`
    color: ${pillarPalette[pillar].main};
    display: table-cell;
`;

const wrapper = css`
    margin-bottom: 6px;
`;

// TODO text link style shouldn't be here
const eventLinkStyle = css`
    display: block;
    text-decoration: none;
`;

const listStyle = css`
    padding: 0.375rem 0.625rem;
`;

export const KeyEvents: React.SFC<{
    events: Block[];
    pillar: Pillar;
    url: string;
}> = ({ events, pillar, url }) => {
    if (!events || events.length < 1) {
        return null;
    }

    const lis = events.map(event => (
        <li className={listItemStyle} key={event.id}>
            <a className={eventLinkStyle} href={blockLink(url, event.id)}>
                <span className={timeStyle}>{event.createdOnDisplay}</span>
                <span className={listTitleStyle(pillar)}>
                    {event.title || ''}
                </span>
            </a>
        </li>
    ));

    return (
        <amp-accordion class={wrapper}>
            <section>
                <h2 className={headingStyle}>
                    Key events{' '}
                    <span>
                        <DownArrow />
                    </span>
                </h2>
                <ul className={listStyle}>{lis}</ul>
            </section>
        </amp-accordion>
    );
};
