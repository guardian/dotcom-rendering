import React from 'react';
import { css } from 'emotion';

const quoteStyles = (colour?: string) => css`
    height: 17px;
    width: 9px;
    margin-right: 12px;
    transform: translateY(-1px);
    overflow: visible;
    fill: ${colour && colour};
`;

const sizeStyles = (size: SmallHeadlineSize) => {
    switch (size) {
        case 'small':
            return css`
                svg {
                    height: 16px;
                    width: 8px;
                }
            `;
        case 'medium':
            return css`
                margin-right: 4px;
                svg {
                    height: 20px;
                    width: 11px;
                }
            `;
        case 'large':
            return css`
                margin-right: 8px;
                svg {
                    height: 24px;
                    width: 13px;
                }
            `;
        default:
            return css`
                svg {
                    height: 20px;
                    width: 11px;
                }
            `;
    }
};

type Props = {
    colour?: string;
    size?: SmallHeadlineSize;
};

export const QuoteIcon = ({ colour, size = 'medium' }: Props) => (
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
