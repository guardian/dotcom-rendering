import { css } from '@emotion/react';
import { space } from '@guardian/source-foundations';
import { Select as SourceSelect } from '@guardian/source-react-components';
import { FieldLabel } from './FieldLabel';

const textInputStyles = css`
	margin-top: ${space[2]}px;
`;

type Props = {
	formField: CampaignFieldSelect;
	formData: { [key in string]: any };
	setFormData: React.Dispatch<React.SetStateAction<{ [x: string]: any }>>;
};

export const Select = ({ formField, formData, setFormData }: Props) => (
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
		{/* <select
			css={textInputStyles}
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
			{formField.options.map((option, index) => (
				<option key={index} value={option.value}>
					{option.value}
				</option>
			))}
		</select> */}
	</>
);
