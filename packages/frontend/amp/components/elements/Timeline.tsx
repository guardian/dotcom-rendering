import React from 'react';
import { renderToStaticMarkup } from 'react-dom/server';
import { Expandable } from '@frontend/amp/components/Expandable';
import { css } from 'emotion';
import { palette } from '@guardian/pasteup/palette';

const eventsWrapper = css`
    margin-left: 8px;

    li:not(:last-child) {
        border-left: 1px solid rgba(220, 220, 220, 0.5);
    }
`;

const eventStyle = css`
    padding-left: 17px;
    padding-bottom: 16px;
`;

const highlight = css`
    background-color: ${palette.highlight.main};
`;

const eventIconStyle = css`
    ${highlight}

    :before {
        content: '';
        width: 16px;
        height: 16px;
        border-radius: 100%;
        float: left;
        margin-left: -25px;
        background-color: ${palette.neutral[7]};
    }
`;

const getHTML = (events: TimelineEvent[], description?: string): string => {
    // TODO using ternary as && doesn't seem to work here - it prints out undefined
    const eventMarkup = events.map(e => (
        <li className={eventStyle}>
            <time className={eventIconStyle}>{e.date}</time>
            {e.toDate && (
                <>
                    {' '}
                    - <time className={highlight}>{e.toDate}</time>
                </>
            )}
            <div>
                <b>{e.title}</b>
                <div // tslint:disable-line:react-no-dangerous-html
                    dangerouslySetInnerHTML={{
                        __html: e.body || '',
                    }}
                />
                <div />
            </div>
        </li>
    ));

    const eventString = renderToStaticMarkup(
        <ul className={eventsWrapper}>{eventMarkup}</ul>,
    );

    return (description || '') + eventString;
};

export const Timeline: React.FC<{
    id: string;
    title: string;
    description?: string;
    events: TimelineEvent[];
    pillar: Pillar;
}> = ({ id, title, description, events, pillar }) => (
    <Expandable
        id={id}
        type="Timeline"
        title={title}
        html={getHTML(events, description)}
        pillar={pillar}
    />
);
