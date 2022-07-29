import { css } from '@emotion/react';
import { neutral, space } from '@guardian/source-foundations';
import { Button, Label, TextInput } from '@guardian/source-react-components';

const flexParentStyles = css`
	display: flex;
	flex-direction: row;
	align-items: flex-end;
	flex-wrap: wrap;
`;

const inputContainerStyles = css`
	margin-right: ${space[3]}px;
	flex-basis: 335px;
	flex-shrink: 1;
`;

const buttonCssOverrides = css`
	justify-content: center;
	background-color: ${neutral[0]};
	:hover {
		background-color: ${neutral[20]};
	}
	flex-basis: 118px;
	flex-shrink: 0;
	margin-top: ${space[2]}px;
`;

type SignupFormProps = { newsletterId: string };

/**
 * This component sets the styles for the form component of SecureSignup
 * It should NOT be used as a standalone component and is only represented as a
 * separate component here for storybook mocking ability & better readability
 */
export const SignupForm: React.FC<SignupFormProps> = ({ newsletterId }) => (
	<form id={`secure-signup-${newsletterId}`}>
		<Label text="Enter your email address" />

		<div css={flexParentStyles}>
			<div css={inputContainerStyles}>
				<TextInput
					hideLabel={true}
					name="email"
					label="Enter your email address"
					type="email"
				/>
			</div>
			<Button cssOverrides={buttonCssOverrides} type="submit">
				Sign up
			</Button>
		</div>
	</form>
);
