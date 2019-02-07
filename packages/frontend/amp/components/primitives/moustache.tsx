import React from 'react';

const open = (name: string, invert?: boolean) =>
    `{{${invert ? '^' : '#'}${name}}}`;
const close = (name: string) => `{{/${name}}}`;
export const moustacheVariable = (name: string) => `{{${name}}}`;

export const MoustacheSection: React.FC<{
    name: string;
    invert?: boolean;
}> = ({ name, children, invert }) => (
    <>
        {open(name, invert)}
        {children}
        {close(name)}
    </>
);

export const MoustacheVariable: React.FC<{ name: string }> = ({ name }) => (
    <>{moustacheVariable(name)}</>
);

export const MoustacheTemplate: React.FC<{}> = ({ children }) => (
    <template type="amp-mustache">{children}</template>
);
