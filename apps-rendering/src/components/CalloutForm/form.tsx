import { css } from '@emotion/react';
import type { SerializedStyles } from '@emotion/react';
import type { Campaign } from '@guardian/apps-rendering-api-models/campaign';
import type { ArticleFormat } from '@guardian/libs';
import { remSpace, until } from '@guardian/source-foundations';
import {
	Button,
	InlineError,
	InlineSuccess,
	Link,
} from '@guardian/source-react-components';
import type { FC } from 'react';
import { ContactText, Disclaimer, renderField } from './formFields';
import { ShareLink } from './shareLink';

export interface CalloutProps {
	campaign: Campaign;
	format: ArticleFormat;
	description?: DocumentFragment;
}

const formStyles = (theme: any): SerializedStyles => css`
	margin: ${remSpace[2]};

	.js-callout__success-message,
	.js-callout__error-message {
		display: none;
	}

	.js-callout--failure {
		.js-callout__error-message {
			display: inline-flex;
			margin-bottom: ${remSpace[3]};
			color: ${theme.error};
		}
	}

	.js-callout--success {
		.js-callout__success-message {
			display: inline-flex;
			color: ${theme.text};

			svg {
				color: ${theme.success};
			}
		}
		.js-callout__inputs {
			display: none !important;
		}
	}
`;

const buttonStyles = (theme: any): SerializedStyles => css`
	background: ${theme.submitBackground};
	color: ${theme.submitText};

	${until.mobileLandscape} {
		width: 100%;
		justify-content: center;
	}
`;

const Form: FC<CalloutProps> = ({ campaign, format }) => {
	return (
		<div className="js-callout" css={formStyles}>
			<form
				css={formStyles}
				action="#"
				method="post"
			>
				<ShareLink />
				<Disclaimer />
				<input
					name="formId"
					type="hidden"
					value={campaign.fields.formId}
				/>
				<div className="js-callout__inputs">
					<>
					{campaign.fields.formFields.map((field) =>
						renderField(field, format),
						)}
					</>
					<div>
						<ContactText />
						<InlineError className="js-callout__error-message">
							<div>
								Something went wrong. Please try again or
								contact{' '}
								<Link
									href="mailto:customer.help@theguardian.com"
									target="_blank"
								>
									customer.help@theguardian.com
								</Link>
							</div>
						</InlineError>
					</div>
					<Button css={buttonStyles} type="submit" priority="primary">
						Submit
					</Button>
				</div>
				<InlineSuccess className="js-callout__success-message">
					Thank you, your story has been submitted successfully. One
					of our journalists will be in touch if we wish to take your
					submission further.
				</InlineSuccess>
			</form>
		</div>
	);
};

export default Form;
