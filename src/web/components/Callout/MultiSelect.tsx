import { RadioSelect } from './RadioSelect';
import { CheckboxSelect } from './CheckboxSelect';

type Props = {
	formField: CampaignFieldCheckbox | CampaignFieldRadio;
	formData: { [key in string]: any };
	setFormData: React.Dispatch<React.SetStateAction<{ [x: string]: any }>>;
	multiple: boolean;
};

export const MultiSelect = ({
	formField,
	formData,
	setFormData,
	multiple,
}: Props) => (
	<div data-testid={`form-field-${formField.id}`}>
		{multiple ? (
			<CheckboxSelect
				formField={formField as CampaignFieldCheckbox}
				formData={formData}
				setFormData={setFormData}
			/>
		) : (
			<RadioSelect
				formField={formField as CampaignFieldRadio}
				formData={formData}
				setFormData={setFormData}
			/>
		)}
	</div>
);
