import { css } from '@emotion/react';
import type { SerializedStyles } from '@emotion/react';
import type { ArticleFormat } from '@guardian/libs';
import { visuallyHidden } from '@guardian/source-foundations';
import { Label } from '@guardian/source-react-components';
import { useState } from 'react';
import type { ReactElement } from 'react';
import {
	customUpload,
	fieldLabelStyles,
	fieldSupportingStyles,
} from './styles';

interface FileInputProps {
	mandatory: boolean;
	name: string;
	supporting?: string;
	label: string;
	cssOverrides?: SerializedStyles;
	format: ArticleFormat;
	disabled: boolean;
}

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
				<div css={customUpload(format)}>
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
							css={customUpload(format)}
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
