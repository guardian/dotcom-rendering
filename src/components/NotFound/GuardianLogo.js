// @flow

import {
    LogoWrapper,
    Logo
} from './styles.js';

import TheGuardianLogoSVG from 'static/inline-svgs/the-guardian-logo.svg';

const GuardianLogo = () => (
    <TheGuardianLogoSVG className={Logo}/>
);

export default GuardianLogo;
