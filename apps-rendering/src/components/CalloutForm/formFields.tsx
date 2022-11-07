import { css } from '@emotion/react';
import type { SerializedStyles } from '@emotion/react';
import type { FormField } from '@guardian/apps-rendering-api-models/formField';
import { text } from '@guardian/common-rendering/src/editorialPalette';
import type { ArticleFormat } from '@guardian/libs';
import { remSpace, textSans } from '@guardian/source-foundations';
import {
	Option,
	Select,
	TextArea,
	TextInput,
} from '@guardian/source-react-components';
import FileInput from 'components/FileInput';
import RadioInput from 'components/RadioInput';
import type { ReactElement } from 'react';
import { darkModeStyles } from 'styles';

const disclaimerStyles = (format: ArticleFormat): SerializedStyles => css`
	${textSans.small()};
	margin-bottom: ${remSpace[3]};

	a {
		color: ${text.richLink(format)};
		${darkModeStyles`
			color: ${text.richLinkDark(format)};
		`}
	}
`;

const renderDisclaimer = (format: ArticleFormat): ReactElement => (
	<div css={disclaimerStyles(format)}>
		You must be 18 or over to fill in this form. Only the Guardian can see
		your contributions and one of our journalists may contact you to discuss
		further. For more information please see our{' '}
		<a href="https://www.theguardian.com/help/terms-of-service">
			terms of service
		</a>{' '}
		and{' '}
		<a href="https://www.theguardian.com/help/privacy-policy">
			privacy policy
		</a>
		.
	</div>
);

const renderField = (
	{ type, description, label, mandatory, options, id }: FormField,
	format: ArticleFormat,
): ReactElement | null => {
	const name = `field_${id}`;
	const input = css`
		margin-bottom: ${remSpace[4]};
	`;
	switch (type) {
		case 'text':
			return (
				<TextInput
					cssOverrides={input}
					supporting={description}
					name={name}
					label={label}
					optional={!mandatory}
				/>
			);
		case 'textarea':
			return (
				<TextArea
					cssOverrides={input}
					supporting={description}
					name={name}
					label={label}
					optional={!mandatory}
				/>
			);
		case 'file':
			return (
				<FileInput
					cssOverrides={input}
					supporting={description}
					mandatory={mandatory}
					name={name}
					label={label}
					format={format}
				/>
			);
		case 'radio':
			return (
				<RadioInput
					options={options}
					name={name}
					supporting={description}
					label={label}
				/>
			);
		case 'select':
			return (
				<Select
					label={label}
					supporting={description}
					cssOverrides={input}
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

export { renderField, renderDisclaimer };
