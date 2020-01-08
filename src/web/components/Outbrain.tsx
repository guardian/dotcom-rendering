import React from 'react';
import { css } from 'emotion';

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
        padding-top: 6px;
        padding-bottom: 12px;
    }

export const OutbrainContainer: React.FC<{}> = () => {
    return (
        <div className={outbrainContainer}>
            <OutbrainWidget />
        </div>
    );
};
