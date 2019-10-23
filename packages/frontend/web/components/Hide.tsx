import React from 'react';
import { css } from 'emotion';
import {
    until,
    mobileMedium,
    mobileLandscape,
    phablet,
    tablet,
    desktop,
    leftCol,
    wide,
} from '@guardian/src-foundations';

const breakpoints = {
    mobileMedium,
    mobileLandscape,
    phablet,
    tablet,
    desktop,
    leftCol,
    wide,
};

type Props = {
    children: JSX.Element | JSX.Element[];
    when: 'above' | 'below';
    breakpoint:
        | 'mobileMedium'
        | 'mobileLandscape'
        | 'phablet'
        | 'tablet'
        | 'desktop'
        | 'leftCol'
        | 'wide';
};

export const Hide = ({ children, when, breakpoint }: Props) => {
    let whenToHide;
    if (when === 'below') {
        whenToHide = css`
            ${until[breakpoint]} {
                display: none;
            }
        `;
    } else {
        whenToHide = css`
            ${breakpoints[breakpoint]} {
                display: none;
            }
        `;
    }
    return <div className={whenToHide}>{children}</div>;
};
