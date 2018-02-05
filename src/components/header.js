import { styled } from 'styletron-react';
import { hidden } from '../styles/mixins';
import TheGuardianLogoSVG from '../../static/inline-svgs/the-guardian-logo.svg';

const Head = styled('header', {
    'margin-bottom': 0,
    'background-color': '#e9eff1',
    'position': 'relative',
});

const Nav = styled('nav', {
    'max-width': '46.25rem',
    'position': 'relative',
    'margin': '0 auto',
    ':before': {
        'content': '',
        'display': 'table',
    }
});

const HomeLink = styled('a', {
    'float': 'right',
    'margin-right': '6rem',
    'margin-bottom': '-2.5rem',
    'margin-top': '0.3125rem',
    'position': 'relative',
    'z-index': 1071,
});

const ScreenReadable = styled('span', {
    ...hidden
});

const Logo = styled(TheGuardianLogoSVG, {
    'height': '5.9375rem',
    'width': '18.4375rem',
});

const TopBar = styled('div', {
    'left': 0,
    'position': 'absolute',
    'top': 0,
});

const topBarItem = {
    'font-size': '0.8125rem',
    'line-height': '1.125rem',
    'font-family': '"Guardian Text Sans Web","Helvetica Neue","Helvetica","Arial","Lucida Grande","sans-serif"',
    'color': '#121212',
    'float': 'left',
    'line-height': 1.2,
    'position': 'relative',
    'transition': 'color 80ms ease-out',
    'padding': '0.375rem 0.625rem',
    'margin': '0.0625rem 0 0',
};

const BecomeAMemberLink = styled('a', {
    ...topBarItem,
    'color': '#e9eff1',
    'font-family': '"Guardian Egyptian Web", "Guardian Text Egyptian Web", "Georgia", "serif"',
    'font-weight': 800,
    'padding': 0,
    'margin': 0,
});

const TopBarCallToAction = styled('span', {
    
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
                    <TopBarCallToAction />
                </BecomeAMemberLink>
            </TopBar>
        </Nav>
    </Head>
);