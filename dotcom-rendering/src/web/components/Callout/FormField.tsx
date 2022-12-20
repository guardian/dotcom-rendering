import { css, ThemeProvider } from '@emotion/react';
import { space } from '@guardian/source-foundations';
import {
	Checkbox,
	CheckboxGroup,
	Option,
	Radio,
	RadioGroup,
	Select,
	TextArea,
	TextInput,
} from '@guardian/source-react-components';
import { FileInput } from '@guardian/source-react-components-development-kitchen';
import type { CampaignFieldType } from 'src/types/content';
import { decidePalette } from '../../lib/decidePalette';

type FormDataType = { [key in string]: any };

type FormFieldProp = {
	validationErrors: { [key in string]: string };
	format: ArticleFormat;
	formField: CampaignFieldType;
	formData: FormDataType;
	setFormData: React.Dispatch<React.SetStateAction<FormDataType>>;
};

const formFieldStyles = css`
	margin-top: ${space[2]}px;
`;

export const FormField = ({
	format,
	formField,
	formData,
	setFormData,
	validationErrors,
}: FormFieldProp) => {
	const { type, label, hideLabel, description, required, id } = formField;

	const name = `field_${type}_${id}`;
	const fieldValue =
		formField.id in formData ? (formData[formField.id] as string) : '';
	const fieldError = validationErrors[formField.id];

	switch (formField.type) {
		case 'textarea':
			return (
				<div css={formFieldStyles}>
					<TextArea
						name={name}
						label={label}
						hideLabel={hideLabel}
						supporting={description}
						optional={!required}
						value={fieldValue}
						error={fieldError}
						data-testid={`form-field-${formField.id}`}
						onChange={(e) =>
							setFormData({
								...formData,
								[formField.id]: e.target.value,
							})
						}
					/>
				</div>
			);
		case 'file':
			return (
				<div css={formFieldStyles}>
					<ThemeProvider
						theme={{
							fileInput: {
								primary: decidePalette(format).text.richLink,
							},
						}}
					>
						<FileInput
							label={label}
							hideLabel={hideLabel}
							supporting={description}
							optional={!required}
							error={fieldError}
							data-testid={`form-field-${formField.id}`}
							onUpload={(file: string | undefined): void =>
								setFormData({
									...formData,
									[formField.id]: file,
								})
							}
						/>
					</ThemeProvider>
				</div>
			);
		case 'select':
			return (
				<div css={formFieldStyles}>
					<Select
						name={name}
						label={label}
						hideLabel={hideLabel}
						supporting={description}
						optional={!required}
						value={fieldValue}
						error={fieldError}
						data-testid={`form-field-${formField.id}`}
						onChange={(e) =>
							setFormData({
								...formData,
								[formField.id]: e.target.value,
							})
						}
						children={formField.options.map(({ value, label }) => {
							return (
								<Option key={value} value={value}>
									{label}
								</Option>
							);
						})}
					/>
				</div>
			);
		case 'checkbox':
			return (
				<div css={formFieldStyles}>
					<CheckboxGroup
						name={name}
						label={label}
						hideLabel={hideLabel}
						supporting={description}
						error={fieldError}
						data-testid={`form-field-${formField.id}`}
					>
						{formField.options.map((option, index) => {
							// data related to this field is mapped to `formData` using `formField.id`
							// We cannot assume that the data exists, so we need to check if `formField.id` key exists in `formData`
							const selectedCheckboxesArray: string[] =
								formData[formField.id] ?? [];

							const isCheckboxChecked =
								!!selectedCheckboxesArray.find(
									(ele: string) => ele === option.value,
								);

							const filterOutCheckboxFromArray = () =>
								selectedCheckboxesArray.filter(
									(ele: string) => ele !== option.value,
								);

							const addCheckboxToArray = () => [
								...selectedCheckboxesArray,
								option.value,
							];

							return (
								<Checkbox
									name={name}
									label={option.label}
									value={option.value}
									checked={isCheckboxChecked}
									error={fieldError ? true : false}
									data-testid={`form-field-${formField.id}`}
									onChange={() => {
										setFormData({
											...formData,
											[formField.id]: isCheckboxChecked
												? filterOutCheckboxFromArray()
												: addCheckboxToArray(),
										});
									}}
								/>
							);
						})}
					</CheckboxGroup>
				</div>
			);
		case 'radio':
			return (
				<div css={formFieldStyles}>
					<RadioGroup
						label={formField.label}
						supporting={formField.description}
						error={validationErrors?.[formField.id]}
						name={formField.name}
						orientation={
							formField.options.length > 2
								? 'vertical'
								: 'horizontal'
						}
					>
						{formField.options.map((option, index) => {
							const isRadioChecked =
								formField.id in formData &&
								formData[formField.id] === option.value;
							return (
								<Radio
									data-testid={`form-field-${option.value}`}
									key={index}
									label={option.label}
									value={option.value}
									name={`${formField.id}`}
									checked={!!isRadioChecked}
									onChange={() =>
										setFormData({
											...formData,
											[formField.id]: option.value,
										})
									}
								/>
							);
						})}
					</RadioGroup>
				</div>
			);
		default: {
			return (
				<div css={formFieldStyles}>
					<TextInput
						name={name}
						label={label}
						hideLabel={hideLabel}
						supporting={description}
						optional={!required}
						value={fieldValue}
						error={fieldError}
						data-testid={`form-field-${formField.id}`}
						type={formField.type}
						onChange={(e) =>
							setFormData({
								...formData,
								[formField.id]: e.target.value,
							})
						}
					/>
				</div>
			);
		}
	}
};
