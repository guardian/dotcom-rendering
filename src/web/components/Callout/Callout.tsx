import React, { useState } from 'react';
import { css, cx } from 'emotion';

import { textSans } from '@guardian/src-foundations/typography';
import { neutral } from '@guardian/src-foundations/palette';
import { palette } from '@guardian/src-foundations';
import { Button } from '@guardian/src-button';
import { Link } from '@guardian/src-link';

import PlusIcon from '@frontend/static/icons/plus.svg';
import MinusIcon from '@frontend/static/icons/minus.svg';

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
    padding-top: 20px;
    padding-bottom: 20px;
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
    display: flex;
    flex-direction: row;
    justify-content: space-between;
`;

export const Callout = ({
    callout,
    pillar,
}: {
    callout: CalloutBlockElement;
    pillar: Pillar;
}) => {
    const [isExpanded, setIsExpanded] = useState(false);

    // As the form is dynamically rendered, we cannot have
    // individual setStates for each field
    // const [formData, setFormData] = useState<{ [key in string]: any }>({});
    const [twitterHandle, setTwitterHandle] = useState('');

    const { title, description, formId } = callout;

    const submitForm = async () => {
        // TODO:
    };

    // TODO: Accessibility

    return (
        <figure>
            <details
                className={cx(snippetStyles, {
                    [backgroundColorStyle]: isExpanded,
                })}
                aria-hidden={true}
                open={isExpanded}
            >
                <summary
                    className={summeryStyles}
                    role="none"
                    onClick={event => {
                        // We want to prevent the default `details` behavior from appearing
                        // expanding the details should only be done via the button
                        // however we still want links to be clickable
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
                        {/* TODO: submissionSuccess */}
                    </div>
                    {!isExpanded && (
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

                {/* import Form component here */}
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
