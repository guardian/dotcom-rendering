import React, { useState, useEffect } from 'react';
import { css, cx } from 'emotion';

import { textSans } from '@guardian/src-foundations/typography';
import { neutral } from '@guardian/src-foundations/palette';
import { palette } from '@guardian/src-foundations';
import { Button } from '@guardian/src-button';
import { TextInput } from '@guardian/src-text-input';
import { RadioGroup, Radio } from '@guardian/src-radio';
import { Link } from '@guardian/src-link';

import PlusIcon from '@frontend/static/icons/plus.svg';
import MinusIcon from '@frontend/static/icons/minus.svg';

const rowStyle = css`
    display: flex;
    flex-direction: row;
    justify-content: space-between;
`;

const columnStyles = css`
    display: flex;
    flex-direction: column;
    justify-content: space-between;
`;

const fieldLabelStyles = css`
    ${textSans.medium({ fontWeight: 'bold' })}
`;

const fieldDescription = css`
    ${textSans.medium()}
`;

const optionalTextStyles = css`
    ${textSans.small({ fontStyle: 'italic' })}
    color: ${neutral[46]};
    padding-left: 5px;
`;

const fileUploadInputStyles = css`
    padding-top: 10px;
    padding-bottom: 10px;
`;

const FieldLabel = ({ formField }: { formField: CampaignsFeildType }) => (
    <label className={fieldLabelStyles} htmlFor={formField.name}>
        <div>
            {formField.label}
            {formField.required === '1' && (
                <span className={optionalTextStyles}>Optional</span>
            )}
        </div>
        {formField.description && (
            <div>
                <span className={fieldDescription}>
                    {`(${formField.description})`}
                </span>
            </div>
        )}
    </label>
);

const addFormField = ({
    formField,
    formData,
    setFormData,
}: {
    formField: CampaignsFeildType;
    formData: { [key in string]: any };
    setFormData: React.Dispatch<React.SetStateAction<{ [x: string]: any }>>;
}) => {
    switch (formField.type) {
        case 'textarea':
            return (
                <>
                    <FieldLabel formField={formField} />
                    <textarea
                        name={formField.id}
                        required={formField.required === '1'}
                        value={
                            formField.id && formField.id in formData
                                ? formData[formField.id]
                                : ''
                        }
                        onChange={e =>
                            setFormData({
                                ...formData,
                                [formField.id || '']: e.target.value,
                            })
                        }
                    />
                </>
            );
        case 'file':
            return (
                <>
                    <FieldLabel formField={formField} />
                    <input
                        className={fileUploadInputStyles}
                        name={formField.id}
                        type="file"
                        accept="image/*, .pdf"
                        required={formField.required === '1'}
                        onChange={e =>
                            setFormData({
                                ...formData,
                                [formField.id || '']:
                                    e.target.files && e.target.files[0],
                            })
                        }
                    />
                    <p className="form-info-text">
                        We accept images and pdfs. Maximum total file size: 6MB
                    </p>
                </>
            );
        case 'select':
            return (
                <>
                    <FieldLabel formField={formField} />
                    <select
                        name={`${formField.id}`}
                        required={formField.required === '1'}
                        value={
                            formField.id && formField.id in formData
                                ? formData[formField.id]
                                : ''
                        }
                        onChange={e =>
                            setFormData({
                                ...formData,
                                [formField.id || '']: e.target.value,
                            })
                        }
                    >
                        {formField.options &&
                            formField.options.map(option => (
                                <option value={option.value}>
                                    {option.value}
                                </option>
                            ))}
                    </select>
                </>
            );
        case 'radio':
        case 'checkbox':
            return (
                <>
                    <FieldLabel formField={formField} />
                    {formField.options && (
                        <RadioGroup
                            name={formField.name || ''}
                            orientation="horizontal"
                        >
                            {formField.options.map(option => {
                                const isRadioChecked =
                                    formField.id &&
                                    formField.id in formData &&
                                    formData[formField.id] === option.value;
                                return (
                                    <Radio
                                        label={option.value}
                                        value={option.value}
                                        name={`${formField.id}`}
                                        checked={!!isRadioChecked}
                                        onChange={() =>
                                            setFormData({
                                                ...formData,
                                                [formField.id ||
                                                '']: option.value,
                                            })
                                        }
                                    />
                                );
                            })}
                        </RadioGroup>
                    )}
                </>
            );
        default: {
            return (
                <TextInput
                    name={`${formField.id}`}
                    type={formField.type}
                    label={formField.label || ''}
                    supporting={formField.description}
                    optional={formField.required !== '1'}
                    value={
                        formField.id && formField.id in formData
                            ? formData[formField.id]
                            : ''
                    }
                    onChange={e =>
                        setFormData({
                            ...formData,
                            [formField.id || '']: e.target.value,
                        })
                    }
                />
            );
        }
    }
};

// TODO: find better name
const snippetStyles = css`
    border-top: 1px ${neutral[86]} solid;
    border-bottom: 1px ${neutral[86]} solid;
    position: relative;
    padding-bottom: 10px;
`;

const snippetExpandedStyle = css`
    background-color: ${neutral[97]};
`;

const speechBubbleWrapperStyles = css`
    margin-right: 10px;
`;

// Removing default styles from summery tag
const summeryStyles = css`
    ::-webkit-details-marker {
        display: none;
    }
    outline: none;
`;

const formStyles = css`
    padding-left: 10px;
    padding-right: 10px;
`;

const speechBubbleStyles = (pillar: Pillar) => css`
    ${textSans.medium({ fontWeight: 'bold' })}
    color: ${neutral[100]};
    background-color: ${palette[pillar][400]};
    min-width: 88px;
    padding-bottom: 6px;
    padding-left: 10px;
    padding-right: 10px;
    ::after {
        content: '';
        width: 20px;
        height: 22px;
        border-bottom-right-radius: 18px;
        position: absolute;
        background-color: ${palette[pillar][400]};
    }
`;

const headingTextHeaderStyles = css`
    ${textSans.medium({ fontWeight: 'bold' })}
`;

const headingTextStyles = css`
    a {
        color: ${palette.brand[500]};
        text-decoration: none;
        :hover {
            text-decoration: underline;
        }
    }
`;

const buttonWrapperStyles = css`
    position: absolute;
    cursor: pointer;
    margin-top: -5px;
`;

const footerPaddingStyles = css`
    padding-bottom: 40px;
`;

const termsAndConditionsStyles = css``;
const submitButtonStyles = css``;
const errorStyles = css``;

export const Callout = ({
    campaign,
    pillar,
}: {
    campaign: CampaignsType;
    pillar: Pillar;
}) => {
    const [isExpanded, setIsExpanded] = useState(false);
    const [error, setError] = useState('');

    // As the form is dynamically rendered, we cannot have
    // individual setStates for each field
    const [formData, setFormData] = useState<{ [key in string]: any }>({});

    useEffect(() => {
        setError('');
    }, []);

    // const name = campaign.name;
    const title = campaign.fields.callout;
    const { description } = campaign.fields;
    const { formFields } = campaign.fields;
    const { formId } = campaign.fields;
    // const tagName = campaign.fields.tagName;

    return (
        <figure>
            <details
                className={cx(snippetStyles, {
                    [snippetExpandedStyle]: isExpanded,
                })}
                // we want to prevent default behavior of details HTML element in favor of buttons
                onClick={e => {
                    e.preventDefault();
                    e.stopPropagation();
                }}
                aria-hidden={true}
                open={isExpanded}
            >
                <summary className={summeryStyles}>
                    <div className={cx(rowStyle)}>
                        <div className={speechBubbleWrapperStyles}>
                            <div className={speechBubbleStyles(pillar)}>
                                <h4>Share your story</h4>
                            </div>
                        </div>
                        <div className={headingTextStyles}>
                            <h4 className={headingTextHeaderStyles}>{title}</h4>
                            {description && (
                                <div
                                    dangerouslySetInnerHTML={{
                                        __html: description,
                                    }}
                                />
                            )}
                        </div>
                        {/* TODO: should be conditionally rendered if submission is true */}
                        {/* <div className="success_box">
                            <p className="success-message">
                                Thank you for your contribution
                            </p>
                        </div> */}
                    </div>
                    <span className={buttonWrapperStyles} aria-hidden="true">
                        {!isExpanded && (
                            <Button
                                iconSide="left"
                                size="small"
                                icon={<PlusIcon />}
                                onClick={() => setIsExpanded(true)}
                            >
                                Tell us
                            </Button>
                        )}
                    </span>
                </summary>

                <form
                    action="/formstack-campaign/submit"
                    method="post"
                    className={cx(formStyles, columnStyles)}
                >
                    <input name="formId" type="hidden" value={formId} />

                    {formFields.map(formField => (
                        <>
                            {addFormField({ formField, formData, setFormData })}
                            <hr />
                        </>
                    ))}

                    {/*
                        TODO: this element is a H O N £ Y - P 0 T
                        <div
                            className="form_input form_input--twitter-handle"
                            aria-hidden="true"
                        >
                            <div className="form_field">
                                <input
                                    name="twitter-handle"
                                    type="text"
                                    id="twitter-handle"
                                    placeholder="@mytwitterhandle"
                                />
                                <hr />
                            </div>
                        </div>
                    */}
                    {error && <div className={errorStyles}>{error}</div>}
                    <div className={cx(rowStyle, footerPaddingStyles)}>
                        <Button
                            priority="secondary"
                            className={submitButtonStyles}
                            size="small"
                            type="submit"
                        >
                            Share with the Guardian
                        </Button>
                        <Link
                            className={termsAndConditionsStyles}
                            subdued={true}
                            priority="secondary"
                            target="_blank"
                            href="https://www.theguardian.com/help/terms-of-service"
                        >
                            Terms and conditions
                        </Link>
                    </div>
                </form>
                <span className={buttonWrapperStyles} aria-hidden="true">
                    {isExpanded && (
                        <Button
                            iconSide="left"
                            size="small"
                            icon={<MinusIcon />}
                            onClick={() => setIsExpanded(false)}
                        >
                            Hide
                        </Button>
                    )}
                </span>
            </details>
        </figure>
    );
};
