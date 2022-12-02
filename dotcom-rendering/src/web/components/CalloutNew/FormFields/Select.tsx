import { Select as SourceSelect } from '@guardian/source-react-components';
import { FieldLabel } from './FieldLabel';

type Props = {
	validationErrors: string[];
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
	<>
		<FieldLabel formField={formField} />
		<SourceSelect
			error={
				validationErrors.includes(formField.id)
					? 'Please complete all required fields'
					: ''
			}
			label={''}
			value={formField.id in formData ? formData[formField.id] : ''}
			onChange={(e) =>
				setFormData({
					...formData,
					[formField.id]: e.target.value,
				})
			}
			optional={!formField.required}
			children={[
				{ label: 'default', value: 'Please choose an option ...' },
			]
				.concat(formField.options)
				.map((option, index) => (
					<option key={index} value={option.value}>
						{option.value}
					</option>
				))}
		/>
	</>
);
