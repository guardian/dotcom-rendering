import { Radio, RadioGroup } from '@guardian/source-react-components';
import type { CampaignFieldRadio } from 'src/types/content';
import { FieldLabel } from './FieldLabel';

type FieldProp = {
	validationErrors?: { [key in string]: string };
	formField: CampaignFieldRadio;
	formData: { [key in string]: any };
	setFormData: React.Dispatch<React.SetStateAction<{ [x: string]: any }>>;
};

export const RadioSelect = ({
	validationErrors,
	formField,
	formData,
	setFormData,
}: FieldProp) => (
	<div>
		<FieldLabel formField={formField} />
		<RadioGroup
			error={validationErrors?.[formField.id]}
			name={formField.name}
			orientation={
				formField.options.length > 2 ? 'vertical' : 'horizontal'
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
