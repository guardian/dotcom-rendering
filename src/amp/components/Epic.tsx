import React from 'react';
import { palette } from '@guardian/src-foundations';
import {css} from "emotion";

const epic = css`
    border-top: 0.0625rem solid ${palette.brandYellow.main};
    background-color: ${palette.neutral[97]};
    clear: left;
    margin-top: 1.5rem;
    margin-bottom: 1.5rem;
    padding: 0.25rem 0.3125rem 0.75rem;
`;
const epicHeader = css `
    font-size: 1.25rem;
    line-height: 1.4375rem;
    font-family: "Guardian Egyptian Web",Georgia,serif;
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
    margin-block-start: 1em;
    margin-block-end: 1em;
    margin-bottom: 0.5rem;
    font-family: "Guardian Text Egyptian Web",Georgia,serif;
    text-rendering: optimizeLegibility;
    font-kerning: normal;
    font-variant-ligatures: common-ligatures;
    -webkit-font-smoothing: antialiased;
    vertical-align: 0%;
    line-height: 1.5;
    &::selection {
        background-color: ${palette.brandYellow.main};
    }
`;
const highlightedText = css`
    font-size: 1.1rem;
    background-color: ${palette.brandYellow.main};
    padding: 0.125rem;
    font-weight: bold;
    margin-left: 5px;
    color: ${palette.neutral[7]};
    font-family: "Guardian Text Egyptian Web",Georgia,serif;
    text-rendering: optimizeLegibility;
    font-kerning: normal;
    font-variant-ligatures: common-ligatures;
    -webkit-font-smoothing: antialiased;
    vertical-align: 0%;
    line-height: 1.5;
`;
const supportButton = css`
    background-color: ${palette.brandYellow.main};
    color: ${palette.neutral[7]};
    display: inline-block;
    font-family: "Guardian Text Sans Web","Helvetica Neue",Helvetica,Arial,"Lucida Grande",sans-serif;
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
    transition: background-color .3s;
    text-align: centre;
    &:hover {
        background-color: #FFBB51;
    }
`;
const arrow = css`
    margin-left: .5rem;
    position: relative;
    width: 1.3125rem;
    height: auto;
    display: inline;
    color: ${palette.neutral[7]};
    vertical-align: sub;
`;
const acceptedPaymentMethods = css`
    margin-top: .5rem;
    margin-left: .25rem;
    width: 32.5%;
    height: auto;
    display: block;
`;

const supportUrl = "https://support.theguardian.com/uk/contribute"

export const Epic: React.FC<{}> = ({}) => {
    return (
        <amp-list
            layout="responsive"
            src="https://contributions.guardianapis.com/amp/epic"
            credentials="include"
        >
            <div className={epic}>
                <h2 className={epicHeader}>News is under threat …</h2>
                <p className={epicParagraph}>
                    … just when we need it the most. Millions of readers around the world are flocking to the
                    Guardian in search of honest, authoritative, fact-based reporting that can help them
                    understand the biggest challenge we have faced in our lifetime. But at this crucial moment,
                    news organisations are facing a cruel financial double blow: with fewer people able to leave
                    their homes, and fewer news vendors in operation, we’re seeing a reduction in newspaper
                    sales across the UK. Advertising revenue continues to fall steeply meanwhile as businesses
                    feel the pinch. We need you to help fill the gap.
                </p>
                <p className={epicParagraph}>
                    We believe every one of us deserves equal access to quality news and measured explanation.
                    So, unlike many others, we made a different choice: to keep Guardian journalism open for all,
                    regardless of where they live or what they can afford to pay. This would not be possible without
                    financial contributions from our readers, who now support our work from 180 countries around
                    the world.
                </p>
                <p className={epicParagraph}>
                    We have upheld our editorial independence in the face of the disintegration of traditional
                    media – with social platforms giving rise to misinformation, the seemingly unstoppable rise of
                    big tech and independent voices being squashed by commercial ownership. The Guardian’s
                    independence means we can set our own agenda and voice our own opinions. Our journalism is free
                    from commercial and political bias – never influenced by billionaire owners or shareholders.
                    This makes us different. It means we can challenge the powerful without fear and give a voice to
                    those less heard.
                </p>
                <p className={epicParagraph}>
                    Reader financial support has meant we can keep investigating, disentangling and interrogating.
                    It has protected our independence, which has never been so critical. We are so grateful.
                </p>
                <p className={epicParagraph}>
                    We need your support so we can keep delivering quality journalism that’s open and independent.
                    And that is here for the long term. Every reader contribution, however big or small, is so valuable.
                    <span className={highlightedText}>Support the Guardian from as little as £1 – and it only takes a minute. Thank you.</span>
                </p>
                <a href={supportUrl} className={supportButton}>
                    Support the Guardian
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
                <img
                    src="https://assets.guim.co.uk/images/acquisitions/2db3a266287f452355b68d4240df8087/payment-methods.png"
                    alt="Accepted payment methods: Visa, Mastercard, American Express and PayPal"
                    className={acceptedPaymentMethods}
                />
            </div>
        </amp-list>
    );
}
