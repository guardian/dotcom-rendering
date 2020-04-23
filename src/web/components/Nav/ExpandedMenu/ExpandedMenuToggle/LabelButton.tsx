import React from 'react';

type Props = {
    CHECKBOX_ID: string;
    className: string;
    ariaControls: string;
    children: JSX.Element | JSX.Element[];
};

export const LabelButton = ({
    CHECKBOX_ID,
    className,
    ariaControls,
    children,
}: Props) => (
    // Supporting NoJS and accessibility is hard.
    // We are using label and `htmlFor` prop to be able to toggle an input checkbox
    // However this means that we are using a label as a button and lose out on
    // browser accessiblity.

    // We have defined a JS onClick and onKeyDown as a fall back to help accessiblity.
    // This is not perfect solution, as some screen readers have NoJS enabled
    // https://webaim.org/projects/screenreadersurvey8/#javascript
    // We need Typescript to ignore the abnormal props we have added to the label
    // But in JSX this can be sometimes a little difficult
    // https://github.com/microsoft/TypeScript/issues/27552#issuecomment-427928685

    // eslint-disable @typescript-eslint/ban-ts-ignore, jsx-a11y/label-has-associated-control, @typescript-eslint/no-unused-expressions, react/no-unknown-property, jsx-a11y/no-noninteractive-element-to-interactive-role
    // @ts-ignore

    <label
        className={className}
        aria-controls={ariaControls}
        aria-label="Toggle main menu"
        key="OpenExpandedMenuButton"
        htmlFor={CHECKBOX_ID}
        onClick={() => {
            // @ts-ignore
            document && document.getElementById(CHECKBOX_ID).click();
        }}
        onKeyDown={() => {
            // @ts-ignore
            document && document.getElementById(CHECKBOX_ID).click();
        }}
        // @ts-ignore
        tabindex={0}
        role="button"
    >
        {children}
    </label>
    //  eslint-enable @typescript-eslint/ban-ts-ignore, jsx-a11y/label-has-associated-control, @typescript-eslint/no-unused-expressions, react/no-unknown-property, jsx-a11y/no-noninteractive-element-to-interactive-role
);
