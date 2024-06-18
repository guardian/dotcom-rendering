import { levels } from 'log4js';
import { getIdFromUrl } from '../lib/get-video-id.amp';
import { logger } from '../server/lib/logging';
import type { VideoYoutubeBlockElement } from '../types/content';
import { Caption } from './Caption.amp';

type Props = {
	element: VideoYoutubeBlockElement;
	pillar: ArticleTheme;
};

export const VideoYoutubeBlockComponent = ({ element, pillar }: Props) => {
	const url = element.originalUrl || element.url;
	const youtubeId = getIdFromUrl(url, true, 'v');

	logger.log(levels.ERROR, `Could not get an id from: ${url}`);
	if (!youtubeId) return null;

	return (
		<Caption captionText={element.caption} pillar={pillar}>
			<amp-youtube
				data-block-on-consent="_till_accepted"
				data-videoid={youtubeId}
				layout="responsive"
				width={element.width}
				height={element.height}
				credentials="omit"
			/>
		</Caption>
	);
};
