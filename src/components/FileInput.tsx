import React, { ReactElement } from "react";
import { textSans } from "@guardian/src-foundations/typography";
import { css } from "@emotion/core";
import { neutral } from "@guardian/src-foundations";

interface FileInputProps {
    required: boolean;
    name: string;
    label: string;
}

const optionalLabelStyles = css`
    ${textSans.small({ fontStyle: "italic" })};
    color: ${neutral[46]};
`;

const labelStyles = css`
    ${textSans.medium({ fontWeight: 'bold' })};
`;

const optionalLabel = (required: boolean): ReactElement =>
    required ? <></> : <span css={optionalLabelStyles}>Optional</span>

const FileInput = (props: FileInputProps): ReactElement =>
    <>
        <label css={labelStyles} htmlFor={props.name}>{props.label} {optionalLabel}</label>
        <input
            name={props.name}
            type="file"
            accept="image/*, .pdf"
            required={props.required}
        />
        <p>We accept images and pdfs. Maximum total file size: 6MB</p>
    </>

export default FileInput;
