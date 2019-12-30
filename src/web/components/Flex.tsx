import React from 'react';
import { css, cx } from 'emotion';

type Props = {
    children: JSXElements;
};

type FlexProps = {
    direction?: 'row' | 'column';
    justify?: 'space-between' | 'flex-start'; // Extend as required
    wrap?: 'wrap';
};

const flexStyles = ({
    direction = 'row',
    justify = 'space-between',
    wrap,
}: FlexProps) =>
    cx(
        css`
            display: flex;
            flex-direction: ${direction};
            justify-content: ${justify};
        `,
        typeof wrap !== `undefined` &&
            css`
                flex-wrap: ${wrap};
            `,
    );

export const Flex = (props: Props & FlexProps) => (
    <div className={flexStyles(props)}>{props.children}</div>
);
