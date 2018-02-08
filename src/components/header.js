import { styled } from 'styletron-react';
import {
    hidden,
    clearFix,
} from '../styles/mixins';
import { 
    from,
    until
} from '../styles/functions';
import TheGuardianLogoSVG from '../../static/inline-svgs/the-guardian-logo.svg';

// .new-header.pillar-scheme--News
const Head = styled('header', {
    'margin-bottom': 0,
    'background-color': '#e9eff1',
    'position': 'relative',
    [from('tablet')]: {
        'display': 'block',
    },
});

// .new-header__inner.gs-container
const Nav = styled('nav', {
    ...clearFix,
    [from('tablet')]: {
        'max-width': '740px',
    },
    [from('desktop')]: {
        'max-width': '980px',
    },
    [from('leftCol')]: {
        'max-width': '1140px',
    },
    [from('wide')]: {
        'max-width': '1300px',
    },
    'position': 'relative',
    'margin': '0 auto',
});

// .new-header__logo
const HomeLink = styled('a', {
    'float': 'right',
    'margin-bottom': '15px',
    'margin-right': '45px',
    'margin-top': '5px',
    [from('mobileMedium')]: {
        'margin-right': '5px',
    },
    [from('mobileLandscape')]: {
        'margin-right': '17px',
    },
    [from('desktop')]: {
        'margin-bottom': '-34px',
        'margin-top': '5px',
        'position': 'relative',
        'z-index': 1071,
    },
});;

// .u-h
const ScreenReadable = styled('span', {
    ...hidden
});

// .inline-the-guardian-logo.inline-logo 
const Logo = styled(TheGuardianLogoSVG, {
    'height': '95px',
    'width': '295px',
});

// .new-header__top-bar.hide-until-mobile
const TopBar = styled('div', {
    'left': 0,
    'position': 'absolute',
    'top': 0,
});

const topBarItem = (props) => {
    const focusHoverStyles = {
        'color': '#e9eff1'
    };

    let styles = {
        'font-size': '14px',
        'font-family': '"Guardian Text Sans Web","Helvetica Neue","Helvetica","Arial","Lucida Grande","sans-serif"',
        'color': '#121212',
        'float': 'left',
        'line-height': 1.2,
        'position': 'relative',
        'transition': 'color 80ms ease-out',
        'padding': '6px 10px',
        'margin': '1px 0 0',
        ':nth-child(2)': {
            'padding-left': '13px'
        },
        ':hover': focusHoverStyles,
        ':focus': focusHoverStyles,
        [from('tablet')]: {
            'font-size': '14px',
        },
    };

    // if (props.isPayingMember || props.isRecentContributor) {
    //     Object.assign(styles[':nth-child(2)'], {
    //         'padding-left': 0,
    //         'margin-left': '20px'
    //     });
    // }

    return styles;
};

// top-bar__item.top-bar__item--cta.js-change-become-member-link.js-acquisition-link
const BecomeAMemberLink = styled('a', (props) => {
    const focusHoverStyles = {
        'color': '#e9eff1',
        'text-decoration': 'none',
    };

    let styles = Object.assign({}, topBarItem(props), {
        'color': '#e9eff1',
        'font-family': '"Guardian Egyptian Web", "Guardian Text Egyptian Web", "Georgia", "serif"',
        'font-weight': 800,
        'padding': 0,
        'margin': 0,
        [until('mobileLandscape')]: {
            'margin-left': '-10px',
        },
        ':focus': focusHoverStyles,
        ':hover': focusHoverStyles,
    });

    // if (props.isPayingMember || props.isRecentContributor) {
    //     styles['display'] = 'none';
    // }

    return styles;
});

// .top-bar__item--cta--circle
const TopBarCTACircle = styled('span', {
    'bottom': '-12px',
    'left': 0,
    'overflow': 'hidden',
    'position': 'absolute',
    'right': 0,
    'top': 0,
    'transition': 'transform 250ms ease-out',
    'transform-origin': 'top center',
    ':before': {
        'background-color': '#121212',
        'border-radius': '50%',
        'bottom': 0,
        'content': '""',
        'display': 'block',
        'left': 0,
        'padding-top': '100%',
        'position': 'absolute',
        'right': 0,
        'transition': 'background-color 250ms ease-out',
    },
});

// .top-bar__item--cta--text
const TopBarCTAText = styled('span', { 
    'box-sizing': 'border-box',
    'display': 'block',
    'padding': '6px 20px 3px',
    'position': 'relative',
    'text-align': 'center',
});

// .pillars
const PillarList = styled('ul', (props) => {
    let styles ={
        'clear': 'right',
        'margin': 0,
        'padding': '0 10px',
        'list-style': 'none',
        'list-style-image': 'none',
        [from('mobileLandscape')]: {
            'padding-left': '20px'
        },
    }

    // if (props.isHeaderOpen) {
    //     Object.assign({}, styles, {
    //         [from('desktop')]: {
    //             'z-index': 1070;
    //         },
    //     });
    // }

    // if (props.isHeaderSlim) {
    //     Object.assign({}, styles, {
    //         [from('tablet')]: {
    //             'display': 'none'
    //         },
    //     });
    // }

    return styles;
});

const PillarListItem = styled('li', (props) => {
    const styles = {
        'display': 'block',
        'float': 'left',
        [from('desktop')]: {
            'width': '118px'
        },
    };

    // &:first-child .pillar-link {
    //     padding-left: 0;

    //     &:before {
    //         content: none;
    //     }
    // }
});

export default () => {
    const pillars = [{
        label: 'News',
        path: 'http://m.thegulocal.com/uk'
    }, {
        label: 'Opinion',
        path: 'http://m.thegulocal.com/uk/commentisfree'
    }, {
        label: 'Sport',
        path: 'http://m.thegulocal.com/uk/sport'
    }, {
        label: 'Culture',
        path: 'http://m.thegulocal.com/uk/culture'
    }, {
        label: 'Lifestyle',
        path: 'http://m.thegulocal.com/uk/lifeandstyle'
    }];

    return (
        <Head>
            <Nav>
                <HomeLink href="/">
                    <ScreenReadable uh>
                        The Guardian - Back to home
                    </ScreenReadable>
                    <Logo />
                </HomeLink>
                <TopBar>
                    <BecomeAMemberLink>
                        <TopBarCTACircle />
                        <TopBarCTAText>
                            Support The <br/>Guardian
                        </TopBarCTAText>
                    </BecomeAMemberLink>
                </TopBar>
                <PillarList>
                    {pillars.map(pillar => (
                        <PillarListItem>
                            {pillar.label}
                        </PillarListItem>
                    ))}
                </PillarList>
            </Nav>
        </Head>
    );
};