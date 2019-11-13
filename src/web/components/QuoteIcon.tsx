import React from 'react';
import { css } from 'emotion';

const quoteStyles = (colour?: string) => css`
    height: 1.0625rem;
    width: 0.57375rem;
    margin-right: 12px;
    transform: translateY(-0.0625rem);
    overflow: visible;
    fill: ${colour && colour};
`;

const sizeStyles = (size: 'tiny' | 'xxsmall' | 'xsmall') => {
    switch (size) {
        case 'tiny':
            return css`
                svg {
                    height: 1rem;
                    width: 0.5rem;
                }
            `;
        case 'xxsmall':
            return css`
                margin-right: 0.25rem;
                svg {
                    height: 1.25rem;
                    width: 0.675rem;
                }
            `;
        case 'xsmall':
            return css`
                margin-right: 0.5rem;
                svg {
                    height: 1.5rem;
                    width: 0.81rem;
                }
            `;
        default:
            return css`
                svg {
                    height: 1.25rem;
                    width: 0.675rem;
                }
            `;
    }
};

type Props = {
    colour?: string;
    size?: 'tiny' | 'xxsmall' | 'xsmall';
};

export const QuoteIcon = ({ colour, size = 'xxsmall' }: Props) => (
    <span className={sizeStyles(size)}>
        <svg
            width="70"
            height="49"
            viewBox="0 0 35 25"
            className={quoteStyles(colour)}
            data-testid="quote-icon"
        >
            <path d="M69.587.9c-1.842 15.556-3.89 31.316-4.708 48.1H37.043c3.07-16.784 8.391-32.544 17.602-48.1h14.942zM32.949.9c-2.047 15.556-4.094 31.316-4.912 48.1H.2C3.066 32.216 8.592 16.456 17.598.9h15.35z" />
        </svg>
    </span>
);
