// @flow

import {
    Cta,
    Icon
} from './styles.js';

import ArrowRight from 'static/inline-svgs/arrow-right.svg';

const BackToGuardianButton = () => (
    <a href="https://www.theguardian.com/" className={Cta}>
        <p>Go to The Guardian home page</p>
        <ArrowRight className={Icon}/>
    </a>
);

export default BackToGuardianButton;
