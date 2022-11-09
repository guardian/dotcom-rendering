import { css } from '@emotion/react';
import type { SerializedStyles } from '@emotion/react';
import type { ArticleFormat } from '@guardian/libs';
import {
	focusHalo,
	neutral,
	remHeight,
	space,
	textSans,
	visuallyHidden,
} from '@guardian/source-foundations';
import { Label } from '@guardian/source-react-components';
import { decidePalette } from 'src/web/lib/decidePalette';

interface FileInputProps {
	mandatory: boolean;
	name: string;
	supporting?: string;
	label: string;
	cssOverrides?: SerializedStyles;
	format: ArticleFormat;
}

const fieldLabelStyles = css`
	${textSans.small()};
	color: ${neutral[46]};
`;

const customUpload = (format: ArticleFormat): SerializedStyles => css`
	${textSans.small()};
	color: ${decidePalette(format).text.richLink};
	border: 1px solid ${decidePalette(format).text.richLink};
	display: inline-flex;
	justify-content: space-between;
	align-items: center;
	box-sizing: border-box;
	background: transparent;
	cursor: pointer;
	transition: all 0.3s ease-in-out 0s;
	text-decoration: none;
	white-space: nowrap;
	height: ${remHeight.ctaXsmall}rem;
	min-height: ${remHeight.ctaXsmall}rem;
	padding: ${space[3]};
	margin: ${space[3]};
	border-radius: ${remHeight.ctaMedium}rem;
	${textSans.medium({ fontWeight: 'medium' })};

	&:focus-within,
	&:focus {
		${focusHalo};
	}
`;

export const FileInput = ({
	name,
	label,
	mandatory,
	supporting,
	cssOverrides,
	format,
}: FileInputProps) => {
	// TODO: Remove file button
	return (
		<Label
			text={label}
			supporting={supporting}
			optional={!mandatory}
			cssOverrides={cssOverrides}
		>
			<p css={fieldLabelStyles}>
				May not work on some mobile devices, or files may be too large.
			</p>
			<div css={customUpload(format)}>
				Choose File
				<input
					id={name}
					name={name}
					type="file"
					accept="image/*, .pdf"
					required={mandatory}
					css={css`
						${visuallyHidden}
					`}
				/>
			</div>
		</Label>
	);
};
