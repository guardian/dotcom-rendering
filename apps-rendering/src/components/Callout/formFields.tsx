import { css } from '@emotion/react';
import type { FormField } from '@guardian/apps-rendering-api-models/formField';
import type { ArticleFormat } from '@guardian/libs';
import { neutral, remSpace, textSans } from '@guardian/source-foundations';
import {
	Option,
	Select,
	TextArea,
	TextInput,
} from '@guardian/source-react-components';
import CheckboxInput from 'components/CheckboxInput';
import FileInput from 'components/FileInput';
import RadioInput from 'components/RadioInput';
import type { FC, ReactElement } from 'react';
import { darkModeCss } from 'styles';

const infoStyles = css`
	${textSans.small()};
	margin-bottom: ${remSpace[4]};
`;

export const Disclaimer: FC<{ disabled: boolean }> = ({ disabled }) => {
	const tabIndex = disabled ? -1 : 0;
	return (
		<div css={infoStyles}>
			You must be 18 or over to fill in this form. Only the Guardian can
			see your contributions and one of our journalists may contact you to
			discuss further. For more information please see our{' '}
			<a
				tabIndex={tabIndex}
				href="https://www.theguardian.com/help/terms-of-service"
			>
				terms of service
			</a>{' '}
			and{' '}
			<a
				tabIndex={tabIndex}
				href="https://www.theguardian.com/help/privacy-policy"
			>
				privacy policy
			</a>
			.
		</div>
	);
};

export const ContactText = (): ReactElement => (
	<div css={infoStyles}>
		One of our journalists will be in contact before we publish your
		information, so please do leave contact details.
	</div>
);

export const renderField = (
	{ type, label, description, mandatory, options, id }: FormField,
	disableInput: boolean,
	format: ArticleFormat,
): ReactElement | null => {
	const name = `field_${type}_${id}`;
	const inputStyles = css`
		margin-bottom: ${remSpace[4]};
	`;
	const textareaStyles = css`
		//source doesn't support themes for textarea (yet)
		${inputStyles};

		background-color: ${neutral[100]};
		color: ${neutral[7]};
		${darkModeCss`
			background-color: ${neutral[7]};
			color: ${neutral[97]};
	`}
	`;

	switch (type) {
		case 'text':
		case 'number':
		case 'phone':
		case 'email':
			return (
				<TextInput
					name={name}
					type={type === 'phone' ? 'tel' : type}
					label={label}
					supporting={description}
					optional={!mandatory}
					cssOverrides={inputStyles}
					key={name}
					disabled={disableInput}
				/>
			);
		case 'textarea':
			return (
				<TextArea
					name={name}
					label={label}
					supporting={description}
					optional={!mandatory}
					cssOverrides={textareaStyles}
					disabled={disableInput}
					key={name}
				/>
			);
		case 'file':
			return (
				<FileInput
					name={name}
					label={label}
					supporting={description}
					mandatory={mandatory}
					format={format}
					cssOverrides={inputStyles}
					disabled={disableInput}
					key={name}
				/>
			);
		case 'radio':
			return (
				<RadioInput
					name={name}
					label={label}
					supporting={description}
					options={options}
					disabled={disableInput}
					key={name}
				/>
			);
		case 'checkbox':
			return (
				<CheckboxInput
					name={name}
					label={label}
					supporting={description}
					options={options}
					cssOverrides={inputStyles}
					disabled={disableInput}
					key={name}
				/>
			);
		case 'select':
			return (
				<Select
					label={label}
					supporting={description}
					cssOverrides={inputStyles}
					key={name}
					name={name}
					disabled={disableInput}
				>
					{options.map(({ value, label }) => {
						return (
							<Option key={value} value={value}>
								{label}
							</Option>
						);
					})}
				</Select>
			);
		default:
			return null;
	}
};
