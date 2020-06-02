import React, { useState } from 'react';
import { css, cx } from 'emotion';

import { textSans } from '@guardian/src-foundations/typography';
import { neutral } from '@guardian/src-foundations/palette';
import { palette } from '@guardian/src-foundations';
import { Button } from '@guardian/src-button';
import { TextInput } from '@guardian/src-text-input';
import { RadioGroup, Radio } from '@guardian/src-radio';
import { CheckboxGroup, Checkbox } from '@guardian/src-checkbox';
import { Link } from '@guardian/src-link';

import PlusIcon from '@frontend/static/icons/plus.svg';
import MinusIcon from '@frontend/static/icons/minus.svg';

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

const textAreaStyles = css`
    width: 100%;
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
                        className={textAreaStyles}
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
            return (
                <>
                    <FieldLabel formField={formField} />
                    {formField.options && (
                        <RadioGroup
                            name={formField.name || ''}
                            orientation="horizontal"
                        >
                            {formField.options.map((option, index) => {
                                const isRadioChecked =
                                    formField.id &&
                                    formField.id in formData &&
                                    formData[formField.id] === option.value;
                                return (
                                    <Radio
                                        key={index}
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
        case 'checkbox':
            return (
                <>
                    <FieldLabel formField={formField} />
                    {formField.options && (
                        <CheckboxGroup name={formField.name || ''}>
                            {formField.options.map((option, index) => {
                                const checkboxSelection =
                                    formField.id && formField.id in formData
                                        ? formData[formField.id]
                                        : [];
                                const isCheckboxChecked = checkboxSelection.find(
                                    (ele: string) => ele === option.value,
                                );
                                return (
                                    <Checkbox
                                        key={index}
                                        label={option.value}
                                        value={option.value}
                                        name={`${formField.id}`}
                                        checked={!!isCheckboxChecked}
                                        onChange={() => {
                                            setFormData({
                                                ...formData,
                                                [formField.id ||
                                                '']: isCheckboxChecked
                                                    ? checkboxSelection.filter(
                                                          (ele: string) =>
                                                              ele !==
                                                              option.value,
                                                      )
                                                    : [
                                                          ...checkboxSelection,
                                                          option.value,
                                                      ],
                                            });
                                        }}
                                    />
                                );
                            })}
                        </CheckboxGroup>
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

const backgroundColorStyle = css`
    background-color: ${neutral[97]};
`;

const speechBubbleWrapperStyles = css`
    margin-right: 10px;
`;

const successTextStyles = css`
    ${textSans.medium({ fontWeight: 'bold' })}
`;

const summeryStyles = css`
    /* Removing default styles from summery tag */
    ::-webkit-details-marker {
        display: none;
    }
    outline: none;
`;

const summeryContentWrapper = css`
    min-height: 70px;
    display: flex;
    flex-direction: row;
`;

const formStyles = css`
    display: flex;
    flex-direction: column;
    justify-content: space-between;
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
    display: flex;
    flex-direction: row;
    justify-content: space-between;
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
    const [submissionSuccess, setSubmissionSuccess] = useState(false);

    // As the form is dynamically rendered, we cannot have
    // individual setStates for each field
    const [formData, setFormData] = useState<{ [key in string]: any }>({});
    const [twitterHandle, setTwitterHandle] = useState('');

    // TODO: need to use name and tagName
    // const name = campaign.name;
    // const tagName = campaign.fields.tagName;
    const title = campaign.fields.callout;
    const { description, formFields, formId } = campaign.fields;

    const submitForm = async () => {
        // Reset error for new submission attempt
        setError('');

        if (twitterHandle) {
            setError('Sorry we think you are a robot.');
        }
        // need to add prefix `field_` to all keys in form
        const formDataWithFieldPrefix = Object.keys(formData).reduce(
            (acc, cur) => ({
                ...acc,
                [`field_${cur}`]: formData[cur],
            }),
            {},
        );
        return fetch('/formstack-campaign/submit', {
            method: 'POST',
            body: JSON.stringify({
                formId,
                // TODO: check if we need to send this
                'twitter-handle': twitterHandle,
                ...formDataWithFieldPrefix,
            }),
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded',
            },
            credentials: 'include',
        }).then(resp => {
            if (resp.status === 201) {
                setSubmissionSuccess(true);
                setIsExpanded(false);
            } else {
                setError(
                    'Sorry, there was a problem submitting your form. Please try again later.',
                );
            }
        });
    };

    return (
        <figure>
            <details
                className={cx(snippetStyles, {
                    [backgroundColorStyle]: isExpanded || submissionSuccess,
                })}
                // we want to prevent default behavior of `details` HTML element
                // however we do not want to affect other elements from event bubbling
                onClick={event => {
                    const target = event.target as HTMLElement;
                    if (
                        target.tagName !== 'BUTTON' &&
                        target.tagName !== 'INPUT' &&
                        target.tagName !== 'A'
                    ) {
                        event.preventDefault();
                        event.stopPropagation();
                    }
                }}
                aria-hidden={true}
                open={isExpanded}
            >
                <summary className={summeryStyles}>
                    <div className={summeryContentWrapper}>
                        <div className={speechBubbleWrapperStyles}>
                            <div className={speechBubbleStyles(pillar)}>
                                <h4>Share your story</h4>
                            </div>
                        </div>
                        {!submissionSuccess ? (
                            <div className={headingTextStyles}>
                                <h4 className={headingTextHeaderStyles}>
                                    {title}
                                </h4>
                                {description && (
                                    <div
                                        dangerouslySetInnerHTML={{
                                            __html: description,
                                        }}
                                    />
                                )}
                            </div>
                        ) : (
                            <p className={successTextStyles}>
                                Thank you for your contribution
                            </p>
                        )}
                    </div>
                    {!isExpanded && !submissionSuccess && (
                        <span
                            className={buttonWrapperStyles}
                            aria-hidden="true"
                        >
                            <Button
                                iconSide="left"
                                size="xsmall"
                                icon={<PlusIcon />}
                                onClick={() => setIsExpanded(true)}
                            >
                                Tell us
                            </Button>
                        </span>
                    )}
                </summary>

                <form
                    action="/formstack-campaign/submit"
                    method="post"
                    className={formStyles}
                    onSubmit={e => {
                        e.preventDefault();
                        submitForm();
                    }}
                >
                    <input name="formId" type="hidden" value={formId} />
                    {formFields.map((formField, index) => (
                        <div key={index}>
                            {addFormField({ formField, formData, setFormData })}
                            <hr />
                        </div>
                    ))}
                    {/* this element is a H O N £ Y - P 0 T */}
                    <div
                        className={css`
                            position: absolute;
                            left: -62.5rem;
                        `}
                        aria-hidden="true"
                    >
                        <input
                            name="twitter-handle"
                            type="text"
                            id="twitter-handle"
                            placeholder="@mytwitterhandle"
                            value={twitterHandle}
                            onChange={e => setTwitterHandle(e.target.value)}
                        />
                    </div>
                    {error && <div className={errorStyles}>{error}</div>}
                    <div className={footerPaddingStyles}>
                        <Button
                            priority="secondary"
                            className={submitButtonStyles}
                            size="xsmall"
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
                            size="xsmall"
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
