import { css } from '@emotion/react';
import { space } from '@guardian/source/foundations';
import { TextInput as SourceTextInput } from '@guardian/source/react-components';
import type { CampaignFieldText } from '../../../types/content';

const textInputStyles = css`
	margin-top: ${space[2]}px;
`;

type Props = {
	validationErrors?: Record<string, string>;
	formField: CampaignFieldText;
	formData: Record<string, any>;
	setFormData: React.Dispatch<React.SetStateAction<Record<string, any>>>;
};

export const TextInput = ({
	validationErrors,
	formField,
	formData,
	setFormData,
}: Props) => (
	<SourceTextInput
		hideLabel={formField.hideLabel}
		error={validationErrors?.[formField.id]}
		cssOverrides={textInputStyles}
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
