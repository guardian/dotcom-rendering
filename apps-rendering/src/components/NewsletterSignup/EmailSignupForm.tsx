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
import { darkModeCss } from 'styles';

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

	// TO DO - check what the hover color should be on the button (if any)
	return (
		<>
			<Label
				text="Enter your email address"
				cssOverrides={css`
					div {
						${textSans.xsmall({ fontWeight: 'bold' })};

						${darkModeCss`
							color: ${neutral[86]};
						`}
					}
				`}
			/>
			<form css={formStyle} action={undefined}>
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

						${darkModeCss`
							background-color: transparent;
							border-color: ${neutral[60]};
							color: ${neutral[86]};
						`}
					`}
				/>
				<Button
					onClick={handleSubmit}
					size="small"
					title="Sign up"
					cssOverrides={css`
						background-color: ${neutral[0]};
						margin-bottom: ${remSpace[2]};
						flex-basis: ${pxToRem(118)}rem;
						justify-content: center;

						${darkModeCss`
							background-color: ${neutral[86]};
							color: ${neutral[7]};
							&:hover {
								background-color: ${neutral[93]};
							}
						`}
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
