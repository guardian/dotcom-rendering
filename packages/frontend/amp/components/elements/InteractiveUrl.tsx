import React from 'react';
import { css } from 'emotion';
import { ShowMoreButton } from '@frontend/amp/components/ShowMoreButton';

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

export const InteractiveUrl: React.SFC<{ url: string }> = ({ url }) => {
    return (
        <amp-iframe
            class={styles}
            src={url}
            layout="responsive"
            sandbox="allow-scripts allow-same-origin"
            height="1"
            width="8"
            resizable=""
        >
            <div overflow="" className={showMore}>
                <ShowMoreButton />
            </div>
        </amp-iframe>
    );
};
