import React from 'react';
import { unwrapHtml } from '@root/src/model/unwrapHtml';
import { RewrappedComponent } from '@root/src/web/components/elements/RewrappedComponent';
// tslint:disable:react-no-dangerous-html

export const SubheadingBlockComponent: React.FC<{ html: string }> = ({
    html,
}) => {
    const { willUnwrap: isUnwrapped, unwrappedHtml } = unwrapHtml(
        '<h2>',
        '</h2>',
        html,
    );

    return (
        <RewrappedComponent
            isUnwrapped={isUnwrapped}
            html={unwrappedHtml}
            tagName="h2"
        />
    );
};
