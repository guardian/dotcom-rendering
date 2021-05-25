import { css } from '@emotion/react';

import { TextInput as SourceTextInput } from '@guardian/src-text-input';
import { space } from '@guardian/src-foundations';

const textInputStyles = css`
	margin-top: ${space[2]}px;
`;

type Props = {
	formField: CampaignFieldText;
	formData: { [key in string]: any };
	setFormData: React.Dispatch<React.SetStateAction<{ [x: string]: any }>>;
};

export const TextInput = ({ formField, formData, setFormData }: Props) => (
	<SourceTextInput
		css={textInputStyles}
		data-testid={`form-field-${formField.id}`}
		type={formField.type}
		label={formField.label}
		supporting={formField.description}
		optional={!formField.required}
		value={formField.id in formData ? formData[formField.id] : ''}
		onChange={(e) =>
			setFormData({
				...formData,
				[formField.id]: e.target.value,
			})
		}
	/>
);
