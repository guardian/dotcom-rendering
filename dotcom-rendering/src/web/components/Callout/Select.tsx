import { Select as SourceSelect } from '@guardian/source-react-components';
import type { CampaignFieldSelect } from 'src/types/content';
import { FieldLabel } from './FieldLabel';

type Props = {
	validationErrors?: { [key in string]: string };
	formField: CampaignFieldSelect;
	formData: { [key in string]: any };
	setFormData: React.Dispatch<React.SetStateAction<{ [x: string]: any }>>;
};

export const Select = ({
	validationErrors,
	formField,
	formData,
	setFormData,
}: Props) => (
	<SourceSelect
		hideLabel={formField.hideLabel}
		data-testid={`form-field-${formField.id}`}
		error={validationErrors?.[formField.id]}
		label={formField.label}
		supporting={formField.description}
		value={formField.id in formData ? formData[formField.id] : ''}
		onChange={(e) =>
			setFormData({
				...formData,
				[formField.id]: e.target.value,
			})
		}
		optional={!formField.required}
		children={[{ label: 'default', value: 'Please choose an option ...' }]
			.concat(formField.options)
			.map((option, index) => (
				<option key={index} value={option.value}>
					{option.value}
				</option>
			))}
	/>
);
