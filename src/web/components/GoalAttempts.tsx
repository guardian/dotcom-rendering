import React from 'react';
import { css } from 'emotion';

import { headline, textSans } from '@guardian/src-foundations/typography';
import { text } from '@guardian/src-foundations/palette';

import { isLight } from '@frontend/web/lib/isLight';

type Props = {
    left: Section;
    right: Section;
    backgroundColour: string;
};

type Section = {
    onTarget: number;
    offTarget: number;
    color: string;
};

const Row = ({ children }: { children: JSX.Element | JSX.Element[] }) => (
    <div
        className={css`
            display: flex;
            flex-direction: row;
        `}
    >
        {children}
    </div>
);

const Side = ({
    offTarget,
    onTarget,
    teamColours,
    position,
    backgroundColour,
}: {
    offTarget: number;
    onTarget: number;
    teamColours: string;
    position: 'left' | 'right';
    backgroundColour: string;
}) => (
    <div
        className={css`
            position: relative;
            ${headline.medium({ fontWeight: 'bold' })}
            color: ${
                isLight(teamColours) ? text.ctaSecondary : text.ctaPrimary
            };
            background: ${teamColours};
            flex-basis: 50% ;
            line-height: 0.8;

            height: 132px;

            background-image: url('data:image/svg+xml, %3Csvg%20width%3D%229%22%20height%3D%2212%22%20viewBox%3D%220%200%209%2012%22%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%3E%3Cg%20fill%3D%22rgba%28255%2C%20255%2C%20255%2C%200.3%29%22%3E%3Ccircle%20cx%3D%221.5%22%20cy%3D%221.5%22%20r%3D%221%22%2F%3E%3Ccircle%20cx%3D%221.5%22%20cy%3D%224.5%22%20r%3D%221%22%2F%3E%3Ccircle%20cx%3D%221.5%22%20cy%3D%227.5%22%20r%3D%221%22%2F%3E%3Ccircle%20cx%3D%221.5%22%20cy%3D%2210.5%22%20r%3D%221%22%2F%3E%3Ccircle%20cx%3D%224.5%22%20cy%3D%221.5%22%20r%3D%221%22%2F%3E%3Ccircle%20cx%3D%224.5%22%20cy%3D%224.5%22%20r%3D%221%22%2F%3E%3Ccircle%20cx%3D%224.5%22%20cy%3D%227.5%22%20r%3D%221%22%2F%3E%3Ccircle%20cx%3D%224.5%22%20cy%3D%2210.5%22%20r%3D%221%22%2F%3E%3Ccircle%20cx%3D%227.5%22%20cy%3D%221.5%22%20r%3D%221%22%2F%3E%3Ccircle%20cx%3D%227.5%22%20cy%3D%224.5%22%20r%3D%221%22%2F%3E%3Ccircle%20cx%3D%227.5%22%20cy%3D%227.5%22%20r%3D%221%22%2F%3E%3Ccircle%20cx%3D%227.5%22%20cy%3D%2210.5%22%20r%3D%221%22%2F%3E%3C%2Fg%3E%3C%2Fsvg%3E');
            background-repeat: repeat;
            background-size: 0.625rem;
            background-position-x: 0;

            padding-top: 1px;
            padding-left: 6px;
            padding-right: 6px;
            padding-bottom: 9px;

            text-align: ${position === 'left' ? 'left' : 'right'};
        `}
    >
        {offTarget}
        <div
            className={css`
                ${textSans.small()}
                padding-top: 4px;
            `}
        >
            {position === 'left' && 'Off target'}
        </div>
        <div
            className={css`
                position: absolute;
                bottom: 0;
                left: ${position === 'right' && 0};
                right: ${position === 'left' && 0};

                background: ${teamColours};

                text-align: ${position === 'left' ? 'left' : 'right'};

                padding-left: 4px;
                padding-right: 4px;

                height: 70px;
                width: 92px;

                border-top: 8px solid ${backgroundColour};
                border-left: ${position === 'left' &&
                    `8px solid ${backgroundColour}`};
                border-right: ${position === 'right' &&
                    `8px solid ${backgroundColour}`};
            `}
        >
            {onTarget}
            <div
                className={css`
                    ${textSans.small()}
                    padding-top: 4px;
                `}
            >
                {position === 'left' && 'On target'}
            </div>
        </div>
    </div>
);

export const GoalAttempts = ({ left, right, backgroundColour }: Props) => {
    return (
        <Row>
            <Side
                position="left"
                offTarget={left.offTarget}
                onTarget={left.onTarget}
                teamColours={left.color}
                backgroundColour={backgroundColour}
            />
            <Side
                position="right"
                offTarget={right.offTarget}
                onTarget={right.onTarget}
                teamColours={right.color}
                backgroundColour={backgroundColour}
            />
        </Row>
    );
};
