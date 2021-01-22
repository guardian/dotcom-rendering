import React from 'react';
import { getIdFromUrl } from '@root/src/amp/lib/get-video-id';
import { Caption } from '@root/src/amp/components/Caption';

export const VideoYoutubeBlockComponent: React.FC<{
	element: VideoYoutubeBlockElement;
	pillar: Theme;
}> = ({ element, pillar }) => {
	const youtubeId = getIdFromUrl(
		element.originalUrl || element.url,
		'^[a-zA-Z0-9_-]{11}$', // Alpha numeric, underscores and hyphens, exactly 11 numbers long
		false,
		'v',
	);
	return (
		<Caption captionText={element.caption} pillar={pillar}>
			<amp-youtube
				data-videoid={youtubeId}
				layout="responsive"
				width={element.width}
				height={element.height}
				credentials="omit"
			/>
		</Caption>
	);
};
