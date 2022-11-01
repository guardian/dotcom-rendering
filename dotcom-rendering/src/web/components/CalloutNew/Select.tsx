import { Select as SourceSelect } from '@guardian/source-react-components';
import { FieldLabel } from './FieldLabel';

type Props = {
	formField: CampaignFieldSelect;
	formData: { [key in string]: any };
	setFormData: React.Dispatch<React.SetStateAction<{ [x: string]: any }>>;
};

export const Select = ({ formField }: Props) => (
	<>
		<FieldLabel formField={formField} />
		<SourceSelect
			label={''}
			children={formField.options.map((option, index) => (
				<option key={index} value={option.value}>
					{option.value}
				</option>
			))}
		/>
	</>
);
