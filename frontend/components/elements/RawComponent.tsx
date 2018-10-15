import React from 'react';
// tslint:disable:react-no-dangerous-html

export const RawComponent: React.SFC<{ html: string }> = ({ html }) => (
    <span
        dangerouslySetInnerHTML={{
            __html: html,
        }}
    />
);
