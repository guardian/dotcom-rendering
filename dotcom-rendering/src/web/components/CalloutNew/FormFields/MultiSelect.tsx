import { CheckboxSelect } from './CheckboxSelect';
import { RadioSelect } from './RadioSelect';

type Props = {
	validationErrors: string[];
	formField: CampaignFieldCheckbox | CampaignFieldRadio;
	formData: { [key in string]: any };
	setFormData: React.Dispatch<React.SetStateAction<{ [x: string]: any }>>;
	multiple: boolean;
};

export const MultiSelect = ({
	validationErrors,
	formField,
	formData,
	setFormData,
	multiple,
}: Props) => (
	<div data-testid={`form-field-${formField.id}`}>
		{multiple ? (
			<CheckboxSelect
				error={
					validationErrors.includes(formField.id)
						? 'Please complete all required fields'
						: ''
				}
				formField={formField as CampaignFieldCheckbox}
				formData={formData}
				setFormData={setFormData}
			/>
		) : (
			<RadioSelect
				error={
					validationErrors.includes(formField.id) ? 'Error here' : ''
				}
				formField={formField as CampaignFieldRadio}
				formData={formData}
				setFormData={setFormData}
			/>
		)}
	</div>
);
