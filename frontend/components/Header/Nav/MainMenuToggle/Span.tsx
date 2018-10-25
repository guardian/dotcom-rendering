import React from 'react';

export const Span: React.SFC<{
    children: React.ReactNode;
}> = ({ children }) => (
    <span>{children}</span>
);
