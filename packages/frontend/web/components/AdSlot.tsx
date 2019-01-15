import React from 'react';

export const AdSlot: React.SFC<{ id: string }> = ({ id }) => (
    <div
        suppressHydrationWarning={true}
        id={id}
        className="js-ad"
        dangerouslySetInnerHTML={{
            __html: '<h1>This is rendered by react.</h1>',
        }}
    />
);
