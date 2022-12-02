import React from 'react';
import type { VideoYoutubeBlockElement } from '../../../types/content';
import { getIdFromUrl } from '../../lib/get-video-id';
import { Caption } from '../Caption';

export const VideoYoutubeBlockComponent: React.FC<{
	element: VideoYoutubeBlockElement;
	pillar: ArticleTheme;
}> = ({ element, pillar }) => {
	const youtubeId = getIdFromUrl(
		element.originalUrl || element.url,
		'^[a-zA-Z0-9_-]{11}$', // Alpha numeric, underscores and hyphens, exactly 11 numbers long
		true,
		'v',
	);
	return (
		<Caption captionText={element.caption} pillar={pillar}>
			<amp-youtube
				data-block-on-consent=""
				data-videoid={youtubeId}
				layout="responsive"
				width={element.width}
				height={element.height}
				credentials="omit"
			/>
		</Caption>
	);
};
