// tslint:disable:react-no-dangerous-html

import React from 'react';
import { Container } from '@guardian/guui';

interface OutbrainSelectors {
    widget: string;
    container: string;
}

const shouldDisplayOutbrain = (config: ConfigType): boolean => {
    return config.switches.outbrainDCRTest;
};

type OutbrainSelectorsType = 'outbrain' | 'merchandising' | 'nonCompliant';

const outbrainSelectorsTypeMapping = {
    outbrain: {
        widget: '.js-outbrain',
        container: '.js-outbrain-container',
    },
    merchandising: {
        widget: '.js-container--commercial',
        container: '.js-outbrain-container',
    },
    nonCompliant: {
        widget: '.js-outbrain',
        container: '.js-outbrain-container',
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

const OutbrainWidget: React.FC<{
    selectors: OutbrainSelectors;
}> = ({ selectors }) => {
    return (
        <div className={selectors.widget}>
            <div className={selectors.container} />
        </div>
    );
};

export const OutbrainContainer: React.FC<{
    config: ConfigType;
}> = ({ config }) => {
    if (!shouldDisplayOutbrain(config)) {
        return null;
    }
    const outbrainSelectors = getOutbrainSelectors();
    return (
        <Container>
            <OutbrainWidget selectors={outbrainSelectors} />
        </Container>
    );
};
