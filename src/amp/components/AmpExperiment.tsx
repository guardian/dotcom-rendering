import React from 'react';

type AmpExperiment = {
    sticky?: boolean,
    consentNotificationId?: string,
    variants: {
        [key: string]: number; // floating point number
    }
}

type AmpExperiments = {
    [key: string]: AmpExperiment
}

export const AmpExperimentComponent: React.FC<{data: AmpExperiments}> = ({data}) => {
    return (
        <amp-experiment>
            <script
                type='application/json'
                dangerouslySetInnerHTML={{__html: JSON.stringify(data)}}
            />
        </amp-experiment>
    )
}
