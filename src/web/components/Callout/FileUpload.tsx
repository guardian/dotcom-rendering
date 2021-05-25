import { useState } from 'react';
import { css } from '@emotion/react';

import { textSans } from '@guardian/src-foundations/typography';
import { text } from '@guardian/src-foundations/palette';
import { space } from '@guardian/src-foundations';

import { stringifyFileBase64 } from '../../lib/stringifyFileBase64';
import { FieldLabel } from './FieldLabel';

const fileUploadInputStyles = css`
	padding-top: 10px;
	padding-bottom: 10px;
`;

const errorMessagesStyles = css`
	padding-top: ${space[2]}px;
	color: ${text.error};
	${textSans.small({ fontWeight: 'bold' })};
`;

type Props = {
	formField: CampaignFieldFile;
	formData: { [key in string]: any };
	setFormData: React.Dispatch<React.SetStateAction<{ [x: string]: any }>>;
};

export const FileUpload = ({ formField, formData, setFormData }: Props) => {
	const [error, setError] = useState('');
	const onSelectFile = async (event: React.ChangeEvent<HTMLInputElement>) => {
		if (event.target.files && event.target.files[0]) {
			setError('');
			try {
				const stringifiedFile = await stringifyFileBase64(
					event.target.files[0],
				);
				setFormData({
					...formData,
					[formField.id]: stringifiedFile,
				});
			} catch (e) {
				setError(
					'Sorry there was a problem with the file you uploaded above. Check the size and type. We only accept images, pdfs and .doc or .docx files',
				);
			}
		}
	};

	return (
		<>
			<FieldLabel formField={formField} />
			<input
				data-testid={`form-field-${formField.id}`}
				css={fileUploadInputStyles}
				type="file"
				accept="image/*, .pdf"
				required={formField.required}
				onChange={onSelectFile}
			/>
			<p>We accept images and pdfs. Maximum total file size: 6MB</p>
			{error && <div css={errorMessagesStyles}>{error}</div>}
		</>
	);
};
