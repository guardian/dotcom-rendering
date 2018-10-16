import React from 'react';
import { css } from 'react-emotion';

import {
    mobile,
    mobileMedium,
    mobileLandscape,
    tablet,
    desktop,
    leftCol,
    wide,
} from '@guardian/pasteup/breakpoints';
import { screenReaderOnly } from '@guardian/pasteup/mixins';

import TheGuardianLogoSVG from '@guardian/pasteup/logos/the-guardian.svg';

const link = css`
    float: right;
    margin-bottom: 16px;
    margin-right: 50px;
    margin-top: 3px;
    ${mobileMedium} {
        margin-right: 45px;
    }
    ${mobileMedium} {
        margin-right: 6px;
    }
    ${mobileLandscape} {
        margin-right: 17px;
    }
    ${desktop} {
        margin-bottom: -38px;
        margin-top: 5px;
        position: relative;
        z-index: 1071;
    }
    ${leftCol} {
        margin-bottom: -44px;
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
export default Logo;
