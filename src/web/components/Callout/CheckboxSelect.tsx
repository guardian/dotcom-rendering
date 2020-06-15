import React, { useState } from 'react';

import { CheckboxGroup, Checkbox } from '@guardian/src-checkbox';
import { FieldLabel } from './FieldLabel';

type Props = {
    formField: CampaignFieldCheckbox;
    formData: { [key in string]: any };
    setFormData: React.Dispatch<React.SetStateAction<{ [x: string]: any }>>;
};

// We encapsulate the Component's state here instead of directly sourcing it from
// `formData` to avoid unnessesary rerenders, as this was causing selection animation
// to be applied whenever formData was changing
export const CheckboxSelect = ({ formField, formData, setFormData }: Props) => {
    const [state, setState] = useState([]);
    const updateState = (newState: []) => {
        setState(newState);
        setFormData({
            ...formData,
            [formField.id]: newState,
        });
    };

    return (
        <>
            <FieldLabel formField={formField} />
            <CheckboxGroup name={formField.name}>
                {formField.options.map((option, index) => {
                    // data related to this field is mapped to `formData` using `formField.id`
                    // We cannot assume that the data exists, so we need to check if `formField.id` key exists in `formData`
                    const selectedCheckboxesArray =
                        formField.id in formData ? formData[formField.id] : [];

                    const isCheckboxChecked = !!selectedCheckboxesArray.find(
                        (ele: string) => ele === option.value,
                    );

                    const filterOutCheckboxFromArray = () =>
                        selectedCheckboxesArray.filter(
                            (ele: string) => ele !== option.value,
                        );

                    const addCheckboxToArray = () => [
                        ...selectedCheckboxesArray,
                        option.value,
                    ];

                    return (
                        <Checkbox
                            data-testid={`form-field-${option.value}`}
                            key={index}
                            label={option.value}
                            value={option.value}
                            checked={isCheckboxChecked}
                            onChange={() => {
                                updateState(
                                    isCheckboxChecked
                                        ? filterOutCheckboxFromArray()
                                        : addCheckboxToArray(),
                                );
                            }}
                        />
                    );
                })}
            </CheckboxGroup>
        </>
    );
};
