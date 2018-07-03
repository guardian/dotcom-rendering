// @flow
import { styled } from '@guardian/guui';

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

const Link = styled('a')({
    float: 'right',
    marginBottom: 15,
    marginRight: 45,
    marginTop: 3,
    [mobileMedium]: {
        marginRight: 5,
    },
    [mobileLandscape]: {
        marginRight: 17,
    },
    [desktop]: {
        marginBottom: -34,
        marginTop: 5,
        position: 'relative',
        zIndex: 1071,
    },
    [leftCol]: {
        marginBottom: -40,
    },
    [wide]: {
        marginRight: 96,
    },
});

const ScreenReaderText = styled('span')(screenReaderOnly);

const SVG = styled(TheGuardianLogoSVG)({
    height: '51px',
    width: '159px',
    [from.mobileMedium.until.tablet]: {
        height: '56px',
        width: '175px',
    },
    [from.tablet.until.desktop]: {
        height: '72px',
        width: '224px',
    },
    [from.desktop.until.leftCol]: {
        height: '80px',
        width: '249px',
    },
    [leftCol]: {
        height: '95px',
        width: '295px',
    },
});

export default () => (
    <Link href="/">
        <ScreenReaderText>The Guardian - Back to home</ScreenReaderText>
        <SVG />
    </Link>
);
