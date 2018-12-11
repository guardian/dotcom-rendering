import React from 'react';

const open = (name: string, invert?: boolean) =>
    `{{${invert ? '^' : '#'}${name}}}`;
const close = (name: string) => `{{/${name}}}`;
export const tag = (name: string) => `{{${name}}}`;

export const Section: React.SFC<{ name: string; invert?: boolean }> = ({
    name,
    children,
    invert,
}) => (
    <>
        {open(name, invert)}
        {children}
        {close(name)}
    </>
);

export const Tag: React.SFC<{ name: string }> = ({ name }) => <>{tag(name)}</>;
