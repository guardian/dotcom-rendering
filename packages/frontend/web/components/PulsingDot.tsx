import React from 'react';
import { css } from 'emotion';
import { keyframes } from '@emotion/core';

const livePulse = keyframes`{
    0% {opacity: 1;}
    10% {opacity: .25;}
    40% {opacity: 1;}
    100% {opacity: 1;}
}`;

const pulsingDot = (colour: string) => css`
    color: ${colour};
    ::before {
        border-radius: 62.5rem;
        display: inline-block;
        position: relative;
        background-color: currentColor;
        width: 0.75em;
        height: 0.75em;
        content: '';
        margin-right: 0.1875rem;
        vertical-align: initial;
        animation: ${livePulse} 1s infinite;
    }
`;

interface Props {
    colour: string;
}

export const PulsingDot = ({ colour }: Props) => (
    <span className={pulsingDot(colour)} />
);
