import { css } from '@emotion/react';
import { neutral, space, text, textSans } from '@guardian/source-foundations';
import {
	Button,
	Label,
	Link,
	TextInput,
} from '@guardian/source-react-components';

type Props = { newsletterId: string; successDescription: string };

const termsStyle = css`
	${textSans.xxsmall()}
	color: ${text.supporting};
	a {
		${textSans.xxsmall({ fontWeight: 'bold' })}
		text-decoration: none;
		:hover {
			text-decoration: underline;
		}
	}
	strong {
		color: ${neutral[0]};
		font-weight: bold;
	}
`;

const PrivacyTerms = () => {
	return (
		<span css={termsStyle}>
			<strong>Privacy Notice: </strong>
			Newsletters may contain info about charities, online ads, and
			content funded by outside parties. For more information see our{' '}
			<Link
				href="https://www.theguardian.com/help/privacy-policy"
				rel="noopener noreferrer"
			>
				privacy policy
			</Link>
			.&nbsp;
		</span>
	);
};

const RecaptchaTerms = () => (
	<span css={termsStyle}>
		We use Google reCaptcha to protect our website and the Google{' '}
		<Link
			href="https://policies.google.com/privacy"
			rel="noopener noreferrer"
		>
			Privacy Policy
		</Link>{' '}
		and{' '}
		<Link
			href="https://policies.google.com/terms"
			rel="noopener noreferrer"
		>
			Terms of Service
		</Link>{' '}
		apply.
	</span>
);

export const SecureSignup = ({ newsletterId }: Props) => {
	return (
		<div
			title="This is a mock for the SecureSignup component which is not compatible with storybook. Changes to the real component will not be automatically reflected in this mock."
		>
			<form id={`secure-signup-${newsletterId}`}>
				<Label text="Enter your email address" />

				<div
					css={css`
						display: flex;
						flex-direction: row;
						align-items: flex-end;
						flex-wrap: wrap;
					`}
				>
					<div
						css={css`
							margin-right: ${space[3]}px;
							flex-basis: 335px;
							flex-shrink: 1;
						`}
					>
						<TextInput
							hideLabel={true}
							name="email"
							label="Enter your email address"
							type="email"
						/>
					</div>
					<Button
						disabled={true}
						cssOverrides={css`
							justify-content: center;
							background-color: ${neutral[0]};
							:hover {
								background-color: ${neutral[20]};
							}
							flex-basis: 118px;
							flex-shrink: 0;
							margin-top: ${space[2]}px;
						`}
						type="submit"
					>
						Sign up
					</Button>
				</div>
			</form>
			<div
				css={css`
					margin-top: ${space[2]}px;
				`}
			>
				<PrivacyTerms />
				<RecaptchaTerms />
			</div>
		</div>
	);
};
