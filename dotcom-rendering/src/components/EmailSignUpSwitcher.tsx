import { AppEmailSignUp } from './AppEmailSignUp.importable';
import { useConfig } from './ConfigContext';
import type { EmailSignUpProps } from './EmailSignup';
import { Island } from './Island';
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
		<Island clientOnly={true} deferUntil="idle">
			<AppEmailSignUp skipToIndex={index} {...emailSignUpProps} />
		</Island>
	) : (
		<>
			<WebEmailSignUp index={index} {...emailSignUpProps} />
		</>
	);
};
