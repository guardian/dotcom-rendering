import React, { FC, ReactElement } from 'react';
import { css, SerializedStyles } from '@emotion/core';
import { Campaign } from '@guardian/apps-rendering-api-models/campaign';
import { neutral, remSpace, text } from '@guardian/src-foundations';
import { Button } from '@guardian/src-button';
import { SvgMinus, SvgPlus } from '@guardian/src-icons';
import { Format } from '@guardian/types/Format';
import { getPillarStyles } from 'pillarStyles';
import { headline, textSans, body } from '@guardian/src-foundations/typography';
import { TextInput } from '@guardian/src-text-input';
import { TextArea } from '@guardian/src-text-area';
import { FormField } from '@guardian/apps-rendering-api-models/formField';
import { darkModeCss } from 'styles';
import FileInput from 'components/FileInput';
import RadioInput from 'components/RadioInput';
import { plainTextElement } from 'renderer';

export interface CalloutProps {
    campaign: Campaign;
    format: Format;
    description: DocumentFragment;
}

const calloutStyles = css`
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
    
        .kicker {
            display: flex;
            flex-direction: row;
    
            > .logo {
                flex: initial;
            }
        }
    }

    .description {
        margin: ${remSpace[3]};

        p {
            ${body.small({ lineHeight: 'tight' })};
            margin: ${remSpace[2]} 0;
        }
    }

    .error-message {
        color: ${text.error};
    }

    ${darkModeCss`
        background: white;
        color: ${neutral[7]};
        border: none;
    `}
`;

const speechBubbleStyles = (kicker: string): SerializedStyles => css`
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
`;

const formStyles = (kicker: string): SerializedStyles => css`
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
`;

const renderField = ({ type, label, mandatory, options, id }: FormField): ReactElement | null => {
    const fieldId = `field_${id}`;
    switch (type) {
        case 'text':
            return <TextInput name={fieldId} label={label} optional={!mandatory} />
        case 'textarea':
            return <TextArea name={fieldId} label={label} optional={!mandatory} />
        case 'file':
            return <FileInput required={mandatory} name={fieldId} label={label} />
        case 'radio':
            return <RadioInput options={options} name={fieldId } label={label} />
        default:
            return null;
    }
}

const CalloutForm: FC<CalloutProps> = (props: CalloutProps): ReactElement => {
    const { campaign, format, description } = props;
    const { kicker } = getPillarStyles(format.pillar);

    return (
        <details className="js-callout" css={calloutStyles}>
            <summary css={summaryStyles}>
                <div css={kickerStyles}>
                    <div css={logoStyles}>
                        <div css={speechBubbleStyles(kicker)}>
                            <h4 css={headlineStyles}>Take part</h4>
                        </div>
                    </div>
                    <div css={descriptionStyles}>
                        <h4 css={headlineStyles}>{campaign.fields.callout}</h4>
                        {Array.from(description.childNodes).map(plainTextElement)}
                    </div>
                </div>
                <Button size="xsmall" className="is-off js-callout-expand" iconSide="left" icon={<SvgPlus />}>Tell us</Button>
                <Button size="xsmall" className="is-on js-callout-expand" iconSide="left" icon={<SvgMinus />}>Hide</Button>
            </summary>


            <form css={formStyles(kicker)} action="#" method="post">
                <div>
                    <input name="formId" type="hidden" value={campaign.id} />
                    {campaign.fields.formFields.map(renderField)}
                    <p css={errorStyles} className="js-error-message"></p>
                    <Button type="submit" size="xsmall">Share with the Guardian</Button>
                    <a href="https://www.theguardian.com/help/terms-of-service">Terms and conditions</a>
                </div>
            </form>
        </details>
    )
}

export default CalloutForm;
