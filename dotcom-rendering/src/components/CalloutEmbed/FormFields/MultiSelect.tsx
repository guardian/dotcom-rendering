import type {
	CampaignFieldCheckbox,
	CampaignFieldRadio,
} from '../../../types/content';
import { CheckboxSelect } from './CheckboxSelect';
import { RadioSelect } from './RadioSelect';

type Props = {
	validationErrors?: Record<string, string>;
	formField: CampaignFieldCheckbox | CampaignFieldRadio;
	formData: Record<string, any>;
	setFormData: React.Dispatch<React.SetStateAction<Record<string, any>>>;
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
				validationErrors={validationErrors ?? undefined}
				formField={formField as CampaignFieldCheckbox}
				formData={formData}
				setFormData={setFormData}
			/>
		) : (
			<RadioSelect
				validationErrors={validationErrors ?? undefined}
				formField={formField as CampaignFieldRadio}
				formData={formData}
				setFormData={setFormData}
			/>
		)}
	</div>
);
