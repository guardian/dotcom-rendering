import React from 'react';
import { css } from 'emotion';

type Props = {
    htmldocument: string;
};

const iframeStyle = css`
    width: 100%;
    border: none;
    height: 214px;
`;

export const AtomEmbedHtmlDocumentBlockComponent: React.FC<Props> = ({
    htmldocument,
}: Props) => {
    return (
        <>
            <iframe
                title="AtomEmbedHtmlDocumentBlockComponent"
                srcDoc={htmldocument}
                className={iframeStyle}
            />
        </>
    );
};
