import type { FormField as FormFieldType } from '@guardian/apps-rendering-api-models/formField';
import type { ArticleFormat } from '@guardian/libs';
import {
	Button,
	InlineError,
	InlineSuccess,
	Link,
} from '@guardian/source-react-components';
import { useState } from 'react';
import type { FC } from 'react';
import { ContactText, Disclaimer, FormField } from './formFields';
import { ShareLink } from './shareLink';
import { calloutForm, calloutSubmitButton } from './styles';

export interface CalloutFormProps {
	format: ArticleFormat;
	id: number;
	fields: FormFieldType[];
	disableInputs?: boolean;
}

type FormDataType = Record<string, string | string[]>;
export type ValidationErrors = { [key in string]: string };

const CALLOUT_URL =
	'https://callouts.code.dev-guardianapis.com/formstack-campaign/submit';

const CalloutForm: FC<CalloutFormProps> = ({ id, fields, format }) => {
	const [formData, setFormData] = useState<{ [key in string]: any }>({});
	const [validationErrors, setValidationErrors] = useState<ValidationErrors>(
		{},
	);
	const [submissionError, setSubmissionError] = useState<string>('');
	const [submissionSuccess, setSubmissionSuccess] = useState<boolean>(false);

	const setFieldInFormData = (
		id: string,
		data: string | string[] | undefined,
	): void =>
		setFormData({
			...formData,
			[id]: data,
		});

	const validateForm = (): boolean => {
		const errors: ValidationErrors = {};
		let isValid = true;
		fields.forEach((field: FormFieldType) => {
			if (field.mandatory && !formData[field.id]) {
				errors[field.id] = 'This field is required';
				isValid = false;
			}
			if (field.type === 'email' && formData[field.id]) {
				const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
				if (!emailRegex.test(formData[field.id])) {
					errors[field.id] = 'Please enter a valid email address';
					isValid = false;
				}
			}
			if (
				['number', 'phone'].includes(field.type) &&
				formData[field.id]
			) {
				const numberRegex = /^[0-9]+$/;
				if (!numberRegex.test(formData[field.id])) {
					errors[field.id] = 'Please enter a valid number';
					isValid = false;
				}
			}
			return isValid;
		});
		setValidationErrors(errors);
		return Object.keys(errors).length === 0;
	};

	const onSubmit = async (formData: FormDataType): Promise<void> => {
		// Reset error for new submission attempt
		setSubmissionError('');
		const isValid = validateForm();
		if (!isValid) return;

		// need to add prefix `field_` to all keys in form
		const formDataWithFieldPrefix = Object.keys(formData).reduce(
			(acc, cur): FormDataType => ({
				...acc,
				[`field_${cur}`]: formData[cur],
			}),
			{},
		);

		return fetch(CALLOUT_URL, {
			method: 'POST',
			body: JSON.stringify({
				formId: id,
				...formDataWithFieldPrefix,
			}),
			headers: {
				'Content-Type': 'application/x-www-form-urlencoded',
			},
		})
			.then((res) => {
				if (res.ok) {
					setSubmissionSuccess(true);
				} else {
					setSubmissionError(
						'Sorry, there was a problem submitting your form. Please try again later.',
					);
				}
			})
			.catch(() => {
				setSubmissionError(
					'Sorry, there was a problem submitting your form. Please try again later.',
				);
			});
	};

	return (
		<div className="js-callout" css={calloutForm}>
			{submissionSuccess ? (
				<InlineSuccess>
					Thank you, your story has been submitted successfully. One
					of our journalists will be in touch if we wish to take your
					submission further.
				</InlineSuccess>
			) : (
				<form
					method="post"
					onSubmit={async (e): Promise<void> => {
						e.preventDefault();
						await onSubmit(formData);
					}}
					noValidate
				>
					<ShareLink format={format} />
					<Disclaimer />
					<input name="formId" type="hidden" value={id} />
					<div className="js-callout__inputs">
						{fields.map((field, i) => (
							<FormField
								key={i}
								formId={id}
								formField={field}
								formData={formData}
								setFieldInFormData={setFieldInFormData}
								format={format}
								validationErrors={validationErrors}
							/>
						))}
						<div>
							<ContactText />
							{submissionError && (
								<InlineError>
									<>
										Something went wrong. Please try again
										or contact{' '}
										<Link
											href="mailto:customer.help@theguardian.com"
											target="_blank"
										>
											customer.help@theguardian.com
										</Link>
									</>
								</InlineError>
							)}
						</div>
						<Button
							css={calloutSubmitButton(format)}
							type="submit"
							priority="primary"
						>
							Submit
						</Button>
					</div>
				</form>
			)}
		</div>
	);
};

export default CalloutForm;
