// ----- Imports ----- //

import { css } from '@emotion/react';
import {
	neutral,
	pxToRem,
	remSpace,
	textSans,
} from '@guardian/source-foundations';
import { Button, Label, TextInput } from '@guardian/source-react-components';
import type { FC } from 'react';

// ----- Component ----- //

interface Props {
	newsletterId: string;
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
const EmailSignupForm: FC<Props> = ({ newsletterId }) => {
	const handleSubmit = (): void => {
		console.log({ newsletterId });
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
			<form
				css={formStyle}
				action={undefined}
				className={'js-signup-form'}
				data-newsletter-id={newsletterId}
			>
				<TextInput
					type="email"
					width={30}
					hideLabel
					label="Enter your email address"
					cssOverrides={css`
						height: 2.25rem;
						margin-right: ${remSpace[3]};
						margin-top: 0;
						margin-bottom: ${remSpace[2]};
						flex-basis: ${pxToRem(335)}rem;
					`}
				/>
				<Button
					onClick={handleSubmit}
					size="small"
					title="Sign up"
					type="submit"
					cssOverrides={css`
						background-color: ${neutral[0]};
						margin-bottom: ${remSpace[2]};
						flex-basis: ${pxToRem(118)}rem;
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
