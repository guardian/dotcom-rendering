import React, { ReactElement } from "react";
import { textSans } from "@guardian/src-foundations/typography";
import { css } from "@emotion/core";
import { remSpace } from "@guardian/src-foundations";
import { RadioGroup, Radio } from "@guardian/src-radio";
import { FormOption } from "@guardian/apps-rendering-api-models/formOption";

interface RadioInputProps {
    name: string;
    label: string;
    options: FormOption[];
}

const radioStyles = css`
    margin-bottom: ${remSpace[4]};
`;

const labelStyles = css`
    ${textSans.medium({ fontWeight: 'bold' })};
`;


const RadioInput = (props: RadioInputProps): ReactElement =>
    <>
        <label css={labelStyles} htmlFor={props.name}>{props.label}</label>
        <RadioGroup name={props.name} orientation="horizontal" cssOverrides={radioStyles}>
            {
                props.options.map(({ value, label }) => {
                    return (
                        <Radio
                            key={value}
                            value={value}
                            label={label}
                        />
                    )
                })
            }
        </RadioGroup>
    </>

export default RadioInput;
