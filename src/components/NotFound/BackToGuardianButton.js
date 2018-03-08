// @flow

import ArrowRight from 'static/inline-svgs/arrow-right.svg';

import { Cta, Icon } from './styles';

const BackToGuardianButton = () => (
    <a href="https://www.theguardian.com/" className={Cta}>
        <p>Go to The Guardian home page</p>
        <ArrowRight className={Icon} />
    </a>
);

export default BackToGuardianButton;
