import React, { useState, useEffect } from 'react';
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

type fieldProp = {
    formField: CampaignsFeildType;
    formData: { [key in string]: any };
    setFormData: React.Dispatch<React.SetStateAction<{ [x: string]: any }>>;
    firstElementRef?: React.RefObject<HTMLElement> | null | undefined;
};

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

// We encapsulate the Componet's state here instead of directly sourcing it from
// `formData` to avoid unnessesary rerenders, as this was causing selection animation
// to be applied whenever formData was changin
const CheckboxWrapper = ({
    formField,
    formData,
    setFormData,
}: // firstElementRef
fieldProp) => {
    const [state, setState] = useState([]);
    useEffect(() => {
        setFormData({
            ...formData,
            [formField.id || '']: state,
        });
    }, [state]);

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
                                    setState(
                                        isCheckboxChecked
                                            ? checkboxSelection.filter(
                                                  (ele: string) =>
                                                      ele !== option.value,
                                              )
                                            : [
                                                  ...checkboxSelection,
                                                  option.value,
                                              ],
                                    );
                                }}
                                // TODO: use ref once forwardRef is implemented @guardian/src-button
                                // ref={index === 0 && firstElementRef}
                            />
                        );
                    })}
                </CheckboxGroup>
            )}
        </>
    );
};

// We encapsulate the Componet's state here instead of directly sourcing it from
// `formData` to avoid unnessesary rerenders, as this was causing selection animation
// to be applied whenever formData was changin
const RadioWrapper = ({
    formField,
    formData,
    setFormData,
}: // firstElementRef
fieldProp) => {
    const [state, setState] = useState();
    useEffect(() => {
        setFormData({
            ...formData,
            [formField.id || '']: state,
        });
    }, [state]);

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
                                onChange={() => setState(option.value)}
                                // TODO: use ref once forwardRef is implemented @guardian/src-button
                                // ref={index === 0 && firstElementRef}
                            />
                        );
                    })}
                </RadioGroup>
            )}
        </>
    );
};

const addFormField = ({
    formField,
    formData,
    setFormData,
    firstElementRef,
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
                        // ref={firstElementRef}
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
                        // ref={firstElementRef}
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
                        // ref={firstElementRef}
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
        case 'radio':
            return (
                <RadioWrapper
                    formField={formField}
                    formData={formData}
                    setFormData={setFormData}
                    firstElementRef={firstElementRef}
                />
            );
        case 'checkbox':
            return (
                <CheckboxWrapper
                    formField={formField}
                    formData={formData}
                    setFormData={setFormData}
                    firstElementRef={firstElementRef}
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
                    // ref={firstElementRef}
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

    let openCalloutRef: HTMLElement | null = null;
    let firstElementRef: HTMLElement | null = null;
    let lastElementRef: HTMLElement | null = null;

    // select each DOM element on form expand
    useEffect(() => {
        openCalloutRef = document.querySelector(
            '*[custom-guardian="callout-form-open-button"]',
        );

        firstElementRef = document.querySelector(
            '*[custom-guardian="callout-form-field"]:first-of-type',
        );

        lastElementRef = document.querySelector(
            '*[custom-guardian="callout-form-close-button"]',
        );
    }, [isExpanded]);

    // TODO: need to focus open form button on close
    useEffect(() => {
        // openCalloutRef
    }, [openCalloutRef]);

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
            firstElementRef && firstElementRef.focus();
        }
    }, [isExpanded, firstElementRef]);

    // TODO: make sure that the focus of elements is encapsulated within the form when open
    useEffect(() => {
        lastElementRef;
        // const keyListener = (e: KeyboardEvent) => {
        //     if (e.keyCode === 27) {
        //         toggleSetShowForm();
        //     } else if (e.keyCode === 9) {
        //         // If firstElement or lastElement are not defined, do not continue
        //         if (!firstElement || !lastElement) return;

        //         // we use `e.shiftKey` internally to determin the direction of the highlighting
        //         // using document.activeElement and e.shiftKey we can check what should be the next element to be highlighted
        //         if (!e.shiftKey && document.activeElement === lastElement) {
        //             firstElement && firstElement.focus();
        //             e.preventDefault();
        //         }

        //         if (e.shiftKey && document.activeElement === firstElement) {
        //             lastElement && lastElement.focus(); // The shift key is down so loop focus back to the last item
        //             e.preventDefault();
        //         }
        //     }
        // };
        // document.addEventListener('keydown', keyListener);
    }, [lastElementRef]);

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
