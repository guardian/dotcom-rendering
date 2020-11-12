import React from 'react';
import { css } from 'emotion';

import { headline, body } from '@guardian/src-foundations/typography';
import { neutral, brandAlt } from '@guardian/src-foundations/palette';
import { AmpAnimation } from '@root/src/amp/components/AmpAnimation';

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
    left: -100%;
    background-color: ${brandAlt[400]};
    height: 100%;
    width: 100%;
    transform-origin: left;
`;
const tickerHiddenProgressStyle = css`
    height: 100%
    left 0;
    position: absolute;
    margin: 0;
    padding: 0;
    background: transparent;
    z-index: -1;
`;
const tickerBackgroundStyle = css`
    overflow: hidden;
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
    const progressAnimation =
        {
            "selector": "#ticker-progress",
            "duration": "1.5s",
            "iterations": "1",
            "fill": "forwards",
            "keyframes": { "transform": "translate(width('#ticker-hidden-progress'))" }
        }

    return (
        <div>
            <AmpAnimation animationRules={progressAnimation} />
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
                    <div id="ticker-hidden-progress" className={tickerHiddenProgressStyle} style={{width: `${percentage}%`}} />
                    <div id='ticker-progress' className={tickerProgressStyle} />
                </div>
            </div>
        </div>
    )
}
