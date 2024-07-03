import { css } from '@emotion/react';
import {
	palette as sourcePalette,
	textSans17,
	textSansBold17,
	textSansItalic15,
	visuallyHidden,
} from '@guardian/source/foundations';
import type { CampaignFieldType } from '../../../types/content';

const fieldLabelStyles = css`
	${textSansBold17}
`;

const fieldDescription = css`
	${textSans17}
`;

const optionalTextStyles = css`
	${textSansItalic15}
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
