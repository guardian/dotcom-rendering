import { css } from '@emotion/react';
import type { SerializedStyles } from '@emotion/react';
import {
	neutral,
	palette,
	remHeight,
	space,
	textSans,
	visuallyHidden,
} from '@guardian/source-foundations';
import React, { useState } from 'react';
import type { CampaignFieldType } from '../../../../types/content';
import { decidePalette } from '../../../lib/decidePalette';
import { stringifyFileBase64 } from '../../../lib/stringifyFileBase64';
import { FieldLabel } from './FieldLabel';

const errorMessagesStyles = css`
	padding-top: ${space[2]}px;
	color: ${palette.error};
	${textSans.small({ fontWeight: 'bold' })};
`;

const uploadStyles = css`
	display: block;
`;

const textStyles = css`
	${textSans.small()};
	color: ${neutral[46]};
	display: inline-block;
`;

type Props = {
	format: ArticleFormat;
	formField: CampaignFieldType;
	formData: { [key in string]: any };
	setFormData: React.Dispatch<React.SetStateAction<{ [x: string]: any }>>;
	validationErrors: { [key in string]: string };
};

const customUpload = (format: ArticleFormat): SerializedStyles => css`
	color: ${decidePalette(format).text.richLink};
	border: 1.5px solid ${decidePalette(format).text.richLink};
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
	padding: ${space[3]}px;
	margin: ${space[3]}px ${space[3]}px 0px 0px;
	border-radius: ${remHeight.ctaMedium}rem;
	${textSans.medium({ fontWeight: 'bold' })};
	width: fit-content;
`;

export const FileUpload = ({
	formField,
	format,
	formData,
	setFormData,
}: Props) => {
	const [chosenFile, setChosenFile] = useState<null | string>();
	const [error, setError] = useState('');

	const getFileName = (filepath?: string): string =>
		filepath?.split(/(\\|\/)/g).pop() ?? '';

	const onSelectFile = async (event: React.ChangeEvent<HTMLInputElement>) => {
		if (event.target.files?.[0]) {
			setError('');
			try {
				const stringifiedFile = await stringifyFileBase64(
					event.target.files[0],
				);
				setFormData({
					...formData,
					[formField.id]: stringifiedFile,
				});
				setChosenFile(event.target.files[0].name);
			} catch (e) {
				setError(
					'Sorry, there was a problem with the file you uploaded above. Check the size and type. We only accept images, pdfs and .doc or .docx files',
				);
			}
		}
	};
	return (
		<>
			<div css={uploadStyles}>
				<FieldLabel formField={formField} />
				<div>
					<label css={customUpload(format)} htmlFor={formField.id}>
						Choose file
						<input
							id={formField.id}
							data-testid={`form-field-${formField.id}`}
							type="file"
							accept="image/*, .pdf"
							required={formField.required}
							onChange={onSelectFile}
							css={css`
								${visuallyHidden};
							`}
						/>
					</label>
					{chosenFile ? (
						<>
							<button
								type="button"
								css={customUpload(format)}
								onClick={(): void => {
									setChosenFile(undefined);
								}}
							>
								Remove File
							</button>
							<span css={textStyles}>
								{getFileName(chosenFile)}
							</span>
						</>
					) : (
						<div css={textStyles}> No file chosen </div>
					)}
					{!!error && <div css={errorMessagesStyles}>{error}</div>}
				</div>
			</div>
		</>
	);
};
