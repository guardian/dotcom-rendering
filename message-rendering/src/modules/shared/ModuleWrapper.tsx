import React from 'react';
import { EmotionJSX } from '@emotion/react/types/jsx-namespace';

export function withParsedProps<ModuleProps>(
    Module: React.FC<ModuleProps>,
    validate: (props: unknown) => props is ModuleProps,
): React.FC<unknown> {
    const WrappedModule = (props: unknown) => {
        if (validate(props)) {
            return (
                <Module
                    // This is taken from: https://github.com/emotion-js/emotion/issues/2169
                    {...(props as EmotionJSX.LibraryManagedAttributes<typeof Module, ModuleProps>)}
                />
            );
        }
        return null;
    };

    return WrappedModule;
}
