import React from 'react';

import { AmpModelCollection } from '@root/src/amp/lib/experiment';

export const Experiment: React.FC<{
    experiments: AmpModelCollection;
}> = ({ experiments }) => {
    const script: string = `<amp-experiment>
        <script type="application/json">
        ${JSON.stringify(experiments)}
        </script>
    </amp-experiment>`;

    return <div dangerouslySetInnerHTML={{ __html: script }} />;
};
