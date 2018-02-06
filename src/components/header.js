import { styled } from 'styletron-react';
import {
    hidden,
    clearFix,
} from '../styles/mixins';
import { from } from '../styles/functions';
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
});

const ScreenReadable = styled('span', {
    ...hidden
});

const Logo = styled(TheGuardianLogoSVG, {
    'height': '95px',
    'width': '295px',
});

const TopBar = styled('div', {
    'left': 0,
    'position': 'absolute',
    'top': 0,
});

const topBarItem = {
    'font-size': '14px',
    'font-family': '"Guardian Text Sans Web","Helvetica Neue","Helvetica","Arial","Lucida Grande","sans-serif"',
    'color': '#121212',
    'float': 'left',
    'line-height': 1.2,
    'position': 'relative',
    'transition': 'color 80ms ease-out',
    'padding': '6px 10px',
    'margin': '10px 0 0',
};

const BecomeAMemberLink = styled('a', Object.assign(topBarItem, {
    'color': '#e9eff1',
    'font-family': '"Guardian Egyptian Web", "Guardian Text Egyptian Web", "Georgia", "serif"',
    'font-weight': 800,
    'padding': 0,
    'margin': 0,
}));

const TopBarCTACircle = styled('span', {
    // bottom: -$gs-baseline;
    // left: 0;
    // overflow: hidden;
    // position: absolute;
    // right: 0;
    // top: 0;
    // transition: transform 250ms ease-out;
    // transform-origin: top center;

    // &:before {
    //     background: $nav-primary-colour;
    //     border-radius: 50%;
    //     bottom: 0;
    //     content: '';
    //     display: block;
    //     left: 0;
    //     padding-top: 100%;
    //     position: absolute;
    //     right: 0;
    //     transition: background-color 250ms ease-out;
    // }
});

const TopBarCTAText = styled('span', { 
});

export default () => (
    <Head>
        <Nav>
            <HomeLink href="/">
                <ScreenReadable>
                    The Guardian - Back to home
                </ScreenReadable>
                <Logo />
            </HomeLink>
            <TopBar>
                <BecomeAMemberLink>
                    <TopBarCTACircle />
                    <TopBarCTAText />
                </BecomeAMemberLink>
            </TopBar>
        </Nav>
    </Head>
);