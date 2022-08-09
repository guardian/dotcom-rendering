// ----- Imports ----- //

import { css } from '@emotion/react';
import { space, neutral, textSans } from '@guardian/source-foundations';
import { Button, Label, TextInput } from '@guardian/source-react-components';
import { NewsletterSignUp } from 'bodyElement';
import type { FC } from 'react';

// ----- Component ----- //

interface Props {
	newsletter: NewsletterSignUp['newsletter'];
}

const formStyle = css`
	display: flex;
	align-items: center;
	flex-wrap: wrap;
`;

/**
 * NOTE: this component is non functional and is for demonstration only.
 * The UI for the NewsletterSignup might not use an HTML form for apps
 * when implemented
 */
const EmailSignupForm: FC<Props> = ({ newsletter }) => {
	const { id } = newsletter;

	const handleSubmit = () => {
		console.log({ id });
	};

	return (
		<>
			<Label
				text="Enter your email address"
				cssOverrides={css`
					div {
						${textSans.xsmall({ fontWeight: 'bold' })};
					}
				`}
			/>
			<form css={formStyle} action={undefined}>
				<TextInput
					type={'email'}
					width={30}
					hideLabel
					label={'Enter your email address'}
					cssOverrides={css`
						height: 36px;
						margin-right: ${space[3]}px;
						margin-top: 0;
						margin-bottom: ${space[2]}px;
						flex-basis: 335px;
					`}
				/>
				<Button
					onClick={handleSubmit}
					size="small"
					title="Sign up"
					cssOverrides={css`
						background-color: ${neutral[0]};
						margin-bottom: ${space[2]}px;
						flex-basis: 118px;
						justify-content: center;
					`}
				>
					Sign up
				</Button>
			</form>
		</>
	);
};

// ----- Exports ----- //

export default EmailSignupForm;
