import React from 'react';

const open = (name: string, invert?: boolean) =>
    `{{${invert ? '^' : '#'}${name}}}`;
const close = (name: string) => `{{/${name}}}`;
export const moustacheVariable = (name: string) => `{{${name}}}`;

export const MoustacheSection: React.SFC<{
    name: string;
    invert?: boolean;
}> = ({ name, children, invert }) => (
    <>
        {open(name, invert)}
        {children}
        {close(name)}
    </>
);

export const MoustacheVariable: React.SFC<{ name: string }> = ({ name }) => (
    <>{moustacheVariable(name)}</>
);

export const MoustacheTemplate: React.SFC<{}> = ({ children }) => (
    <template type="amp-mustache">{children}</template>
);
