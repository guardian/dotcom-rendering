// tslint:disable:react-no-dangerous-html

import React from 'react';
import { Container } from '@guardian/guui';
import { shouldDisplayAdvertisements } from '@frontend/model/advertisement';
import { css } from 'emotion';
import { palette } from '@guardian/pasteup/palette';
import { tablet, desktop, leftCol, wide } from '@guardian/src-foundations';

interface OutbrainSelectors {
    widget: string;
    container: string;
}

const shouldDisplayOutbrain = (config: ConfigType): boolean => {
    return shouldDisplayAdvertisements(config);
};

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

        ${tablet} {
            max-width: 740px;
        }

        ${desktop} {
            max-width: 980px;
        }

        ${leftCol} {
            max-width: 1140px;
        }

        ${wide} {
            max-width: 1300px;
        }
    }

    .ob-rec-text {
        max-height: fit-content;
    }
`;

export const OutbrainContainer: React.FC<{
    config: ConfigType;
}> = ({ config }) => {
    if (!shouldDisplayOutbrain(config)) {
        return null;
    }
    return (
        <Container>
            <div className={outbrainContainer}>
                <OutbrainWidget />
            </div>
        </Container>
    );
};
