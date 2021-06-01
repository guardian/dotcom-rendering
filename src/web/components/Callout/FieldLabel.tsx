import { css } from '@emotion/react';

import { textSans } from '@guardian/src-foundations/typography';
import { neutral } from '@guardian/src-foundations/palette';

const fieldLabelStyles = css`
	${textSans.medium({ fontWeight: 'bold' })}
`;

const fieldDescription = css`
	${textSans.medium()}
`;

const optionalTextStyles = css`
	${textSans.small({ fontStyle: 'italic' })}
	color: ${neutral[46]};
	padding-left: 5px;
`;

export const FieldLabel = ({ formField }: { formField: CampaignField }) => (
	<label css={fieldLabelStyles} htmlFor={formField.name}>
		{formField.label}
		{!formField.required && <span css={optionalTextStyles}>Optional</span>}
		{formField.description && (
			<div>
				<span css={fieldDescription}>
					{`(${formField.description})`}
				</span>
			</div>
		)}
	</label>
);
