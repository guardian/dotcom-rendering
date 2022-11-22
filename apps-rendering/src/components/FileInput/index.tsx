import { css } from '@emotion/react';
import type { SerializedStyles } from '@emotion/react';
import type { ArticleFormat } from '@guardian/libs';
import {
	focusHalo,
	remHeight,
	remSpace,
	textSans,
	visuallyHidden,
} from '@guardian/source-foundations';
import { Label } from '@guardian/source-react-components';
import { useState } from 'react';
import type { ReactElement } from 'react';

interface FileInputProps {
	mandatory: boolean;
	name: string;
	supporting?: string;
	label: string;
	cssOverrides?: SerializedStyles;
	format: ArticleFormat;
	disabled: boolean;
}

const fieldSupportingStyles = (theme: any): SerializedStyles => css`
	${textSans.small()};
	color: ${theme.supporting};
`;
const fieldLabelStyles = (theme: any): SerializedStyles => css`
	${textSans.small()};
	color: ${theme.text};
`;

const customUpload = (theme: any): SerializedStyles => css`
	${textSans.small()};
	color: ${theme.fileInputButton};
	border: 1px solid ${theme.fileInputButton};
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
	margin: ${remSpace[3]} ${remSpace[1]};
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
	disabled,
	format,
}: FileInputProps): ReactElement => {
	const [chosenFile, setChosenFile] = useState<null | string>();
	const getFileName = (filepath?: string): string =>
		filepath?.split(/(\\|\/)/g).pop() ?? '';
	return (
		<>
			<Label
				text={label}
				supporting={supporting}
				optional={!mandatory}
				cssOverrides={cssOverrides}
				css={fieldLabelStyles}
			>
				<p css={fieldSupportingStyles}>
					May not work on some mobile devices, or files may be too
					large.
				</p>
				<div css={customUpload}>
					{chosenFile ? 'Change File' : 'Choose File'}
					<input
						id={name}
						name={name}
						type="file"
						accept="image/*, .pdf"
						required={mandatory}
						css={css`
							${visuallyHidden}
						`}
						onChange={(e): void => setChosenFile(e.target.value)}
						disabled={disabled}
					/>
				</div>
			</Label>
			{chosenFile && (
				<>
					{!mandatory && (
						<button
							css={customUpload}
							onClick={(): void => {
								setChosenFile(undefined);
							}}
						>
							Remove File
						</button>
					)}
					<span>{getFileName(chosenFile)}</span>
				</>
			)}
		</>
	);
};
export default FileInput;
