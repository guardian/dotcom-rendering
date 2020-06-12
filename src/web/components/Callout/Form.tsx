import React, { useState } from 'react';
import { css } from 'emotion';

import { Link } from '@guardian/src-link';
import { Button } from '@guardian/src-button';
import { text } from '@guardian/src-foundations/palette';
import { textSans } from '@guardian/src-foundations/typography';

import { Checkboxes } from './Checkboxes';
import { FileUpload } from './FileUpload';
import { Radios } from './Radios';
import { Select } from './Select';
import { TextArea } from './TextArea';
import { TextInput } from './TextInput';

const formStyles = css`
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    padding-left: 10px;
    padding-right: 10px;
`;

const footerPaddingStyles = css`
    display: flex;
    flex-direction: row;
    justify-content: space-between;
`;

const errorMessagesStyles = css`
    padding-bottom: 10px;
    color: ${text.error};
    ${textSans.medium({ fontWeight: 'bold' })};
`;

type formData = { [key in string]: any };

type FormFieldProp = {
    formField: CampaignFieldType;
    formData: formData;
    setFormData: React.Dispatch<React.SetStateAction<formData>>;
};

const FormField = ({ formField, formData, setFormData }: FormFieldProp) => {
    switch (formField.type) {
        case 'textarea':
            return (
                <>
                    <TextArea
                        formField={formField}
                        formData={formData}
                        setFormData={setFormData}
                    />
                    <hr />
                </>
            );
        case 'file':
            return (
                <>
                    <FileUpload
                        formField={formField}
                        formData={formData}
                        setFormData={setFormData}
                    />
                    <hr />
                </>
            );
        case 'select':
            return (
                <>
                    <Select
                        formField={formField}
                        formData={formData}
                        setFormData={setFormData}
                    />
                    <hr />
                </>
            );
        case 'radio':
            return (
                <>
                    <Radios
                        formField={formField}
                        formData={formData}
                        setFormData={setFormData}
                    />
                    <hr />
                </>
            );
        case 'checkbox':
            return (
                <>
                    <Checkboxes
                        formField={formField}
                        formData={formData}
                        setFormData={setFormData}
                    />
                    <hr />
                </>
            );
        default: {
            return (
                <>
                    <TextInput
                        formField={formField}
                        formData={formData}
                        setFormData={setFormData}
                    />
                    <hr />
                </>
            );
        }
    }
};

type FormProps = {
    submitForm: () => void;
    formId: number;
    formFields: CampaignFieldType[];
    error?: string;
};

export const Form = ({ submitForm, formId, formFields, error }: FormProps) => {
    const [twitterHandle, setTwitterHandle] = useState('');
    const [formData, setFormData] = useState<{ [key in string]: any }>({});

    return (
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
                <FormField
                    key={index}
                    formField={formField}
                    formData={formData}
                    setFormData={setFormData}
                />
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
            {error && <div className={errorMessagesStyles}>{error}</div>}
            <div className={footerPaddingStyles}>
                <Button priority="secondary" size="xsmall" type="submit">
                    Share with the Guardian
                </Button>
                <Link
                    subdued={true}
                    priority="secondary"
                    target="_blank"
                    href="https://www.theguardian.com/help/terms-of-service"
                >
                    Terms and conditions
                </Link>
            </div>
        </form>
    );
};
