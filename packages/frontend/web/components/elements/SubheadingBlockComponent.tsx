import React from 'react';
// tslint:disable:react-no-dangerous-html

export const SubheadingBlockComponent: React.FC<{ html: string }> = ({
    html,
}) => (
    // TODO - wrapping headings in a div is really not very nice, similar in textBlockComponent
    // wrapping paragraphs in spans.
    // There's no way to do `dangerouslySetInnerHTML` on Fragments though, so we may have
    // to try to think of a workaround so that our ads will work properly.
    <div
        dangerouslySetInnerHTML={{
            __html: html,
        }}
    />
);
