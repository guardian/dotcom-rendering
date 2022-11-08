import { css } from '@emotion/react';
import { palette, space, text, textSans } from '@guardian/source-foundations';
import { Button } from '@guardian/source-react-components';
import React, { useState } from 'react';
import { decidePalette } from '../../../lib/decidePalette';
import { stringifyFileBase64 } from '../../../lib/stringifyFileBase64';
import { FieldLabel } from './FieldLabel';

const errorMessagesStyles = css`
	padding-top: ${space[2]}px;
	color: ${palette.error};
	${textSans.small({ fontWeight: 'bold' })};
`;

type Props = {
	format: ArticleFormat;
	formField: CampaignFieldFile;
	formData: { [key in string]: any };
	setFormData: React.Dispatch<React.SetStateAction<{ [x: string]: any }>>;
};

const buttonStyles = (format: ArticleFormat) =>
	css`
		margin-top: ${space[2]}px;
		width: fit-content;
		border: ${decidePalette(format).text.richLink} solid 1px;
		color: ${decidePalette(format).text.richLink};
	`;

export const FileUpload = ({ formField, format, setFormData }: Props) => {
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
					'Sorry, there was a problem with the file you uploaded above. Check the size and type. We only accept images, pdfs and .doc or .docx files',
				);
			}
		}
	};
	return (
		<>
			<FieldLabel formField={formField} />
			<Button
				css={buttonStyles(format)}
				priority="tertiary"
				size="xsmall"
				type="submit"
				onChange={onSelectFile}
			>
				Choose file
			</Button>
			{!!error && <div css={errorMessagesStyles}>{error}</div>}
		</>
	);
};
