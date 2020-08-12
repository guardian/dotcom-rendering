import React, { ReactElement } from "react";
import { textSans } from "@guardian/src-foundations/typography";
import { css, SerializedStyles } from "@emotion/core";
import { neutral } from "@guardian/src-foundations";

interface FileInputProps {
    required: boolean;
    name: string;
    label: string;
    cssOverrides: SerializedStyles;
}

const optionalLabelStyles = css`
    ${textSans.small({ fontStyle: "italic" })};
    color: ${neutral[46]};
`;

const labelStyles = css`
    ${textSans.medium({ fontWeight: 'bold' })};
`;

const optionalLabel = (required: boolean): ReactElement | null =>
    required ? null : <span css={optionalLabelStyles}>Optional</span>

const FileInput = (props: FileInputProps): ReactElement =>
    <>
        <label css={labelStyles} htmlFor={props.name}>{props.label} {optionalLabel(props.required)}</label>
        <input
            id={props.name}
            name={props.name}
            type="file"
            accept="image/*, .pdf"
            required={props.required}
            css={props.cssOverrides}
        />
        <p>We accept images and pdfs. Maximum total file size: 6MB</p>
    </>

export default FileInput;
