import { AppEmailSignUpWrapper } from './AppEmailSignUpWrapper.importable';
import { useConfig } from './ConfigContext';
import type { EmailSignUpProps } from './EmailSignup';
import { Island } from './Island';
import { WebEmailSignUpWrapper } from './WebEmailSignup';

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
	console.log('renderingTarget', renderingTarget);
	return renderingTarget === 'Apps' ? (
		<Island clientOnly={true} deferUntil={'idle'}>
			<AppEmailSignUpWrapper skipToIndex={index} {...emailSignUpProps} />
		</Island>
	) : (
		<>
			<p>HELLO WORLD Web</p>
			<WebEmailSignUpWrapper index={index} {...emailSignUpProps} />
		</>
	);
};
