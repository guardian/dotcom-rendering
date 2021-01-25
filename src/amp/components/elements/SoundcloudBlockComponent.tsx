import React from 'react';

export const SoundcloudBlockComponent: React.FC<{
	element: SoundcloudBlockElement;
}> = ({ element }) => {
	return element.isTrack ? (
		<amp-soundcloud
			height="300"
			layout="fixed-height"
			data-visual="true"
			data-trackid={element.id}
		/>
	) : (
		<amp-soundcloud
			height="300"
			layout="fixed-height"
			data-visual="true"
			data-playlistid={element.id}
		/>
	);
};
