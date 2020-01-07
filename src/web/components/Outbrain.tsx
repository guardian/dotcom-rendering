import React from 'react';
import { css } from 'emotion';
import { textSans, body } from '@guardian/src-foundations/typography';

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
    .js-outbrain-container {
        padding-top: 20px;
        padding-bottom: 20px;
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
