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
export const RadioSelect = ({
    formField,
    formData,
    setFormData,
}: fieldProp) => {
    const [state, setState] = useState();
    const updateState = (newState: string) => {
        setState(newState);
        setFormData({
            ...formData,
            [formField.id]: newState,
        });
    };

    return (
        <>
            <FieldLabel formField={formField} />
            <RadioGroup name={formField.name} orientation="horizontal">
                {formField.options.map((option, index) => {
                    const isRadioChecked =
                        formField.id in formData &&
                        formData[formField.id] === option.value;
                    return (
                        <Radio
                            data-testid={`form-field-${option.value}`}
                            key={index}
                            label={option.value}
                            value={option.value}
                            name={`${formField.id}`}
                            checked={!!isRadioChecked}
                            onClick={() => updateState(option.value)}
                        />
                    );
                })}
            </RadioGroup>
        </>
    );
};
