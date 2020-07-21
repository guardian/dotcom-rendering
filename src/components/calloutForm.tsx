import React, { FC, ReactElement } from 'react';
import { css, SerializedStyles } from '@emotion/core';
import { Campaign } from '@guardian/apps-rendering-api-models/campaign';
import { neutral, remSpace } from '@guardian/src-foundations';
import { Button } from '@guardian/src-button';
import { SvgMinus, SvgPlus } from '@guardian/src-svgs';
import { Format } from '@guardian/types/Format';
import { getPillarStyles } from 'pillarStyles';
import { headline, textSans, body } from '@guardian/src-foundations/typography';
import { TextInput } from '@guardian/src-text-input';
import { TextArea } from '@guardian/src-text-area';
import { RadioGroup, Radio } from "@guardian/src-radio"
import { FormField } from '@guardian/apps-rendering-api-models/formField';

export interface CalloutProps {
    campaign: Campaign;
    format: Format;
}

const calloutStyles = (kicker: string): SerializedStyles => css`
    border-top: 1px ${neutral[86]} solid;
    border-bottom: 1px ${neutral[86]} solid;
    position: relative;
    margin: ${remSpace[4]} 0 ${remSpace[9]} 0;

    h4 {
        ${headline.xxxsmall({ fontWeight: 'bold' })};
        margin: 0;
    }

    &:not([open]) .is-on, &[open] .is-off {
        display: none;
    }

    .is-on, .is-off {
        position: absolute;
        transform: translate(0, 50%);
        bottom: 0;
    }

    &[open] {
        background: ${neutral[97]};
    }

    summary {
        outline: none;
        padding: 0;
        list-style: none;
        
        &::-webkit-details-marker {
            display: none;
        }
    
        .campaign--kicker {
            display: flex;
            flex-direction: row;
    
            > .campaign--snippet__heading-logo {
                flex: initial;
    
                .speech-bubble {
                    padding: ${remSpace[3]};
                    position: relative;
                    color: ${neutral[100]};
                    background-color: ${kicker};
                    margin-bottom: ${remSpace[9]};
                    min-width: 5.5rem;

                    &::after {
                        content: '';
                        width: 1.25rem;
                        height: 1.375rem;
                        border-radius: 0 0 1.125rem;
                        position: absolute;
                        bottom: -0.75rem;
                        left: 0.625rem;
                        color: ${neutral[100]};
                        background-color: ${kicker};
                    }
                }
            }
        }
    }
    
    form {
        margin: ${remSpace[4]} ${remSpace[2]} ${remSpace[9]} ${remSpace[2]};

        a {
            color: ${kicker};
            text-decoration: none;
            ${ textSans.small() };
            position: absolute;
            bottom: ${remSpace[2]};
            right: ${remSpace[2]};
        }

        button {
            margin: ${remSpace[4]} 0;
        }

        input {
            margin-bottom: ${remSpace[4]};
        }

        p {
            ${textSans.small()};
        }
    }

    .description {
        margin: ${remSpace[3]};

        p {
            ${body.small({ lineHeight: 'tight' })};
            margin: ${remSpace[2]} 0;
        }
    }
`;

const optionalLabelStyles = css`
    ${textSans.small({ fontStyle: "italic" })};
    color: ${neutral[46]};
`;

const labelStyles = css`
    ${textSans.medium({ fontWeight: 'bold' })};
`;

const renderField = ({ type, label, mandatory, options, id }: FormField): JSX.Element => {
    switch (type) {
        case 'text': {
            return <TextInput name={`field_${id}`} label={label} optional={!mandatory}/>
        }
        case 'textarea': {
            return <TextArea name={`field_${id}`} label={label} optional={!mandatory}/>
        }
        case 'file': {
            const optionalLabel = mandatory ? '' : <span css={optionalLabelStyles}>Optional</span>
            return <>
                <label css={labelStyles} htmlFor={`field_${id}`}>{label} {optionalLabel}</label>
                <input
                    name={`field_${id}`}
                    type="file"
                    accept="image/*, .pdf"
                    required={mandatory}
                />
                <p>We accept images and pdfs. Maximum total file size: 6MB</p>
            </>
        }
        case 'radio': {
            const radioStyles = css`
                margin-bottom: ${remSpace[4]};
            `
            return (
                <>
                    <label css={labelStyles} htmlFor={`field_${id}`}>{label}</label>
                    <RadioGroup name={`field_${id}`} orientation="horizontal" cssOverrides={radioStyles}>
                        {
                            options.map(({ value, label }) => {
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
            )
        }

        default:
            return <></>;
    }
}

const CalloutForm: FC<CalloutProps> = ({ campaign, format }: CalloutProps): ReactElement => {
    const { kicker } = getPillarStyles(format.pillar);

    return (
        <details className="callout" css={calloutStyles(kicker)}>
            <summary>
                <div className="campaign--kicker">
                    <div className="campaign--snippet__heading-logo">
                        <div className="speech-bubble">
                            <h4>Take part</h4>
                        </div>
                    </div>
                    <div className="description">
                        <h4>{campaign.fields.callout}</h4>
                        <div dangerouslySetInnerHTML={{__html: campaign.fields.description ?? ''}}></div>
                    </div>
                </div>
                <Button size="xsmall" className="is-off callout-expand" iconSide="left" icon={<SvgPlus />}>Tell us</Button>
                <Button size="xsmall" className="is-on callout-expand" iconSide="left" icon={<SvgMinus />}>Hide</Button>
            </summary>


            <form action="#" method="post">
                <div>
                    <input name="formId" type="hidden" value={campaign.id} />
                    {campaign.fields.formFields.map(renderField)}
                    <Button type="submit" size="xsmall">Share with the Guardian</Button>
                    <div>
                        <a href="https://www.theguardian.com/help/terms-of-service">Terms and conditions</a>
                    </div>
                </div>
            </form>
        </details>
    )
}

export default CalloutForm;