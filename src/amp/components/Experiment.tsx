import React from 'react';

export interface ExperimentModel {
    [key: string]: {
        sticky: boolean;
        consentNotificationId: string;
        variants: {
            [key: string]: number;
        };
    };
}

export const Experiment: React.FC<{
    experiment: ExperimentModel;
}> = experiment => {
    const script: string = `<amp-experiment>
        <script type="application/json">
        ${JSON.stringify(experiment)}
        </script>
    </amp-experiment>;`;

    return <div dangerouslySetInnerHTML={{ __html: script }} />;
};
