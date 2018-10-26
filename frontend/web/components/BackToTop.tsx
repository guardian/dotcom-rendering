import React from 'react';
import { Container } from '@guardian/guui';
import { css } from 'react-emotion';
import { palette } from '@guardian/pasteup/palette';
import { sans } from '@guardian/pasteup/fonts';

const iconContainer = css`
    position: relative;
    float: right;
    margin-top: -6px;
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

const outerWrapper = css`
    border-top: 1px solid ${palette.neutral[86]};
    background-color: ${palette.neutral[97]};
`;

const innerWrapper = css`
    text-align: right;
`;

const link = css`
    text-decoration: none;
    color: ${palette.neutral[7]};
`;

const BackToTop: React.SFC = () => (
    <a className={link} href="#top">
        <div className={outerWrapper}>
            <Container className={innerWrapper}>
                <span className={text}>back to top</span>
                <span className={iconContainer}>
                    <i className={icon} />
                </span>
            </Container>
        </div>
    </a>
);

export default BackToTop;
