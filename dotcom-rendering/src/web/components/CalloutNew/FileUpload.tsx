import { css } from '@emotion/react';
import { Button, Link } from '@guardian/source-react-components';
import { space, text, textSans } from '@guardian/source-foundations';
import { useState } from 'react';
import { stringifyFileBase64 } from '../../lib/stringifyFileBase64';
import { FieldLabel } from './FieldLabel';
import { news } from '@guardian/source-foundations';

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
			<Button
				css={css`
					width: fit-content;
					border: ${news[300]} solid 1px;
					color: ${news[300]};
				`}
				priority="tertiary"
				size="xsmall"
				type="submit"
			>
				Choose file
			</Button>
			{!!error && <div css={errorMessagesStyles}>{error}</div>}
		</>
	);
};
