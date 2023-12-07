import { AppEmailSignUp } from './AppEmailSignUp';
import { useConfig } from './ConfigContext';
import type { EmailSignUpProps } from './EmailSignup';
import { WebEmailSignUp } from './WebEmailSignup';

interface EmailSignUpSwitcherProps extends EmailSignUpProps {
	index: number;
	identityName: string;
	successDescription: string;
	/** You should only set this to true if the privacy message will be shown elsewhere on the page */
	hidePrivacyMessage?: boolean;
}

export const EmailSignUpSwitcher = ({
	index,
	...emailSignUpProps
}: EmailSignUpSwitcherProps) => {
	const { renderingTarget } = useConfig();

	return renderingTarget === 'Apps' ? (
		<AppEmailSignUp skipToIndex={index} {...emailSignUpProps} />
	) : (
		<WebEmailSignUp index={index} {...emailSignUpProps} />
	);
};
