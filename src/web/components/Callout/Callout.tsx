import React, { useState, useEffect } from 'react';
import { css, cx } from 'emotion';

import { textSans } from '@guardian/src-foundations/typography';
import { neutral } from '@guardian/src-foundations/palette';
import { palette } from '@guardian/src-foundations';
import { Button } from '@guardian/src-button';
import { TextInput } from '@guardian/src-text-input';
import { Link } from '@guardian/src-link';

import PlusIcon from '@frontend/static/icons/plus.svg';
import MinusIcon from '@frontend/static/icons/minus.svg';

import { RadioWrapper } from './RadioWrapper';
import { CheckboxWrapper } from './CheckboxWrapper';
import { FieldLabel } from './FieldLabel';

type fieldProp = {
    formField: CampaignsFeildType;
    formData: { [key in string]: any };
    setFormData: React.Dispatch<React.SetStateAction<{ [x: string]: any }>>;
    firstFieldElementRef?: React.RefObject<HTMLElement> | null | undefined;
};

const textAreaStyles = css`
    width: 100%;
`;

const fileUploadInputStyles = css`
    padding-top: 10px;
    padding-bottom: 10px;
`;

const addFormField = ({
    formField,
    formData,
    setFormData,
    firstFieldElementRef,
}: fieldProp) => {
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
                            })}
                        // TODO: use ref once forwardRef is implemented @guardian/src-button
                        // ref={firstFieldElementRef}
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
                            })}
                        // TODO: use ref once forwardRef is implemented @guardian/src-button
                        // ref={firstFieldElementRef}
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
                            })}
                        // TODO: use ref once forwardRef is implemented @guardian/src-button
                        // ref={firstFieldElementRef}
                    >
                        {formField.options &&
                            formField.options.map((option, index) => (
                                <option key={index} value={option.value}>
                                    {option.value}
                                </option>
                            ))}
                    </select>
                </>
            );
        // We encapsulate the Componet's state here instead of directly sourcing it from
        // `formData` to avoid unnessesary rerenders, as this was causing selection animation
        // to be applied whenever formData was changing
        case 'radio':
            return (
                <RadioWrapper
                    formField={formField}
                    formData={formData}
                    setFormData={setFormData}
                    firstFieldElementRef={firstFieldElementRef}
                />
            );
        // We encapsulate the Componet's state here instead of directly sourcing it from
        // `formData` to avoid unnessesary rerenders, as this was causing selection animation
        // to be applied whenever formData was changing
        case 'checkbox':
            return (
                <CheckboxWrapper
                    formField={formField}
                    formData={formData}
                    setFormData={setFormData}
                    firstFieldElementRef={firstFieldElementRef}
                />
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
                        })}
                    // TODO: use ref once forwardRef is implemented @guardian/src-button
                    // ref={firstFieldElementRef}
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

// a hack used to make sure we do not highlight the openCallout button on first render
let isFirstTimeRendering = true;

let openCalloutRef: HTMLButtonElement | null = null;
let firstFieldElementRef: HTMLElement | null = null;
let lastElementRef: HTMLButtonElement | null = null;

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

    useEffect(() => {
        // select each DOM element on form expand
        // we have to use this instead of refs as src-* libs do not yet
        // support forward ref
        openCalloutRef = document.querySelector(
            'button[custom-guardian="callout-form-open-button"]',
        );
        firstFieldElementRef = document.querySelector(`
            *[custom-guardian="callout-form-field"]:first-of-type input,
            *[custom-guardian="callout-form-field"]:first-of-type select
        `);
        lastElementRef = document.querySelector(
            'button[custom-guardian="callout-form-close-button"]',
        );

        // on open form, focus on firstFieldElementRef
        if (isExpanded && !isFirstTimeRendering) {
            isFirstTimeRendering = false;
            firstFieldElementRef && firstFieldElementRef.focus();
        } else {
            openCalloutRef && openCalloutRef.focus();
        }

        // lock shift to the form
        const keyListener = (e: KeyboardEvent) => {
            // keyCode 9 is shift shift key
            if (e.keyCode === 9) {
                // If firstElement or lastElement are not defined, do not continue
                if (!firstFieldElementRef || !lastElementRef) return;

                // we use `e.shiftKey` internally to determin the direction of the highlighting
                // using document.activeElement and e.shiftKey we can check what should be the next element to be highlighted
                if (!e.shiftKey && document.activeElement === lastElementRef) {
                    firstFieldElementRef && firstFieldElementRef.focus();
                    e.preventDefault();
                }

                if (
                    e.shiftKey &&
                    document.activeElement === firstFieldElementRef
                ) {
                    lastElementRef && lastElementRef.focus(); // The shift key is down so loop focus back to the last item
                    e.preventDefault();
                }
            }
        };
        document.addEventListener('keydown', keyListener);
        return () => document.removeEventListener('keydown', keyListener);
    }, [isExpanded]);

    // be able to close the form using the escape key for accessibility
    useEffect(() => {
        const keyListener = (e: KeyboardEvent) => {
            // keyCode 27 is the escape key, we want to be able to close the form using it
            if (e.keyCode === 27) {
                setIsExpanded(false);
            }
        };
        isExpanded && document.addEventListener('keydown', keyListener);
        return () => document.removeEventListener('keydown', keyListener);
    }, [isExpanded, setIsExpanded]);

    // highlight first element on expand
    useEffect(() => {
        if (isExpanded) {
            firstFieldElementRef && firstFieldElementRef.focus();
        }
    }, [isExpanded, firstFieldElementRef]);

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
            return;
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
                aria-hidden={true}
                open={isExpanded}
            >
                <summary
                    className={summeryStyles}
                    onClick={event => {
                        const target = event.target as HTMLElement;
                        if (target.tagName !== 'A') {
                            event.preventDefault();
                            event.stopPropagation();
                        }
                    }}
                >
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
                                custom-guardian="callout-form-open-button"
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
                        <div key={index} custom-guardian="callout-form-field">
                            {addFormField({
                                formField,
                                formData,
                                setFormData,
                            })}
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
                            tabIndex={-1}
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
                            custom-guardian="callout-form-close-button"
                            // TODO: use ref once forwardRef is implemented @guardian/src-button
                            // ref={lastElement}
                        >
                            Hide
                        </Button>
                    )}
                </span>
            </details>
        </figure>
    );
};
