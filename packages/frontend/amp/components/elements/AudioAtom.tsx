import React from 'react';

export const AudioAtom: React.FC<{
    element: AudioAtomElement;
}> = ({ element }) => {
    return (
        <amp-audio src={element.trackUrl} title={element.kicker}>
            <div fallback="">
                <p>Your browser doesn’t support HTML5 audio</p>
            </div>
        </amp-audio>
    );
};
