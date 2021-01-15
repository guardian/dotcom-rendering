import React from 'react';

import { TextInput as SourceTextInput } from '@guardian/src-text-input';

type Props = {
	formField: CampaignFieldText;
	formData: { [key in string]: any };
	setFormData: React.Dispatch<React.SetStateAction<{ [x: string]: any }>>;
};

export const TextInput = ({ formField, formData, setFormData }: Props) => (
	<SourceTextInput
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
