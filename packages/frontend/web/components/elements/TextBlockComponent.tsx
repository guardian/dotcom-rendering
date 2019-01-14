import React from 'react';
// tslint:disable:react-no-dangerous-html

export const TextBlockComponent: React.SFC<{ html: string }> = ({ html }) => (
    <p
        dangerouslySetInnerHTML={{
            __html: html,
        }}
    />
);
