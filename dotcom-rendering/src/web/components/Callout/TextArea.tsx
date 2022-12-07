import { css } from '@emotion/react';
import { space } from '@guardian/source-foundations';
import { TextArea as SourceTextArea } from '@guardian/source-react-components';
import type { CampaignFieldTextArea } from 'src/types/content';

const textAreaStyles = css`
	width: 100%;
	margin-top: ${space[2]}px;
`;

type Props = {
	validationErrors?: string[];
	formField: CampaignFieldTextArea;
	formData: { [key in string]: any };
	setFormData: React.Dispatch<React.SetStateAction<{ [x: string]: any }>>;
};

export const TextArea = ({
	validationErrors,
	formField,
	formData,
	setFormData,
}: Props) => (
	<>
		<SourceTextArea
			data-testid={`form-field-${formField.id}`}
			label={formField.label}
			supporting={formField.description}
			css={textAreaStyles}
			optional={!formField.required}
			value={formField.id in formData ? formData[formField.id] : ''}
			error={
				validationErrors?.includes(formField.id)
					? 'Please complete all required fields'
					: ''
			}
			onChange={(e) =>
				setFormData({
					...formData,
					[formField.id]: e.target.value,
				})
			}
		/>
	</>
);
