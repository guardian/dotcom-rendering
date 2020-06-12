import React, { useState } from 'react';
import { css } from 'emotion';

import { Link } from '@guardian/src-link';
import { Button } from '@guardian/src-button';

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

type formData = { [key in string]: any };

type addFormFieldProp = {
    formField: CampaignFieldType;
    formData: formData;
    setFormData: React.Dispatch<React.SetStateAction<formData>>;
};

const addFormField = ({
    formField,
    formData,
    setFormData,
}: addFormFieldProp) => {
    switch (formField.type) {
        case 'textarea':
            return (
                <TextArea
                    formField={formField}
                    formData={formData}
                    setFormData={setFormData}
                />
            );
        case 'file':
            return (
                <FileUpload
                    formField={formField}
                    formData={formData}
                    setFormData={setFormData}
                />
            );
        case 'select':
            return (
                <Select
                    formField={formField}
                    formData={formData}
                    setFormData={setFormData}
                />
            );
        case 'radio':
            return (
                <Radios
                    formField={formField}
                    formData={formData}
                    setFormData={setFormData}
                />
            );
        case 'checkbox':
            return (
                <Checkboxes
                    formField={formField}
                    formData={formData}
                    setFormData={setFormData}
                />
            );
        default: {
            return (
                <TextInput
                    formField={formField}
                    formData={formData}
                    setFormData={setFormData}
                />
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
                <div key={index}>
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
            {error && <div>{error}</div>}
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
