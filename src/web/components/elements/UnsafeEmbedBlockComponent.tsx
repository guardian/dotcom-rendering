import React, { useState, useEffect, useRef } from 'react';
import { css } from 'emotion';

type Props = {
    html: string;
    alt?: string;
};

let numberOfIntervals = 0;
export const UnsafeEmbedBlockComponent = ({ html }: Props) => {
    const [iframeHeight, setIframeHeight] = useState<number>(0);
    const iFrameRef = useRef<HTMLIFrameElement>(null);

    useEffect(() => {
        if (numberOfIntervals >= 12) return;

        const timer = setInterval(() => {
            const doc =
                iFrameRef.current &&
                iFrameRef.current.contentWindow &&
                iFrameRef.current.contentWindow.document;

            numberOfIntervals = numberOfIntervals + 1;

            if (doc) {
                setIframeHeight(
                    doc.documentElement.scrollHeight ||
                        doc.documentElement.scrollHeight ||
                        0,
                );
            }

            if (numberOfIntervals >= 12) clearInterval(timer);
        }, 300);

        return () => clearInterval(timer);
    }, [iFrameRef]);

    return (
        <iframe
            className={css`
                width: 100%;
            `}
            data-cy="embed-block"
            ref={iFrameRef}
            style={{ height: iframeHeight }}
            srcDoc={html}
        />
    );
};
