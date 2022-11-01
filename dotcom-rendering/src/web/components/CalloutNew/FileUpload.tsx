import { css } from '@emotion/react';
import { news, space, text, textSans } from '@guardian/source-foundations';
import { Button } from '@guardian/source-react-components';
import { useState } from 'react';
import { FieldLabel } from './FieldLabel';

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

export const FileUpload = ({ formField }: Props) => {
	const [error] = useState('');
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
