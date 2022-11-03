import { css } from '@emotion/react';
import { neutral, textSans, visuallyHidden, remSpace, focusHalo, remHeight } from '@guardian/source-foundations';
import { Label } from '@guardian/source-react-components'
import { text } from '@guardian/common-rendering/src/editorialPalette';

import type { SerializedStyles } from '@emotion/react';
import type { ReactElement } from 'react';
import type { ArticleFormat } from '@guardian/libs';

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

// TODO: Can we use button styling rather than copying and pasting it?
// TODO: Simplify this (if possible)
const customUpload = (format: ArticleFormat): SerializedStyles => css`
	${textSans.small()};
	color: ${text.interactiveAtomLink(format)};
    border: 1px solid ${text.interactiveAtomLink(format)};
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
	padding: ${remSpace[3]};
	margin: ${remSpace[3]};
	border-radius: ${remHeight.ctaMedium}rem;
	${textSans.medium({ fontWeight: 'medium' })};

	&:focus-within,
	&:focus {
		${focusHalo};
	}
`;



const FileInput = ({
	name,
	label,
	mandatory,
	supporting,
	cssOverrides,
	format,
}: FileInputProps): ReactElement => (
	<Label
		text={label}
		supporting={supporting}
		optional={!mandatory}
		cssOverrides={cssOverrides}
	>
		<p css={fieldLabelStyles}>May not work on some mobile devices, or files may be too large.</p>
		{/* TODO: Does this work on mobile? */}
		<div css={customUpload(format)}>
			Choose File
			<input
				id={name}
				name={name}
				type="file"
				accept="image/*, .pdf"
				required={mandatory}
				css={css`${visuallyHidden}`}
				/>
		</div>
	</Label>
);

export default FileInput;
