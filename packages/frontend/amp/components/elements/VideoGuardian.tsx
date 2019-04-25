import React from 'react';

export const VideoGuardian: React.FC<{
    element: VideoGuardian;
}> = ({ element }) => {
    return (
        <amp-video controls={''} width="16" height="9" layout="responsive">
            <div fallback={''}>
                Sorry, your browser is unable to play this video.
                <br />
                Please <a href="http://whatbrowser.org/">upgrade</a> to a modern
                browser and try again.
            </div>
            {element.assets.map(
                encoding =>
                    encoding.mimeType.includes('video') && (
                        <source src={encoding.url} type={encoding.mimeType} />
                    ),
            )}
        </amp-video>
    );
};
