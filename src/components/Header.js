// @flow
import styled from 'react-emotion';

import { screenReaderOnly, clearFix } from 'pasteup/mixins';
import {
    until,
    mobileLandscape,
    mobileMedium,
    tablet,
    desktop,
    leftCol,
    wide,
    from,
} from 'pasteup/breakpoints';

import TheGuardianLogoSVG from 'static/inline-svgs/the-guardian-logo.svg';

// .new-header.pillar-scheme--News
const Head = styled('header')({
    marginBottom: 0,
    backgroundColor: '#e9eff1',
    position: 'relative',
    [tablet]: {
        display: 'block',
    },
});

// .new-header__inner.gs-container
const Nav = styled('nav')({
    ...clearFix,
    [from.mobileMedium.until.desktop]: {},
    [tablet]: {
        maxWidth: '740px',
    },
    [desktop]: {
        maxWidth: '980px',
    },
    [leftCol]: {
        maxWidth: '1140px',
    },
    [wide]: {
        maxWidth: '1300px',
    },
    position: 'relative',
    margin: '0 auto',
});

// .new-header__logo
const HomeLink = styled('a')({
    float: 'right',
    marginBottom: '15px',
    marginRight: '45px',
    marginTop: '5px',
    [mobileMedium]: {
        marginRight: '5px',
    },
    [mobileLandscape]: {
        marginRight: '17px',
    },
    [desktop]: {
        marginBottom: '-34px',
        marginTop: '5px',
        position: 'relative',
        zIndex: 1071,
    },
});

// .u-h
const ScreenReadable = styled('span')(screenReaderOnly);

// .inline-the-guardian-logo.inline-logo
const Logo = styled(TheGuardianLogoSVG)({
    height: '95px',
    width: '295px',
});

// .new-header__top-bar.hide-until-mobile
const TopBar = styled('div')({
    left: 0,
    position: 'absolute',
    top: 0,
});

// .top-bar__item
const topBarItem = props => {
    const focusHoverStyles = {
        color: '#e9eff1',
    };

    const styles = {
        fontSize: '14px',
        fontFamily:
            '"Guardian Text Sans Web","Helvetica Neue","Helvetica","Arial","Lucida Grande","sans-serif"',
        color: '#121212',
        float: 'left',
        lineHeight: 1.2,
        position: 'relative',
        transition: 'color 80ms ease-out',
        padding: '6px 10px',
        margin: '1px 0 0',
        ':nth-child(2)': {
            paddingLeft: '13px',
        },
        ':hover': focusHoverStyles,
        ':focus': focusHoverStyles,
        [tablet]: {
            fontSize: '14px',
        },
    };

    if (props.isPayingMember || props.isRecentContributor) {
        styles[':nth-child(2)'] = {
            ...styles[':nth-child(2)'],
            paddingLeft: '0',
            marginLeft: '20px',
        };
    }

    return styles;
};

// top-bar__item.top-bar__item--cta.js-change-become-member-link.js-acquisition-link
const BecomeAMemberLink = styled('a')(props => {
    const focusHoverStyles = {
        color: '#e9eff1',
        textDecoration: 'none',
    };

    const styles = {
        ...topBarItem(props),
        color: '#e9eff1',
        fontFamily:
            '"Guardian Egyptian Web", "Guardian Text Egyptian Web", "Georgia", "serif"',
        fontWeight: 800,
        padding: 0,
        margin: 0,
        [until.mobileLandscape]: {
            'margin-left': '-10px',
        },
        ':focus': focusHoverStyles,
        ':hover': focusHoverStyles,
    };

    if (props.isPayingMember || props.isRecentContributor) {
        styles.display = 'none';
    }

    return styles;
});

// .top-bar__item--cta--circle
const TopBarCTACircle = styled('span')({
    bottom: '-12px',
    left: 0,
    overflow: 'screenReaderOnly',
    position: 'absolute',
    right: 0,
    top: 0,
    transition: 'transform 250ms ease-out',
    transformOrigin: 'top center',
    ':before': {
        backgroundColor: '#121212',
        borderRadius: '50%',
        bottom: 0,
        content: '""',
        display: 'block',
        left: 0,
        paddingTop: '100%',
        position: 'absolute',
        right: 0,
        transition: 'background-color 250ms ease-out',
    },
});

// .top-bar__item--cta--text
const TopBarCTAText = styled('span')({
    boxSizing: 'border-box',
    display: 'block',
    padding: '6px 20px 3px',
    position: 'relative',
    textAlign: 'center',
});

// .pillars
const PillarList = styled('ul')(props => {
    let styles = {
        clear: 'right',
        margin: 0,
        padding: '0 10px',
        listStyle: 'none',
        listStyleImage: 'none',
        [mobileLandscape]: {
            paddingLeft: '20px',
        },
    };

    if (props.isHeaderOpen) {
        styles = {
            ...styles,
            [desktop]: {
                zIndex: 1070,
            },
        };
    }

    if (props.isHeaderSlim) {
        styles = {
            ...styles,
            [tablet]: {
                display: 'none',
            },
        };
    }

    return styles;
});

// .pillars__item
const PillarListItem = styled('li')({
    display: 'block',
    float: 'left',
    [desktop]: {
        width: '118px',
    },
});

// .pillars-link
const PillarListItemLink = styled('a')(props => {
    const beforeAfterStyles = {
        bottom: 0,
        content: '""',
        display: 'block',
        left: 0,
        position: 'absolute',
    };

    const focusHoverStyles = {
        textDecoration:
            props.isHeaderOpen && !props.pillarLinkDropdown
                ? 'underline'
                : 'none',
    };

    let styles = {
        fontFamily:
            '"Guardian Egyptian Web", "Guardian Text Egyptian Web", TimesNewRoman, serif',
        fontWeight: 600,
        color: 'currentColor',
        cursor: 'pointer',
        display: 'block',
        fontSize: '15.4px',
        height: '48px',
        lineHeight: 1,
        padding: '0 4px',
        position: 'relative',
        overflow: 'screenReaderOnly',
        [tablet]: {
            fontSize: '22px',
            height: '42px',
            paddingRight: '20px',
            paddingLeft: '5px',
        },
        ':before': {
            ...beforeAfterStyles,
            borderLeft: '1px solid #abc2c9',
            top: '3px',
            zIndex: 1,
        },
        ':after': !props.pillarLinkDropdown
            ? {
                  ...beforeAfterStyles,
                  borderBottom: '4px solid currentColor',
                  right: 0,
                  bottom: '-4px',
                  transition: 'transform 150ms ease-out',
              }
            : {},
        ':focus': focusHoverStyles,
        ':hover': focusHoverStyles,
        ':focus:after': {
            transform: 'translateY(-4px)',
        },
        ':hover:after': {
            transform: 'translateY(-4px)',
        },
    };

    if (props.isHeaderSlim) {
        styles = {
            ...styles,
            fontSize: '20px',
            height: '44px',
            lineHeight: '44px',
            paddingTop: 0,
            ':before': {
                top: '17px',
            },
        };
    }

    if (props.index === 0) {
        styles = {
            ...styles,
            paddingLeft: 0,
            ':before': {
                content: 'none',
            },
        };
    }

    return styles;
});

export default () => {
    const pillars = [
        {
            label: 'News',
            path: 'http://m.thegulocal.com/uk',
        },
        {
            label: 'Opinion',
            path: 'http://m.thegulocal.com/uk/commentisfree',
        },
        {
            label: 'Sport',
            path: 'http://m.thegulocal.com/uk/sport',
        },
        {
            label: 'Culture',
            path: 'http://m.thegulocal.com/uk/culture',
        },
        {
            label: 'Lifestyle',
            path: 'http://m.thegulocal.com/uk/lifeandstyle',
        },
    ];

    return (
        <Head>
            <Nav>
                <HomeLink href="/">
                    <ScreenReadable>The Guardian - Back to home</ScreenReadable>
                    <Logo />
                </HomeLink>
                <TopBar>
                    <BecomeAMemberLink>
                        <TopBarCTACircle />
                        <TopBarCTAText>
                            Support The <br />Guardian
                        </TopBarCTAText>
                    </BecomeAMemberLink>
                </TopBar>
                <PillarList>
                    {pillars.map((pillar, i) => (
                        <PillarListItem key={pillar.label}>
                            <PillarListItemLink index={i} key={pillar.label}>
                                {pillar.label}
                            </PillarListItemLink>
                        </PillarListItem>
                    ))}
                </PillarList>
            </Nav>
        </Head>
    );
};
