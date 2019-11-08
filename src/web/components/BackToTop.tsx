import React from 'react';
import { css, cx } from 'emotion';
import { palette } from '@guardian/src-foundations';
import { textSans } from '@guardian/src-foundations/__experimental__typography';

const iconHeight = '42px';

const iconContainer = css`
    position: relative;
    float: right;
    border-radius: 100%;
    background-color: ${palette.neutral[100]};
    cursor: pointer;
    height: ${iconHeight};
    min-width: ${iconHeight};
`;

const link = css`
    text-decoration: none;
    color: ${palette.neutral[100]};
    font-weight: bold;
    line-height: ${iconHeight};

    :hover {
        color: ${palette.yellow.main};

        .icon-container {
            background-color: ${palette.yellow.main};
        }
    }
`;

const icon = css`
    :before {
        position: absolute;
        top: 6px;
        bottom: 0;
        left: 0;
        right: 0;
        margin: auto;
        border: 2px solid ${palette.neutral[7]};
        border-bottom: 0;
        border-right: 0;
        content: '';
        height: 12px;
        width: 12px;
        transform: rotate(45deg);
    }
`;

const text = css`
    ${textSans.small()};
    padding-right: 5px;
`;

export const BackToTop: React.FC = () => (
    <a className={link} href="#top">
        <span className={text}>Back to top</span>
        <span className={cx('icon-container', iconContainer)}>
            <i className={icon} />
        </span>
    </a>
);
