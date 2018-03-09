// @flow

import styled from 'preact-emotion';
import ArrowRightSvg from 'images/arrow-right.svg';
import palette from 'pasteup/palette';

const BoldYellowLink = styled('a')({
    backgroundColor: palette.yellow.light,
    borderRadius: '9999px',
    boxSizing: 'border-box',
    color: palette.neutral[1],
    display: 'inline-block',
    fontSize: '16px',
    lineHeight: '42px',
    padding: '0 45px 0 20px',
    position: 'relative',
    textDecoration: 'none',
    transition: 'background-color .3s',

    '&:hover': {
        backgroundColor: palette.yellow.dark,

        '&>svg': {
            transform: 'translate(5px, -50%)',
        },
    },
});

const ArrowRight = styled(ArrowRightSvg)({
    fill: 'currentColor',
    height: '40px',
    position: 'absolute',
    right: '5px',
    top: '50%',
    transform: 'translate(0, -50%)',
    transition: 'transform .3s',
    width: '40px',
});

const BackToGuardianButton = () => (
    <BoldYellowLink href="https://www.theguardian.com/">
        <p>Go to The Guardian home page</p>
        <ArrowRight />
    </BoldYellowLink>
);

export default BackToGuardianButton;
