import React from 'react';

export const Span: React.SFC<{
    count: number;
}> = ({ count }) => <span>Clicked {count} times</span>;
