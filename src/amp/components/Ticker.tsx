import React from 'react';
import { css } from 'emotion';

import { headline, body } from '@guardian/src-foundations/typography';
import { neutral, brandAlt } from '@guardian/src-foundations/palette';

const tickerWrapperStyle = css`
    margin-bottom: 20px;
`;
const leftStyle = css`
    text-align: left;
    display: flex;
    flex-wrap: nowrap;
    flex-direction: column;
    justify-content: flex-end;
`;
const rightStyle = css`
    text-align: right;
    display: flex;
    flex-wrap: nowrap;
    flex-direction: column;
    justify-content: flex-end;
`;
const tickerInfoStyle = css`
    display: flex;
    flex-wrap: nowrap;
    flex-direction: row;
    justify-content: space-between;
`;
const tickerProgressStyle = css`
    position: absolute;
    margin: 0;
    padding: 0;
    left: 0;
    background-color: ${brandAlt[400]};
    height: 100%;
`;
const tickerBackgroundStyle = css`
    position: relative;
    margin: 5px 0;
    height: 10px;
    width: 100%;
    background-color: ${neutral[86]};
    border: none;
`;
const currentAmountStyle = css`
    ${headline.xsmall({ fontWeight: 'bold' })}
`;
const goalAmountStyle = css`
    ${headline.xxxsmall({ fontWeight: 'bold' })}
`;
const amountCaptionStyle = css`
    ${body.small({ fontStyle: 'italic' })};
`;

export const Ticker: React.FC<{
    percentage: string;
    topLeft: string;
    bottomLeft: string;
    topRight: string;
    bottomRight: string;
}> = ({ percentage, topLeft, bottomLeft, topRight, bottomRight }) => {
    return (
        <div>
            <div className={tickerWrapperStyle}>
                <div className={tickerInfoStyle}>
                    <div className={leftStyle}>
                        <p className={currentAmountStyle}>{topLeft}</p>
                        <p className={amountCaptionStyle}>{bottomLeft}</p>
                    </div>
                    <div className={rightStyle}>
                        <p className={goalAmountStyle}>{topRight}</p>
                        <p className={amountCaptionStyle}>{bottomRight}</p>
                    </div>
                </div>
                <div className={tickerBackgroundStyle}>
                    <div
                        className={tickerProgressStyle}
                        style={{ width: `${percentage}%` }}
                    />
                </div>
            </div>
        </div>
    );
};
