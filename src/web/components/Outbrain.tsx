// tslint:disable:react-no-dangerous-html

import React from 'react';
import { css } from 'emotion';
import { palette } from '@guardian/src-foundations';
import { textSans, body } from '@guardian/src-foundations/typography';
import { from } from '@guardian/src-foundations/mq';

interface OutbrainSelectors {
    widget: string;
    container: string;
}

type OutbrainSelectorsType = 'outbrain' | 'merchandising' | 'nonCompliant';

const outbrainSelectorsTypeMapping = {
    outbrain: {
        widget: 'js-outbrain',
        container: 'js-outbrain-container',
    },
    merchandising: {
        widget: 'js-container--commercial',
        container: 'js-outbrain-container',
    },
    nonCompliant: {
        widget: 'js-outbrain',
        container: 'js-outbrain-container',
    },
};

const getOutbrainSelectorsByType = (
    type: OutbrainSelectorsType,
): OutbrainSelectors => {
    return outbrainSelectorsTypeMapping[type];
};

const getOutbrainSelectors = (): OutbrainSelectors => {
    return getOutbrainSelectorsByType('outbrain');
};

const OutbrainWidget: React.FC<{}> = ({}) => {
    const selectors = getOutbrainSelectors();
    return (
        <div className={selectors.widget}>
            <div className={selectors.container} />
        </div>
    );
};

const outbrainContainer = css`
    .js-outbrain {
        width: 100vw;
        position: relative;
        left: 50%;
        right: 50%;
        margin-left: -50vw;
        margin-right: -50vw;
        background-color: ${palette.neutral[97]};
    }

    .js-outbrain-container {
        margin: auto;
        border-left: 1px solid ${palette.neutral[86]};
        border-right: 1px solid ${palette.neutral[86]};
        border-top: 1px solid ${palette.neutral[86]};
        padding: 20px;

        ${from.tablet} {
            max-width: 740px;
        }

        ${from.desktop} {
            max-width: 980px;
        }

        ${from.leftCol} {
            max-width: 1140px;
        }

        ${from.wide} {
            max-width: 1300px;
        }
    }

    .ob-widget {
        div.ob-widget-header {
            ${body.medium()};
            span,
            .ob_about_this_content a {
                ${body.small()};
                text-decoration: none;
                /* stylelint-disable-next-line color-no-hex */
                color: #00456e;
            }
        }
        div.ob-widget-section {
            margin-top: 0px;
        }

        span.ob-rec-text {
            max-height: fit-content;
            ${textSans.medium()};
        }
    }
`;

export const OutbrainContainer: React.FC<{}> = () => {
    return (
        <div className={outbrainContainer}>
            <OutbrainWidget />
        </div>
    );
};
