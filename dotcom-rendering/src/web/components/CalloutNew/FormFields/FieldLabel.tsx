import { css } from '@emotion/react';
import { neutral, textSans } from '@guardian/source-foundations';
import { ReactElement } from 'react';
import { CampaignFieldType } from 'src/types/content';

const fieldLabelStyles = css`
	${textSans.medium({ fontWeight: 'bold' })}
`;

const fieldDescription = css`
	${textSans.small()}
	color: ${neutral[46]};
`;

const optionalTextStyles = css`
	${textSans.small({ fontStyle: 'italic' })}
	color: ${neutral[46]};
	padding-left: 5px;
`;

export const FieldLabel = ({
	formField,
	children,
}: {
	formField: CampaignFieldType;
	children?: ReactElement;
}) =>
	formField.hideLabel ? (
		<>{children && children}</>
	) : (
		<label css={fieldLabelStyles} htmlFor={formField.name}>
			{formField.label}
			{!formField.required && (
				<span css={optionalTextStyles}>Optional</span>
			)}
			{!!formField.description && (
				<div>
					<span
						css={fieldDescription}
					>{`${formField.description}`}</span>
				</div>
			)}
			{children && children}
		</label>
	);
