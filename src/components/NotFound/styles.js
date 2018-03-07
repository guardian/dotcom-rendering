// @flow

import palette from 'pasteup/palette';
import { egyptian } from 'pasteup/fonts';
import { css } from 'react-emotion';
import { tablet, desktop, leftCol, wide } from 'pasteup/breakpoints';

export const Wrapper = css({
    content: '',
    background: '#e7edef',
    position: 'fixed',
    top: 0,
    right: 0,
    bottom: 0,
    left: 0,
    zIndex: -1,
    fontFamily: egyptian
});

export const MainContent = css({

    boxSizing: 'border-box',
    margin: '0 auto',
    padding: '0 10px 24px',
    position: 'relative',

    [desktop]: {
        width: '980px'
    },

    [leftCol]: {
        width: '1140px'
    },

    [wide]: {
        width: '1300px'
    }

});

export const Heading = css({
    color: palette.neutral['1'],
    fontSize: '28px',
    fontWeight: 200,
    lineHeight: 1.15,
    marginBottom: '12px',
    maxWidth: '540px',
    [tablet]: {
        fontSize: '42px'
    }
});

export const LogoWrapper = css({
    display: 'block',
    margin: '6px 0 36px auto',
    maxWidth: '295px',
    width: '55%',
    position: 'relative',
    zIndex: 1,
    [tablet]: {
        width: '295px'
    },
    [desktop]: {
        marginBottom: '-94px'
    }
});

export const Logo = css({
    display: 'block',
    height: 'auto',
    width: '100%'
});

export const FourOhFour = css({

    display: 'block',
    height: '80%',
    maxWidth: '350px',
    width: '100%',

    [tablet]: {
        height: 'auto',
        maxWidth: '100%',
        width: '350px'
    },

    [desktop]: {
        width: '378px'
    },

    [leftCol]: {
        width: '567px'
    }

});

export const ContentText = css({

    [tablet]: {
        marginLeft: '160px'
    },

    [desktop]: {
        marginLeft: '320px'
    },

    [leftCol]: {
        marginLeft: '480px'
    }

});

export const Cta = css({
    backgroundColor: '#ffe500',
    borderRadius: '9999px',
    boxSizing: 'border-box',
    color: '#121212',
    display: 'inline-block',
    fontSize: '16px',
    lineHeight: '42px',
    padding: '0 45px 0 20px',
    position: 'relative',
    textDecoration: 'none',
    transition: 'background-color .3s',

    '&:hover': {

        backgroundColor: '#edd600',

        '&>svg': {
            transform: 'translate(5px, -50%)',
        }

    }

});

export const VisuallyHidden = css({
    border: 0,
    clip: 'rect(0 0 0 0)',
    height: '1px',
    margin: '-1px',
    overflow: 'hidden',
    padding: 0,
    position: 'absolute',
    width: '1px'
})

export const Icon = css({
    fill: 'currentColor',
    height: '40px',
    position: 'absolute',
    right: '5px',
    top: '50%',
    transform: 'translate(0, -50%)',
    transition: 'transform .3s',
    width: '40px'
});

export const BodyCopy = css({

    color: palette.neutral['1'],
    fontSize: '15px',
    marginBottom: '24px',
    maxWidth: '220px',
    lineHeight: '27px',

    [tablet]: {
        fontSize: '18px',
        maxWidth: '300px'
    }

});

export const Link = css({

    borderBottom: '2px solid #aabfc7',
    color: palette.neutral['1'],
    paddingBottom: '3px',
    textDecoration: 'none',
    transition: 'border-color .3s',
    '&:hover': {
        borderColor: palette.neutral['1']
    }

});
