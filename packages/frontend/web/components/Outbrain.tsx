// tslint:disable:react-no-dangerous-html

import React from 'react';
import { Container } from '@guardian/guui';

export const shouldDisplayOutbrain = (config: ConfigType): boolean => {
    return config.switches.displayOutbrain;
};

export const OutbrainWidget: React.FC<{}> = ({}) => {
    return (
        <div className="js-outbrain">
            <div className="js-outbrain-container" />
        </div>
    );
};

export const MaybeOutbrainContainer: React.FC<{
    config: ConfigType;
}> = ({ config }) => {
    if (shouldDisplayOutbrain(config)) {
        return (
            <Container>
                <OutbrainWidget />
            </Container>
        );
    }
    return <div />;
};
