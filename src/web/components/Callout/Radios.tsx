import React, { useState } from 'react';

import { RadioGroup, Radio } from '@guardian/src-radio';
import { FieldLabel } from './FieldLabel';

type fieldProp = {
    formField: CampaignFieldRadio;
    formData: { [key in string]: any };
    setFormData: React.Dispatch<React.SetStateAction<{ [x: string]: any }>>;
};

// We encapsulate the Component's state here instead of directly sourcing it from
// `formData` to avoid unnessesary rerenders, as this was causing selection animation
// to be applied whenever formData was changin
export const Radios = ({ formField, formData, setFormData }: fieldProp) => {
    const [state, setState] = useState();
    const updateState = (newState: string) => {
        setState(newState);
        setFormData({
            ...formData,
            [formField.id || '']: state,
        });
    };

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
                                onChange={() => updateState(option.value)}
                            />
                        );
                    })}
                </RadioGroup>
            )}
        </>
    );
};
