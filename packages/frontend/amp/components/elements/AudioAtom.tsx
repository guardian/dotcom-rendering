import React from 'react';

export const AudioAtom: React.FC<{
    element: AudioAtomElement;
}> = ({ element }) => {
    return (
        <amp-audio src={element.trackUrl} title={element.kicker}>
            <div fallback="">
                <p>
                    We're unable to serve this media because your browser does
                    not support HTML 5 audio.
                </p>
            </div>
        </amp-audio>
    );
};
