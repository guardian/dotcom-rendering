import { css } from '@emotion/react';
import type { FormField } from '@guardian/apps-rendering-api-models/formField';
import type { ArticleFormat } from '@guardian/libs';
import {
	error as errorStyle,
	visuallyHidden,
} from '@guardian/source-foundations';
import { InlineError, Label } from '@guardian/source-react-components';
import { useEffect, useState } from 'react';
import type { ReactElement } from 'react';
import { darkModeCss } from 'styles';
import { stringifyFileBase64 } from './stringifyFileBase64';
import {
	customUpload,
	fieldLabelStyles,
	fieldSupportingStyles,
} from './styles';

interface FileInputProps {
	format: ArticleFormat;
	formField: FormField;
	setFieldInFormData: (
		id: string,
		data: string | string[] | undefined,
	) => void;
	error?: string;
}

const FileInput = ({
	formField,
	format,
	setFieldInFormData,
	error,
}: FileInputProps): ReactElement => {
	const { id, name, mandatory, label, description } = formField;

	const [chosenFile, setChosenFile] = useState<null | string>();
	const [fileError, setFileError] = useState(error);

	useEffect(() => {
		setFileError(error);
	}, [error]);

	const getFileName = (filepath?: string): string =>
		filepath?.split(/(\\|\/)/g).pop() ?? '';

	const onSelectFile = async (
		event: React.ChangeEvent<HTMLInputElement>,
	): Promise<void> => {
		setChosenFile(event.target.value);
		if (event.target.files?.[0]) {
			setFileError('');
			try {
				const stringifiedFile = await stringifyFileBase64(
					event.target.files[0],
				);
				setFieldInFormData(id, stringifiedFile);
			} catch (e) {
				setFileError(
					'Sorry there was a problem with the file you uploaded above. Check the size and type. We only accept images, pdfs and .doc or .docx files',
				);
			}
		}
	};

	const onRemoveFile = (): void => {
		setChosenFile(undefined);
		setFieldInFormData(id, undefined);
	};

	return (
		<>
			<Label
				id={name}
				key={name}
				text={label}
				supporting={description}
				optional={!mandatory}
				cssOverrides={fieldLabelStyles}
			>
				{fileError && (
					<InlineError
						cssOverrides={css`
							color: ${errorStyle[400]};
							${darkModeCss`
				color: ${errorStyle[500]};
			`}
						`}
					>
						{fileError}
					</InlineError>
				)}

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
						onChange={onSelectFile}
						required={mandatory}
					/>
				</div>
			</Label>
			{chosenFile && (
				<>
					{!mandatory && (
						<button
							css={customUpload(format)}
							onClick={onRemoveFile}
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
