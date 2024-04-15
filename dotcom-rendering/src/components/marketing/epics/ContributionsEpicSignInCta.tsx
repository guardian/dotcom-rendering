/**
 * @file
 * This file was migrated from:
 * https://github.com/guardian/support-dotcom-components/blob/a482b35a25ca59f66501c4de02de817046206298/packages/modules/src/modules/epics/ContributionsEpicSignInCta.tsx
 */
import { css } from '@emotion/react';
import type { OphanComponentEvent } from '@guardian/libs';
import { neutral, textEgyptianBold17 } from '@guardian/source-foundations';
import { Link } from '@guardian/source-react-components';
import type { ReactComponent } from '../lib/ReactComponent';
import { OPHAN_COMPONENT_SIGN_IN } from './utils/ophan';

const signInLink = css`
	margin: 0;
	border-top: 1px solid ${neutral[0]};
`;

const signInLinkText = css`
	${textEgyptianBold17};
	/**
 * @TODO (2) Typography preset styles should not be overridden.
 * Please speak to your team's designer and update this to use a more appropriate preset.
*/
	line-height: 1.4;
`;

const signInUrl =
	'https://profile.theguardian.com/signin?utm_source=gdnwb&utm_medium=banner&utm_campaign=SigninEPIC_Existing&CMP_TU=mrtn&CMP_BUNIT=subs';

interface ContributionsEpicSignInProps {
	submitComponentEvent?: (event: OphanComponentEvent) => void;
}

export const ContributionsEpicSignInCta: ReactComponent<
	ContributionsEpicSignInProps
> = ({ submitComponentEvent }: ContributionsEpicSignInProps) => {
	const onSignInClick = () => {
		if (submitComponentEvent) {
			submitComponentEvent(OPHAN_COMPONENT_SIGN_IN);
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
			and you’ll see far fewer of these messages.
		</p>
	);
};
