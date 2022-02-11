import React from 'react';
import { getIdFromUrl } from '../../lib/get-video-id';
import { Caption } from '../Caption';

export const VideoVimeoBlockComponent: React.FC<{
	element: VideoVimeoBlockElement;
	pillar: ArticleTheme;
}> = ({ element, pillar }) => {
	const vimeoId = getIdFromUrl(element.url, '(\\d+)($|\\/)', true);

	return (
		<Caption captionText={element.caption} pillar={pillar}>
			<amp-vimeo
				data-videoid={vimeoId}
				layout="responsive"
				width={element.width}
				height={element.height}
				do-not-track="do-not-track"
			/>
		</Caption>
	);
};
