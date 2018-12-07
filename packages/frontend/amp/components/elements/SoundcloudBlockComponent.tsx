import React from 'react';

export const SoundcloudBlockComponent: React.SFC<{
    element: SoundcloudBlockElement;
}> = ({ element }) => {
    if (element.playlist == null && element.track == null) {
        if (element.isMandatory) {
            throw new Error(
                'Unable to generate soundcloud embed without track or playlist',
            );
        }
        return null;
    }
    return (
        <amp-soundcloud
            height="300"
            layout="fixed-height"
            data-visual="true"
            data-trackid={element.track}
            data-playlistid={element.playlist}
        />
    );
};
