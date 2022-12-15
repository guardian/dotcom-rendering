import { Checkbox, CheckboxGroup } from '@guardian/source-react-components';
import type { CampaignFieldCheckbox } from 'src/types/content';

type Props = {
	formField: CampaignFieldCheckbox;
	formData: { [key in string]: string[] };
	setFormData: React.Dispatch<React.SetStateAction<{ [x: string]: any }>>;
	validationErrors?: { [key in string]: string };
};

export const CheckboxSelect = ({
	formField,
	formData,
	setFormData,
	validationErrors,
}: Props) => (
	<>
		<CheckboxGroup
			error={validationErrors?.[formField.id]}
			hideLabel={formField.hideLabel}
			name={formField.name}
			label={formField.label}
			supporting={formField.description}
		>
			{formField.options.map((option, index) => {
				// data related to this field is mapped to `formData` using `formField.id`
				// We cannot assume that the data exists, so we need to check if `formField.id` key exists in `formData`
				const selectedCheckboxesArray = formData[formField.id] ?? [];

				const isCheckboxChecked = !!selectedCheckboxesArray.find(
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
						data-testid={`form-field-${option.value}`}
						key={index}
						label={option.label}
						value={option.value}
						checked={isCheckboxChecked}
						error={validationErrors?.[formField.id] ? true : false}
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
	</>
);
