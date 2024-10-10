import { levels } from 'log4js';
import type { ArticleTheme } from '../lib/format';
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

	if (!youtubeId) {
		logger.log(levels.WARN, `Could not get an id from: ${url}`);
		return null;
	}

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
