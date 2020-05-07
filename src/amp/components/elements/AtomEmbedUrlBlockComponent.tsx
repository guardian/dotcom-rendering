import React from 'react';
import { css } from 'emotion';
import { ShowMoreButton } from '@root/src/amp/components/ShowMoreButton';

const styles = css`
    margin-top: 16px;
    margin-bottom: 12px;
`;

const showMore = css`
    &[overflow] {
        position: absolute;
        bottom: 0;
        left: 0;
        right: 0;
    }
`;

export const AtomEmbedUrlBlockComponent: React.SFC<{ url: string }> = ({
    url,
}) => {
    return (
        <amp-iframe
            class={styles}
            src={url}
            layout="responsive"
            sandbox="allow-scripts allow-same-origin allow-top-navigation-by-user-activation allow-popups"
            height="1"
            width="8"
            resizable=""
            data-cy="atom-embed-url"
        >
            <div overflow="" className={showMore}>
                <ShowMoreButton />
            </div>
        </amp-iframe>
    );
};
