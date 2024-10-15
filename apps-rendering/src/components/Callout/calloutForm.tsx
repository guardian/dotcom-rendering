import type { FormField as FormFieldType } from '@guardian/apps-rendering-api-models/formField';
import {
	Button,
	InlineError,
	Link,
	SvgTickRound,
} from '@guardian/source/react-components';
import { useState } from 'react';
import { ContactText, Disclaimer } from './calloutComponents';
import { FormField } from './formFields';
import {
	calloutLinkContainer,
	calloutPrimaryButton,
	heading,
	successMessage,
} from './styles';

interface CalloutFormProps {
	id: number;
	fields: FormFieldType[];
}

type SubmitDataType = Record<string, string | string[]>;
export type FormDataType = { [key in string]: undefined | string | string[] };
export type ValidationErrors = { [key in string]: string };

const CALLOUT_URL =
	'https://callouts.code.dev-guardianapis.com/formstack-campaign/submit';

const CalloutForm = ({ id, fields }: CalloutFormProps) => {
	const [formData, setFormData] = useState<FormDataType>({});
	const [validationErrors, setValidationErrors] = useState<ValidationErrors>(
		{},
	);
	const [submissionError, setSubmissionError] = useState<string>('');
	const [submissionSuccess, setSubmissionSuccess] = useState<boolean>(false);

	const setFieldInFormData = (
		id: string,
		data: string | string[] | undefined,
	): void => {
		const currentErrors = validationErrors;
		currentErrors[id] = '';
		setValidationErrors(currentErrors);

		setFormData({
			...formData,
			[id]: data,
		});
	};

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
				if (!emailRegex.test(formData[field.id] as string)) {
					errors[field.id] = 'Please enter a valid email address';
					isValid = false;
				}
			}
			if (
				['number', 'phone'].includes(field.type) &&
				formData[field.id]
			) {
				const numberRegex = /^[0-9]+$/;
				if (!numberRegex.test(formData[field.id] as string)) {
					errors[field.id] = 'Please enter a valid number';
					isValid = false;
				}
			}
			return isValid;
		});
		setValidationErrors(errors);
		return Object.keys(errors).length === 0;
	};

	const cleanFormData = (
		data: undefined | string | string[],
	): string | undefined => {
		if (Array.isArray(data)) {
			return data.join('\n');
		}

		return data;
	};

	const onSubmit = async (formData: FormDataType): Promise<void> => {
		// Reset error for new submission attempt
		setSubmissionError('');
		const isValid = validateForm();
		if (!isValid) return;

		// need to add prefix `field_` to all keys in form (as is required by formstack api)
		const formDataWithFieldPrefix = Object.keys(formData).reduce(
			(acc, cur): SubmitDataType => ({
				...acc,
				[`field_${cur}`]: cleanFormData(formData[cur]),
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
		<div className="js-callout-form-tab" css={calloutLinkContainer}>
			{submissionSuccess ? (
				<div css={successMessage}>
					<div>
						<SvgTickRound />
					</div>
					<div css={heading}>Thank you!</div>
					<div>
						Your story has been submitted successfully. One of our
						journalists will be in touch if we wish to take your
						submission further.
					</div>
				</div>
			) : (
				<form
					method="post"
					onSubmit={async (e): Promise<void> => {
						e.preventDefault();
						await onSubmit(formData);
					}}
					noValidate
				>
					<div className="js-callout__inputs">
						<Disclaimer />
						{fields.map((field, i) => (
							<FormField
								key={i}
								formId={id}
								formField={field}
								formData={formData}
								setFieldInFormData={setFieldInFormData}
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
											rel="noreferrer"
										>
											customer.help@theguardian.com
										</Link>
									</>
								</InlineError>
							)}
						</div>
						<Button
							cssOverrides={calloutPrimaryButton}
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
