import { css } from '@emotion/react';

import { TextArea as SourceTextArea } from '@guardian/src-text-area';
import { space } from '@guardian/src-foundations';

const textAreaStyles = css`
	width: 100%;
	margin-top: ${space[2]}px;
`;

type Props = {
	formField: CampaignFieldTextArea;
	formData: { [key in string]: any };
	setFormData: React.Dispatch<React.SetStateAction<{ [x: string]: any }>>;
};

export const TextArea = ({ formField, formData, setFormData }: Props) => (
	<>
		<SourceTextArea
			data-testid={`form-field-${formField.id}`}
			label={formField.label}
			css={textAreaStyles}
			optional={!formField.required}
			value={formField.id in formData ? formData[formField.id] : ''}
			onChange={(e) =>
				setFormData({
					...formData,
					[formField.id]: e.target.value,
				})
			}
		/>
	</>
);
