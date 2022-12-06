import { css } from '@emotion/react';
import type { ArticleFormat } from '@guardian/libs';
import { visuallyHidden } from '@guardian/source-foundations';
import { useState } from 'react';
import type { ReactElement } from 'react';
import {
	customUpload,
	fieldSupportingStyles,
} from './styles';

interface FileInputProps {
	name: string;
	format: ArticleFormat;
	mandatory: boolean;
}

const FileInput = ({
	name,
	format,
	mandatory = false,
}: FileInputProps): ReactElement => {
	const [chosenFile, setChosenFile] = useState<null | string>();
	const getFileName = (filepath?: string): string =>
		filepath?.split(/(\\|\/)/g).pop() ?? '';
	return (
		<>
			<p css={fieldSupportingStyles}>
				May not work on some mobile devices, or files may be too
				large.
			</p>
			<div css={customUpload(format)}>
				{chosenFile ? 'Change File' : 'Choose File'}
				<input
					name={name}
					type="file"
					accept="image/*, .pdf"
					css={css`
						${visuallyHidden}
					`}
					onChange={(e): void => setChosenFile(e.target.value)}
					required={mandatory}
				/>
				</div>
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
