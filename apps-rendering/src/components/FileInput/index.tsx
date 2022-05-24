import type { SerializedStyles } from '@emotion/react';
import { css } from '@emotion/react';
import { neutral, textSans } from '@guardian/source-foundations';
import type { ReactElement } from 'react';

interface FileInputProps {
	required: boolean;
	name: string;
	label: string;
	cssOverrides: SerializedStyles;
}

const optionalLabelStyles = css`
	${textSans.small({ fontStyle: 'italic' })};
	color: ${neutral[46]};
`;

const labelStyles = css`
	${textSans.medium({ fontWeight: 'bold' })};
`;

const optionalLabel = (required: boolean): ReactElement | null =>
	required ? null : <span css={optionalLabelStyles}>Optional</span>;

const FileInput = ({
	name,
	label,
	required,
	cssOverrides,
}: FileInputProps): ReactElement => (
	<>
		<label css={labelStyles} htmlFor={name}>
			{label} {optionalLabel(required)}
		</label>
		<input
			id={name}
			name={name}
			type="file"
			accept="image/*, .pdf"
			required={required}
			css={cssOverrides}
		/>
		<p>We accept images and pdfs. Maximum total file size: 6MB</p>
	</>
);

export default FileInput;
