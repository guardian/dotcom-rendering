import React, { useState, useEffect } from 'react';

import { RadioGroup, Radio } from '@guardian/src-radio';
import { FieldLabel } from './FieldLabel';

type fieldProp = {
    formField: CampaignsFeildType;
    formData: { [key in string]: any };
    setFormData: React.Dispatch<React.SetStateAction<{ [x: string]: any }>>;
    firstFieldElementRef?: React.RefObject<HTMLElement> | null | undefined;
};

// We encapsulate the Componet's state here instead of directly sourcing it from
// `formData` to avoid unnessesary rerenders, as this was causing selection animation
// to be applied whenever formData was changin
export const RadioWrapper = ({
    formField,
    formData,
    setFormData,
}: fieldProp) => {
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
                                // ref={index === 0 && firstFieldElementRef}
                            />
                        );
                    })}
                </RadioGroup>
            )}
        </>
    );
};
