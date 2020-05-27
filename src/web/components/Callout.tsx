import React, { useState, useEffect } from 'react';
import { css, cx } from 'emotion';

import { textSans } from '@guardian/src-foundations/typography';
import { palette } from '@guardian/src-foundations';
import { Button } from '@guardian/src-button';

import PlusIcon from '@frontend/static/icons/plus.svg';
import MinusIcon from '@frontend/static/icons/minus.svg';

const rowStyle = css`
    display: flex;
    flex-direction: row;
`;

const columnStyles = css`
    display: flex;
    flex-direction: column;
    justify-content: space-between;
`;

const addFormField = (formField: CampaignsFeildType) => {
    switch (formField.type) {
        case 'textarea':
            return (
                <textarea
                    name={`field_${formField.id}`}
                    required={formField.required === '1' ? true : false}
                />
            );
        case 'file':
            return (
                <>
                    <input
                        name={`field_${formField.id}`}
                        type="file"
                        accept="image/*, .pdf"
                        required={formField.required === '1' ? true : false}
                    />
                    <p className="form-info-text">
                        We accept images and pdfs. Maximum total file size: 6MB
                    </p>
                </>
            );
        case 'select':
            return (
                <select
                    name={`field_${formField.id}`}
                    required={formField.required === '1' ? true : false}
                >
                    {formField.options &&
                        formField.options.map(option => (
                            <option value={option.value}>{option.value}</option>
                        ))}
                </select>
            );
        case 'radio':
        case 'checkbox':
            return (
                <div className="form_option_container">
                    {formField.options &&
                        formField.options.map(option => (
                            <>
                                <input
                                    type={formField.type}
                                    value={option.value}
                                    id={option.label}
                                    name={`field_${formField.id}`}
                                />
                                <label htmlFor={option.label}>
                                    {option.value}
                                </label>
                            </>
                        ))}
                </div>
            );
        default:
            return (
                <input
                    name={`field_${formField.id}`}
                    type={formField.type}
                    required={formField.required === '1' ? true : false}
                />
            );
    }
};

const rootStyle = css`
    margin-top: 1rem;
    margin-bottom: 0.75rem;
    position: relative;
`;
// TODO: find better name
const snippetStyles = css`
    border-top: 0.0625rem #dcdcdc solid;
    border-bottom: 0.0625rem #dcdcdc solid;
    position: relative;
    padding: 0;
`;

const speechBubbleWrapperStyles = css`
    margin-right: 10px;
`;

const speechBubbleStyles = css`
    ${textSans.medium({ fontWeight: 'bold' })}
    color: #fff;
    background-color: #c70000;
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
        background-color: #c70000;
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
    cursor: pointer;
    display: -webkit-inline-flex;
    display: -ms-inline-flexbox;
    display: inline-flex;
    -webkit-align-items: center;
    -ms-flex-align: center;
    align-items: center;
    border: 0;
    margin: 0 0 0 0.625rem;
`;

const termsAndConditionsStyles = css``;
const submitButtonStyles = css``;
const errorStyles = css``;

export const Callout = ({ campaign }: { campaign: CampaignsType }) => {
    const [isExpanded, setIsExpanded] = useState(false);
    const [error, setError] = useState('');
    useEffect(() => {
        setError('');
    }, []);

    // const name = campaign.name;
    const title = campaign.fields.callout;
    const description = campaign.fields.description;
    const formFields = campaign.fields.formFields;
    const formId = campaign.fields.formId;
    // const tagName = campaign.fields.tagName;

    return (
        <figure className={rootStyle}>
            <details className={snippetStyles}>
                <summary>
                    <div className={cx(rowStyle)}>
                        <div className={speechBubbleWrapperStyles}>
                            <div className={speechBubbleStyles}>
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
                        {/* TODO: should be conditionally rendered if bumission is true */}
                        {/* <div className="success_box">
                            <p className="success-message">
                                Thank you for your contribution
                            </p>
                        </div> */}
                    </div>
                    <span className={buttonWrapperStyles} aria-hidden="true">
                        {!isExpanded ? (
                            <Button
                                iconSide="left"
                                size="small"
                                icon={<PlusIcon />}
                                onClick={() => setIsExpanded(true)}
                            >
                                Tell us
                            </Button>
                        ) : (
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
                </summary>

                <form
                    action="/formstack-campaign/submit"
                    method="post"
                    className={columnStyles}
                >
                    <input name="formId" type="hidden" value={formId} />

                    {formFields.map(formField => (
                        <>
                            <label htmlFor={formField.name}>
                                {formField.label}
                                {formField.description && (
                                    <span>{`(${formField.description})`}</span>
                                )}
                                {formField.required === '1' && '*'}
                            </label>
                            {addFormField(formField)}
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
                            </div>
                        </div>
                    */}
                    <div className={rowStyle}>
                        <button className={submitButtonStyles} type="submit">
                            Share with the Guardian
                        </button>
                        <a
                            className={termsAndConditionsStyles}
                            href="https://www.theguardian.com/help/terms-of-service"
                        >
                            Terms and conditions
                        </a>
                    </div>
                    {error && <div className={errorStyles}>{error}</div>}
                </form>
            </details>
        </figure>
    );
};
