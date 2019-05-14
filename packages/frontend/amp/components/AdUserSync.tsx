import React from 'react';

const preBidSrc =
    'https://cdn.jsdelivr.net/npm/prebid-universal-creative@latest/dist/load-cookie.html';

const preBidImg =
    'data:image/gif;base64,R0lGODlhAQABAIAAAP///wAAACH5BAEAAAAALAAAAAABAAEAAAICRAEAOw==';

export const AdUserSync: React.FC<{}> = () => {
    return (
        <>
            <amp-iframe
                data-block-on-consent=""
                width={1}
                title={'User Sync'}
                height={1}
                sandbox={'allow-scripts'}
                frameborder={0}
                src={preBidSrc}
            >
                <amp-img layout={'fill'} src={preBidImg} placeholder="" />
            </amp-iframe>
        </>
    );
};
