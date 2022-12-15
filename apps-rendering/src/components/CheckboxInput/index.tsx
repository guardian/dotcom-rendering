import type { SerializedStyles } from '@emotion/react';
import type { FormField } from '@guardian/apps-rendering-api-models/formField';
import { Checkbox, CheckboxGroup } from '@guardian/source-react-components';
import type { ReactElement } from 'react';

interface CheckboxInputProps {
	formField: FormField;
	selectedCheckboxes: string[];
	setFieldInFormData: (
		id: string,
		data: string | string[] | undefined,
	) => void;
	error?: string;
	cssOverrides?: SerializedStyles;
}

const CheckboxInput = ({
	formField,
	selectedCheckboxes,
	setFieldInFormData,
	error,
	cssOverrides,
}: CheckboxInputProps): ReactElement => {
	const { label, name, options, description, id } = formField;
	return (
		<CheckboxGroup
			id={name}
			label={label}
			name={name}
			supporting={description}
			cssOverrides={cssOverrides}
			error={error}
		>
			{options.map((option) => {
				const isCheckboxChecked = !!selectedCheckboxes.find(
					(v: string) => v === option.value,
				);

				const filterOutCheckboxFromArray = (): string[] =>
					selectedCheckboxes.filter(
						(v: string) => v !== option.value,
					);

				const addCheckboxToArray = (): string[] => [
					...selectedCheckboxes,
					option.value,
				];

				return (
					<Checkbox
						label={option.label}
						value={option.value}
						key={option.value}
						checked={isCheckboxChecked}
						onChange={(): void =>
							setFieldInFormData(
								id,
								isCheckboxChecked
									? filterOutCheckboxFromArray()
									: addCheckboxToArray(),
							)
						}
					/>
				);
			})}
		</CheckboxGroup>
	);
};

export default CheckboxInput;
