import {css} from 'emotion';
import {headline} from '@guardian/src-foundations/typography';
import {neutral, brandAlt} from '@guardian/src-foundations/palette';
import React from 'react';

const tickerWrapper = css`
    margin-bottom: 20px;
`;
const left = css`
    text-align: left;
    display: flex;
    flex-wrap: nowrap;
    flex-direction: column;
    justify-content: flex-end;
`;
const right = css`
    text-align: right;
    display: flex;
    flex-wrap: nowrap;
    flex-direction: column;
    justify-content: flex-end;
`;
const tickerInfo = css`
    ${headline.xxsmall()};
    display: flex;
    flex-wrap: nowrap;
    flex-direction: row;
    justify-content: space-between;
`;
const tickerProgress = css`
    position: absolute;
    margin: 0;
    padding: 0;
    left: 0;
    background-color: ${brandAlt[400]} !important;
    height: 100%;
`;
const tickerBackground = css`
    position: relative;
    margin: 5px 0;
    height: 10px;
    width: 100%;
    background-color: ${neutral[86]};
    border: none;
`;
const currentAmount = css`
    font-style: normal;
    font-weight: 700;
    font-size: 24px !important;
`;
const goalAmount = css`
    font-weight: 600;
    font-style: normal;
    font-size: 16px !important;
`;
const amountCaption = css`
    font-weight:500;
    font-style: italic;
    font-size: 16px !important;
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
            <div className={tickerWrapper}>
                <div className={tickerInfo}>
                    <div className={left}>
                        <p className={currentAmount}>{currentAmountFigure}</p>
                        <p className={amountCaption}>{currentAmountCaption}</p>
                    </div>
                    <div className={right}>
                        <p className={goalAmount}>{goalAmountFigure}</p>
                        <p className={amountCaption}>{goalAmountCaption}</p>
                    </div>
                </div>
                <div className={tickerBackground}>
                    <div className={tickerProgress} style={{width: `${percentage}%`}} />
                </div>
            </div>
        </div>
    )
}
