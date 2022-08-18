// ----- Imports ----- //

import { css } from '@emotion/react';
import {
	background,
	fill,
	hover,
	text,
} from '@guardian/common-rendering/src/editorialPalette';
import type { ArticleFormat } from '@guardian/libs';
import { pxToRem, remSpace, textSans } from '@guardian/source-foundations';
import { Button, Label, TextInput } from '@guardian/source-react-components';
import type { FC } from 'react';
import { darkModeCss } from 'styles';

// ----- Component ----- //

interface Props {
	format: ArticleFormat;
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
const EmailSignupForm: FC<Props> = ({ newsletterId, format }) => {
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

						${darkModeCss`
							color: ${text.signUpFormDark(format)};
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
							background-color: ${background.signUpFormDark(format)};
							color: ${text.signUpFormDark(format)};
						`}
					`}
				/>
				<Button
					onClick={handleSubmit}
					size="small"
					title="Sign up"
					cssOverrides={css`
						background-color: ${fill.signUpFormButton(format)};
						color: ${text.signUpFormButton(format)};
						margin-bottom: ${remSpace[2]};
						flex-basis: ${pxToRem(118)}rem;
						justify-content: center;
						&:hover {
							background-color: ${hover.signUpFormButton(format)};
						}

						${darkModeCss`
							background-color: ${fill.signUpFormButtonDark(format)};
							color: ${text.signUpFormButtonDark(format)};
							&:hover {
								background-color: ${hover.signUpFormButtonDark(format)}
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
