import React, { useState, useEffect } from 'react';

import { CheckboxGroup, Checkbox } from '@guardian/src-checkbox';
import { FieldLabel } from './FieldLabel';

type fieldProp = {
    formField: CampaignsFeildType;
    formData: { [key in string]: any };
    setFormData: React.Dispatch<React.SetStateAction<{ [x: string]: any }>>;
    firstFieldElementRef?: React.RefObject<HTMLElement> | null | undefined;
};

// We encapsulate the Componet's state here instead of directly sourcing it from
// `formData` to avoid unnessesary rerenders, as this was causing selection animation
// to be applied whenever formData was changing
export const CheckboxWrapper = ({
    formField,
    formData,
    setFormData,
}: fieldProp) => {
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
                                // ref={index === 0 && firstFieldElementRef}
                            />
                        );
                    })}
                </CheckboxGroup>
            )}
        </>
    );
};
