import { useIsBridgetCompatible } from '../lib/getBridgetVersion';
import { EmailSignup, EmailSignupProps } from './EmailSignup';
import { InlineSkipToWrapper } from './InlineSkipToWrapper';

interface Props extends EmailSignupProps {
	renderingTarget?: string;
	skipToIndex: number;
}

export const EmailSignupWrapper = ({
	renderingTarget,
	skipToIndex,
	...EmailSignUpProps
}: Props) => {
	const isCompatible = useIsBridgetCompatible();

	if (!renderingTarget || (renderingTarget === 'Apps' && !isCompatible)) {
		return null;
	}

	return (
		<InlineSkipToWrapper
			id={`EmailSignup-skip-link-${skipToIndex}`}
			blockDescription="newsletter promotion"
		>
			<EmailSignup {...EmailSignUpProps} />
		</InlineSkipToWrapper>
	);
};
