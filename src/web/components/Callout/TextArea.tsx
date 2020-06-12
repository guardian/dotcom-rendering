import React from 'react';
import { css } from 'emotion';

import { FieldLabel } from './FieldLabel';

const textAreaStyles = css`
    width: 100%;
`;

type Props = {
    formField: CampaignFieldTextArea;
    formData: { [key in string]: any };
    setFormData: React.Dispatch<React.SetStateAction<{ [x: string]: any }>>;
};

export const TextArea = ({ formField, formData, setFormData }: Props) => (
    <>
        <FieldLabel formField={formField} />
        <textarea
            className={textAreaStyles}
            name={String(formField.id)}
            required={formField.required}
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
