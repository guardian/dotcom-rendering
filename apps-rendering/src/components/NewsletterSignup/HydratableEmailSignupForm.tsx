// ----- Imports ----- //

import { css } from '@emotion/react';
import {
	neutral,
	pxToRem,
	remSpace,
	textSans,
} from '@guardian/source-foundations';
import {
	Button,
	Label,
	TextInput,
} from '@guardian/source-react-components';
import type { FC, FormEventHandler } from 'react';

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
const HydratableEmailSignupForm: FC<Props> = ({ newsletterId }) => {

	const handleSubmit:FormEventHandler = (event): void => {
		event.preventDefault();
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

				action={undefined}
				className={'js-signup-form'}
				data-newsletter-id={newsletterId}
				css={formStyle}
				onSubmit={handleSubmit}
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

					size="small"
					title="Sign up"
					type="submit"
					cssOverrides={css`
						background-color: ${neutral[0]};
						margin-bottom: ${remSpace[2]};
						flex-basis: ${pxToRem(118)}rem;
						justify-content: center;

						:disabled {
							background-color: ${neutral[46]};
						}
					`}
				>
					Sign up
				</Button>
			</form>
		</>
	);
};

// ----- Exports ----- //

export default HydratableEmailSignupForm;
