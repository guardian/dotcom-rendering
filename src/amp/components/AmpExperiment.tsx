import React from 'react';

export type AmpExperiment = {
    sticky?: boolean,
    consentNotificationId?: string,
    variants: {
        [key: string]: number; // floating point number
    }
}

export type AmpExperiments = {
    [key: string]: AmpExperiment
}

export const ampExperimentsDataUrl = 'http://localhost:3131/amp/experiments_data'

export const AmpExperimentComponent: React.FC<{experimentsData?: AmpExperiments}> = ({experimentsData}) => {
    return (
        <amp-experiment>
            <script
                type='application/json'
                dangerouslySetInnerHTML={{__html: JSON.stringify(experimentsData)}}
            />
        </amp-experiment>
    )
}
