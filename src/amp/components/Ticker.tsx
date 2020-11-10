import React from 'react';
import { css } from 'emotion';

import { headline } from '@guardian/src-foundations/typography';
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
    ${headline.xxsmall()};
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
    font-style: normal;
    font-weight: 700;
    font-size: 24px;
`;
const goalAmountStyle = css`
    font-weight: 600;
    font-style: normal;
    font-size: 16px;
`;
const amountCaptionStyle = css`
    font-weight:500;
    font-style: italic;
    font-size: 16px;
`;

export const Ticker: React.FC<{
    percentage: string,
    currentAmountFigure: string,
    currentAmountCaption: string,
    goalAmountFigure: string,
    goalAmountCaption: string,
}> = ({
    percentage,
    currentAmountFigure,
    currentAmountCaption,
    goalAmountFigure,
    goalAmountCaption,
}) => {
    return (
        <div>
            <div className={tickerWrapperStyle}>
                <div className={tickerInfoStyle}>
                    <div className={leftStyle}>
                        <p className={currentAmountStyle}>{currentAmountFigure}</p>
                        <p className={amountCaptionStyle}>{currentAmountCaption}</p>
                    </div>
                    <div className={rightStyle}>
                        <p className={goalAmountStyle}>{goalAmountFigure}</p>
                        <p className={amountCaptionStyle}>{goalAmountCaption}</p>
                    </div>
                </div>
                <div className={tickerBackgroundStyle}>
                    <div className={tickerProgressStyle} style={{width: `${percentage}%`}} />
                </div>
            </div>
        </div>
    )
}
