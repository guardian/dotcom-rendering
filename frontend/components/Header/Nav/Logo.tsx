import React from 'react';
import { css } from 'react-emotion';

import {
    mobileMedium,
    mobileLandscape,
    desktop,
    leftCol,
    from,
    wide,
} from '@guardian/pasteup/breakpoints';
import { screenReaderOnly } from '@guardian/pasteup/mixins';

import TheGuardianLogoSVG from '@guardian/pasteup/logos/the-guardian.svg';

const link = css`
    float: right;
    margin-bottom: 15px;
    margin-right: 45px;
    margin-top: 3px;
    ${mobileMedium} {
        margin-right: 5px;
    }

    ${mobileLandscape} {
        margin-right: 17px;
    }

    ${desktop} {
        margin-bottom: -34px;
        margin-top: 5px;
        position: relative;
        z-index: 1071;
    }

    ${leftCol} {
        margin-bottom: -40px;
    }

    ${wide} {
        margin-right: 96px;
    }
`;

const style = css`
    height: 51px;
    width: 159px;
    ${from.mobileMedium.until.tablet} {
        height: 56px;
        width: 175px;
    }
    ${from.tablet.until.desktop} {
        height: 72px;
        width: 224px;
    }
    ${from.desktop.until.leftCol} {
        height: 80px;
        width: 249px;
    }
    ${leftCol} {
        height: 95px;
        width: 295px;
    }
`;

const SVG = () => <TheGuardianLogoSVG className={style} />;

const Logo: React.SFC = () => (
    <a className={link} href="/">
        <span className={css(screenReaderOnly)}>
            The Guardian - Back to home
        </span>
        <SVG />
    </a>
);
export default Logo;
