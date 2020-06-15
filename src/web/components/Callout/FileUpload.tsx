import React from 'react';
import { css } from 'emotion';

import { FieldLabel } from './FieldLabel';

const fileUploadInputStyles = css`
    padding-top: 10px;
    padding-bottom: 10px;
`;

type Props = {
    formField: CampaignFieldFile;
    formData: { [key in string]: any };
    setFormData: React.Dispatch<React.SetStateAction<{ [x: string]: any }>>;
};

export const FileUpload = ({ formField, formData, setFormData }: Props) => (
    <>
        <FieldLabel formField={formField} />
        <input
            data-testid={`form-field-${formField.id}`}
            className={fileUploadInputStyles}
            type="file"
            accept="image/*, .pdf"
            required={formField.required}
            onChange={e =>
                setFormData({
                    ...formData,
                    [formField.id]: e.target.files && e.target.files[0],
                })
            }
        />
        <p>We accept images and pdfs. Maximum total file size: 6MB</p>
    </>
);
