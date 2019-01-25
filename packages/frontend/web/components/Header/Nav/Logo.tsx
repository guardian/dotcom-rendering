import React from 'react';
import { css } from 'emotion';

import {
    mobileMedium,
    mobileLandscape,
    tablet,
    desktop,
    wide,
} from '@guardian/pasteup/breakpoints';
import { screenReaderOnly } from '@guardian/pasteup/mixins';

import { palette } from '@guardian/pasteup/palette';
import TheGuardianLogoSVG from '@guardian/pasteup/logos/the-guardian.svg';

const link = css`
    float: right;
    margin-top: 10px;
    margin-right: 54px;
    margin-bottom: 21px;

    ${mobileMedium} {
        margin-right: 10px;
    }
    ${mobileLandscape} {
        margin-right: 20px;
    }
    ${desktop} {
        margin-top: 5px;
        margin-bottom: 15px;
        position: relative;
        z-index: 1071;
    }
    ${wide} {
        margin-right: 96px;
    }
`;

const style = css`
    height: 44px;
    width: 135px;
    ${mobileMedium} {
        height: 56px;
        width: 175px;
    }
    ${tablet} {
        height: 72px;
        width: 224px;
    }
    ${desktop} {
        height: 95px;
        width: 295px;
    }

    path {
        fill: ${palette.neutral[100]};
    }
`;

const SVG = () => <TheGuardianLogoSVG className={style} />;

export const Logo: React.SFC = () => (
    <a className={link} href="/">
        <span
            className={css`
                ${screenReaderOnly};
            `}
        >
            The Guardian - Back to home
        </span>
        <SVG />
    </a>
);
