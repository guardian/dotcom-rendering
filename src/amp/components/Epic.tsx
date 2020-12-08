import React from 'react';
import { css } from 'emotion';

import {
    MoustacheSection,
    MoustacheVariable,
    MoustacheTemplate,
    moustacheVariable,
} from '@root/src/amp/components/moustache';
import { palette } from '@guardian/src-foundations';
import { headline, body, textSans } from '@guardian/src-foundations/typography';
import { Ticker } from '@root/src/amp/components/Ticker';

const epic = css`
    border-top: 0.0625rem solid ${palette.brandAlt[400]};
    background-color: ${palette.neutral[97]};
    clear: left;
    margin-top: 1.5rem;
    margin-bottom: 1.5rem;
    padding: 0.25rem 0.3125rem 1rem;
`;
const epicHeader = css`
    font-size: 1.25rem;
    line-height: 1.4375rem;
    ${headline.xxsmall()};
    text-rendering: optimizeLegibility;
    font-kerning: normal;
    font-variant-ligatures: common-ligatures;
    font-weight: 900;
    margin-bottom: 0.75rem;
    -webkit-font-smoothing: antialiased;
`;
const epicParagraph = css`
    font-size: 1.1rem;
    display: block;
    margin-block-start: 0.5rem;
    margin-block-end: 0.5rem;

    ${body.medium()};
    text-rendering: optimizeLegibility;
    font-kerning: normal;
    font-variant-ligatures: common-ligatures;
    -webkit-font-smoothing: antialiased;
    vertical-align: 0%;
    line-height: 1.5;
    &::selection {
        background-color: ${palette.brandAlt[400]};
    }
    &:last-of-type {
        display: inline;
    }
`;
const highlightedText = css`
    font-size: 1.1rem;
    background-color: ${palette.brandAlt[400]};
    padding: 0.125rem;
    margin-left: 5px;
    color: ${palette.neutral[7]};
    ${headline.xxxsmall({ fontWeight: 'bold' })};
    text-rendering: optimizeLegibility;
    font-kerning: normal;
    font-variant-ligatures: common-ligatures;
    -webkit-font-smoothing: antialiased;
    vertical-align: 0%;
    line-height: 1.5;
    display: inline;
`;
const supportButton = css`
    background-color: ${palette.brandAlt[400]};
    color: ${palette.neutral[7]};
    display: inline-block;
    ${textSans.medium()};
    text-rendering: optimizeLegibility;
    font-kerning: normal;
    font-variant-ligatures: common-ligatures;
    -webkit-font-smoothing: antialiased;
    align-items: center;
    text-decoration: none;
    font-weight: 700;
    font-size: 1.1rem;
    height: 2.625rem;
    min-height: 2.625rem;
    padding: 0 1.3125rem;
    border: 0;
    border-radius: 1.3125rem;
    box-sizing: border-box;
    cursor: pointer;
    margin: 2rem 0.625rem 0.25rem 0;
    vertical-align: base;
    line-height: 2.625rem;
    transition: background-color 0.3s;
    text-align: centre;
    &:hover {
        background-color: ${palette.opinion[600]};
    }
`;
const arrow = css`
    margin-left: 0.5rem;
    position: relative;
    width: 1.3125rem;
    height: auto;
    display: inline;
    color: ${palette.neutral[7]};
    vertical-align: sub;
`;
const acceptedPaymentMethodsWrapper = css`
    margin-top: 0.5rem;
    margin-left: 0.5rem;
    display: block;
`;

const buildUrl = (
    contributionsUrl: string,
    articleUrl: string,
    campaignCode: string,
    componentId: string,
): string => {
    const acquisitionData = {
        source: 'GOOGLE_AMP',
        componentType: 'ACQUISITIONS_EPIC',
        componentId,
        campaignCode,
        referrerUrl: articleUrl,
    };
    return `${contributionsUrl}?INTCMP=${campaignCode}&acquisitionData=${JSON.stringify(
        acquisitionData,
    )}`;
};

export const Epic: React.FC<{ webURL: string }> = ({ webURL }) => {
    const epicUrl = 'http://localhost:3131/amp/epic?testData=VARIANTS';

    return (
        <div>
            <amp-list
                layout='fixed-height'
                // This means that if the user refreshes at the end of the article while the epic is in view then the epic
                // will not display. This is such an edge case that we can live with it, and in general it will fill the
                // space.
                height='1px'
                src={epicUrl}
                credentials='include'
                id="epic-container"
            >
                <MoustacheTemplate>
                    <div className={epic} data-is-epic-wrapper='true' id={moustacheVariable('variantName')}>
                        <MoustacheSection name="ticker">
                            <Ticker
                                percentage={moustacheVariable('percentage')}
                                topLeft={moustacheVariable('topLeft')}
                                bottomLeft={moustacheVariable('bottomLeft')}
                                topRight={moustacheVariable('topRight')}
                                bottomRight={moustacheVariable('bottomRight')}
                            />
                        </MoustacheSection>

                        <h2 className={epicHeader}>
                            <MoustacheVariable name="heading" />
                        </h2>
                        <MoustacheSection name="paragraphs">
                            <p className={epicParagraph}>
                                <MoustacheVariable name="." />
                            </p>
                        </MoustacheSection>
                        <span className={highlightedText}>
                            <MoustacheVariable name="highlightedText" />
                        </span>
                        <br />
                        <MoustacheSection name="cta">
                            <a
                                href={buildUrl(
                                    moustacheVariable('url'),
                                    webURL,
                                    moustacheVariable('campaignCode'),
                                    moustacheVariable('componentId'),
                                )}
                                className={supportButton}
                            >
                                <MoustacheVariable name="text" />
                                <svg
                                    className={arrow}
                                    xmlns="http://www.w3.org/2000/svg"
                                    viewBox="0 0 20 17.89"
                                    preserveAspectRatio="xMinYMid"
                                    aria-hidden="true"
                                    focusable="false"
                                >
                                    <path d="M20 9.35l-9.08 8.54-.86-.81 6.54-7.31H0V8.12h16.6L10.06.81l.86-.81L20 8.51v.84z" />
                                </svg>
                            </a>
                            <div className={acceptedPaymentMethodsWrapper}>
                                <amp-img
                                    layout="fixed"
                                    height="25px"
                                    width="176px"
                                    src="https://assets.guim.co.uk/images/acquisitions/2db3a266287f452355b68d4240df8087/payment-methods.png"
                                    alt="Accepted payment methods: Visa, Mastercard, American Express and PayPal"
                                />
                            </div>
                        </MoustacheSection>
                    </div>
                </MoustacheTemplate>
            </amp-list>
        </div>
    );
};
