import { css } from '@emotion/react';
import {
	palette as sourcePalette,
	textSans,
	visuallyHidden,
} from '@guardian/source-foundations';
import type { CampaignFieldType } from '../../../types/content';

const fieldLabelStyles = css`
	${textSans.medium({ fontWeight: 'bold' })}
`;

const fieldDescription = css`
	${textSans.medium()}
`;

const optionalTextStyles = css`
	${textSans.small({ fontStyle: 'italic' })}
	color: ${sourcePalette.neutral[46]};
	padding-left: 5px;
`;

type Props = {
	formField: CampaignFieldType;
	hideLabel?: boolean;
};

export const FieldLabel = ({ formField, hideLabel }: Props) => (
	<label
		css={[fieldLabelStyles, hideLabel && visuallyHidden]}
		htmlFor={formField.name}
		hidden={formField.hideLabel}
	>
		{formField.label}
		{!formField.required && <span css={optionalTextStyles}>Optional</span>}
		{!!formField.description && (
			<div>
				<span css={fieldDescription}>{`${formField.description}`}</span>
			</div>
		)}
	</label>
);
