import React from 'react';

// This span is used to insert the sign in gate into the appropirate location within body of an article,
// if the SignInGateSector determines a gate should be rendered.

const SignInGateSlot = <span id="sign-in-gate" />;

export const withSignInGateSlot = (
    articleElements: (JSX.Element | null | undefined)[],
): (JSX.Element | null | undefined)[] => {
    return articleElements.map((element, i) => {
        return (
            <>
                {element}
                {i === 1 && SignInGateSlot}
            </>
        );
    });
};
