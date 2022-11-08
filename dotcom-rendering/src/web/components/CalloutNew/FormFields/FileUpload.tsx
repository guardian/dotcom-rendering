import { css } from '@emotion/react';
import { space, text, textSans } from '@guardian/source-foundations';
import { Button } from '@guardian/source-react-components';
import { useState } from 'react';
import { decidePalette } from '../../../lib/decidePalette';
import { FieldLabel } from './FieldLabel';

const errorMessagesStyles = css`
	padding-top: ${space[2]}px;
	color: ${text.error};
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

export const FileUpload = ({ formField, format }: Props) => {
	const [error] = useState('');
	return (
		<>
			<FieldLabel formField={formField} />
			<Button
				css={buttonStyles(format)}
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
