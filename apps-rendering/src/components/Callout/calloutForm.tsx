import type { FormField } from '@guardian/apps-rendering-api-models/formField';
import type { ArticleFormat } from '@guardian/libs';
import {
	Button,
	InlineError,
	InlineSuccess,
	Link,
} from '@guardian/source-react-components';
import type { FC } from 'react';
import { ContactText, Disclaimer, renderField } from './formFields';
import { ShareLink } from './shareLink';
import { calloutForm, calloutSubmitButton } from './styles';

export interface CalloutFormProps {
	format: ArticleFormat;
	id: number;
	fields: FormField[];
	disableInputs?: boolean;
}

const CalloutForm: FC<CalloutFormProps> = ({
	id,
	fields,
	format,
	disableInputs = false,
}) => {
	return (
		<div className="js-callout" css={calloutForm}>
			<form css={calloutForm} action="#" method="post">
				<ShareLink disabled={disableInputs} format={format} />
				<Disclaimer disabled={disableInputs} />
				<input name="formId" type="hidden" value={id} />
				<div className="js-callout__inputs">
					<>
						{fields.map((field) =>
							renderField(field, disableInputs, format),
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
					<Button
						css={calloutSubmitButton(format)}
						type="submit"
						priority="primary"
						disabled={disableInputs}
					>
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

export default CalloutForm;
