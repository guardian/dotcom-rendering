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

const Head = styled('header')({
    marginBottom: 0,
    backgroundColor: '#e9eff1',
    position: 'relative',
    [tablet]: {
        display: 'block',
    },
});

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

const ScreenReadable = styled('span')(screenReaderOnly);

const Logo = styled(TheGuardianLogoSVG)({
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

const TopBar = styled('div')({
    left: 0,
    position: 'absolute',
    top: 0,
});

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
    overflow: 'hidden',
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

    let styles = {
        fontFamily:
            '"Guardian Egyptian Web", "Guardian Text Egyptian Web", TimesNewRoman, serif',
        fontWeight: 600,
        textDecoration: 'none',
        color: 'currentColor',
        cursor: 'pointer',
        display: 'block',
        fontSize: '15.4px',
        height: '30px',
        lineHeight: 1,
        padding: '0 4px',
        position: 'relative',
        overflow: 'hidden',
        [tablet]: {
            fontSize: '22px',
            height: '42px',
            paddingRight: '20px',
            paddingLeft: '5px',
        },
        [desktop]: {
            height: '48px',
        },
        ':before': {
            ...beforeAfterStyles,
            borderLeft: '1px solid #abc2c9',
            top: '3px',
            zIndex: 1,
        },
        ':focus:after': {
            transform: 'translateY(-4px)',
        },
        ':hover:after': {
            transform: 'translateY(-4px)',
        },
    };

    if (!props.pillarLinkDropdown) {
        styles[':after'] = Object.assign(
            {},
            styles[':after'],
            beforeAfterStyles,
            {
                borderBottom: '4px solid currentColor',
                right: 0,
                bottom: '-4px',
                transition: 'transform 150ms ease-out',
            },
        );
    }

    if (props.isHeaderSlim) {
        styles = Object.assign({}, styles, {
            fontSize: '20px',
            height: '44px',
            lineHeight: '44px',
            paddingTop: 0,
            ':before': {
                top: '17px',
            },
        });
    }

    if (props.index === 0) {
        styles = Object.assign({}, styles, {
            paddingLeft: 0,
            ':before': {
                content: 'none',
            },
        });
    }

    if (props.isHeaderOpen && !props.pillarLinkDropdown) {
        styles = Object.assign({}, styles, {
            ':focus': {
                'text-decoration': 'underline',
            },
            ':hover': {
                'text-decoration': 'underline',
            },
        });
    }

    if (props.pillar) {
        const pillarStyles = props.theme.pillars[props.pillar.toLowerCase()];

        if (pillarStyles) {
            styles = Object.assign({}, styles, pillarStyles);
        }
    }

    return styles;
});

// .js-change-link.new-header__menu-toggle
const MenuLabel = styled('label', {
    [until.desktop]: {
        position: 'absolute',
        right: '5px',
        top: '24px',
    },
    [from.mobileMedium.until.desktop]: {
        bottom: '-6px',
        top: 'auto',
    },
    [from.mobileLandscape.until.desktop]: {
        right: '46px',
    },
    ':focus': {
        outline: 0,
    },
});

export default () => {
    const pillars = [
        {
            id: 'news',
            label: 'News',
            path: 'http://m.thegulocal.com/uk',
        },
        {
            id: 'opinion',
            label: 'Opinion',
            path: 'http://m.thegulocal.com/uk/commentisfree',
        },
        {
            id: 'sport',
            label: 'Sport',
            path: 'http://m.thegulocal.com/uk/sport',
        },
        {
            id: 'culture',
            label: 'Culture',
            path: 'http://m.thegulocal.com/uk/culture',
        },
        {
            id: 'lifestyle',
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
                            <PillarListItemLink
                                index={i}
                                path={pillar.path}
                                key={pillar.id}
                                pillar={pillar.id}
                            >
                                {pillar.label}
                            </PillarListItemLink>
                        </PillarListItem>
                    ))}
                </PillarList>
                <MenuLabel htmlFor="main-menu-toggle" />
            </Nav>
        </Head>
    );
};
