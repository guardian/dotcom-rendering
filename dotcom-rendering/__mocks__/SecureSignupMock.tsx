import { css } from '@emotion/react';
import { neutral, space } from '@guardian/source-foundations';
import { Button, Label, TextInput } from '@guardian/source-react-components';
import { NewsletterPrivacyMessage } from '../src/web/components/NewsletterPrivacyMessage';

type Props = { newsletterId: string; successDescription: string };

export const SecureSignup = ({ newsletterId }: Props) => {
	return (
		<div title="This is a mock for the SecureSignup component which is not compatible with storybook. Changes to the real component will not be automatically reflected in this mock.">
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
				<NewsletterPrivacyMessage />
			</div>
		</div>
	);
};
