import React from 'react';
import { Container } from '@guardian/guui';
import { css } from 'emotion';
import { palette } from '@guardian/pasteup/palette';
import { sans } from '@guardian/pasteup/typography';

const iconContainer = css`
    position: relative;
    float: right;
    margin-top: -3px;
    margin-right: 4px;
    border-radius: 100%;
    background-color: ${palette.neutral[7]};
    cursor: pointer;
    height: 48px;
    min-width: 48px;
`;

const icon = css`
    :before {
        position: absolute;
        top: 6px;
        bottom: 0;
        left: 0;
        right: 0;
        margin: auto;
        border: 2px solid ${palette.neutral[100]};
        border-bottom: 0;
        border-right: 0;
        content: '';
        height: 12px;
        width: 12px;
        transform: rotate(45deg);
    }
`;

const text = css`
    line-height: 42px;
    font-family: ${sans.body};
    padding-right: 10px;
`;

const innerWrapper = css`
    text-align: right;
`;

const link = css`
    text-decoration: none;
    color: ${palette.neutral[7]};
`;

export const BackToTop: React.FC = () => (
    <a className={link} href="#top">
        <Container borders={true} className={innerWrapper}>
            <span className={text}>back to top</span>
            <span className={iconContainer}>
                <i className={icon} />
            </span>
        </Container>
    </a>
);
