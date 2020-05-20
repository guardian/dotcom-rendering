import React from 'react';
import { css } from 'emotion';

type Props = {
    url: string;
};

const iframeStyle = css`
    width: 100%;
    border: none;
    height: 414px;
`;

export const AtomEmbedUrlBlockComponent: React.FC<Props> = ({ url }: Props) => {
    return (
        <>
            <iframe
                title="AtomEmbedUrlBlockComponent [Template]"
                src={url}
                className={iframeStyle}
            />
        </>
    );
};
