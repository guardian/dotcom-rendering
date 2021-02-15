import { CheckboxGroup, Checkbox } from '@guardian/src-checkbox';
import { FieldLabel } from './FieldLabel';

type Props = {
	formField: CampaignFieldCheckbox;
	formData: { [key in string]: string[] };
	setFormData: React.Dispatch<React.SetStateAction<{ [x: string]: any }>>;
};

export const CheckboxSelect = ({ formField, formData, setFormData }: Props) => (
	<>
		<FieldLabel formField={formField} />
		<CheckboxGroup name={formField.name}>
			{formField.options.map((option, index) => {
				// data related to this field is mapped to `formData` using `formField.id`
				// We cannot assume that the data exists, so we need to check if `formField.id` key exists in `formData`
				const selectedCheckboxesArray =
					formField.id in formData ? formData[formField.id] : [];

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
