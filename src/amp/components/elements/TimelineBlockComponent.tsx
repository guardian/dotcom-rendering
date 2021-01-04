import React from 'react';
import { renderToStaticMarkup } from 'react-dom/server';
import { Expandable } from '@root/src/amp/components/Expandable';
import { css, cx } from 'emotion';
import { palette } from '@guardian/src-foundations';

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
    background-color: ${palette.brandAlt[400]};
`;

const eventIconStyle = css`
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

const headingStyle = css`
    font-weight: bold;
`;

const getHTML = (events: TimelineEvent[], description?: string): string => {
    const eventMarkup = events.map((e) => (
        <li className={eventStyle} key={e.title}>
            <time className={cx(eventIconStyle, highlight)}>{e.date}</time>
            {e.toDate && (
                <>
                    {' '}
                    - <time className={highlight}>{e.toDate}</time>
                </>
            )}
            <div>
                <h3 className={headingStyle}>{e.title}</h3>
                <div
                    dangerouslySetInnerHTML={{
                        __html: e.body || '',
                    }}
                />
            </div>
        </li>
    ));

    const eventString = renderToStaticMarkup(
        <ul className={eventsWrapper}>{eventMarkup}</ul>,
    );

    return (description || '') + eventString;
};

export const TimelineBlockComponent: React.FC<{
    id: string;
    title: string;
    description?: string;
    events: TimelineEvent[];
    pillar: CAPIPillar;
}> = ({ id, title, description, events, pillar }) => (
    <Expandable
        id={id}
        type="Timeline"
        title={title}
        html={getHTML(events, description)}
        pillar={pillar}
    />
);
