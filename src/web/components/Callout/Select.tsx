import { FieldLabel } from './FieldLabel';

type Props = {
	formField: CampaignFieldSelect;
	formData: { [key in string]: any };
	setFormData: React.Dispatch<React.SetStateAction<{ [x: string]: any }>>;
};

export const Select = ({ formField, formData, setFormData }: Props) => (
	<>
		<FieldLabel formField={formField} />
		<select
			data-testid={`form-field-${formField.id}`}
			required={formField.required}
			value={
				formField.id && formField.id in formData
					? formData[formField.id]
					: ''
			}
			onChange={(e) =>
				setFormData({
					...formData,
					[formField.id]: e.target.value,
				})
			}
		>
			{formField.options &&
				formField.options.map((option, index) => (
					<option key={index} value={option.value}>
						{option.value}
					</option>
				))}
		</select>
	</>
);
