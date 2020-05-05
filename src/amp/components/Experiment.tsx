import React from 'react';

import { AmpExperimentCollection } from '@root/src/amp/lib/experiment';

export const Experiment: React.FC<{
    experiments: AmpExperimentCollection;
}> = ({ experiments }) => {
    const script: string = `<amp-experiment>
        <script type="application/json">
        ${JSON.stringify(experiments)}
        </script>
    </amp-experiment>`;

    return <div dangerouslySetInnerHTML={{ __html: script }} />;
};
