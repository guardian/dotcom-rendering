import React from 'react';
import { css } from '@emotion/react';
import { Link } from '@guardian/source-react-components';
import { body } from '@guardian/source-foundations';
import { neutral } from '@guardian/source-foundations';
import {OphanComponentEvent} from "@guardian/libs";

const signInLink = css`
    margin: 0;
    border-top: 1px solid ${neutral[0]};
`;

const signInLinkText = css`
    ${body.medium({ fontWeight: 'bold' })};
`;

const signInUrl =
    'https://profile.theguardian.com/signin?utm_source=gdnwb&utm_medium=banner&utm_campaign=SigninEPIC_Existing&CMP_TU=mrtn&CMP_BUNIT=subs';

interface ContributionsEpicSignInProps {
    submitComponentEvent?: (event: OphanComponentEvent) => void;
}

export const ContributionsEpicSignInCta: React.FC<ContributionsEpicSignInProps> = ({
    submitComponentEvent,
}: ContributionsEpicSignInProps) => {
    const onSignInClick = () => {
        if (submitComponentEvent) {
            // submitComponentEvent(OPHAN_COMPONENT_SIGN_IN);
        }
    };

    return (
        <p css={[signInLink, signInLinkText]}>
            Already a supporter?{' '}
            <Link
                onClick={onSignInClick}
                href={signInUrl}
                priority="secondary"
                cssOverrides={signInLinkText}
            >
                Sign in
            </Link>{' '}
            and we promise to ask you less.
        </p>
    );
};
