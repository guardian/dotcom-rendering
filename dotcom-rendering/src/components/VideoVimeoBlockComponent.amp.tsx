import type { ArticleTheme } from '@guardian/libs';
import { levels } from 'log4js';
import { getIdFromUrl } from '../lib/get-video-id.amp';
import { logger } from '../server/lib/logging';
import type { VideoVimeoBlockElement } from '../types/content';
import { Caption } from './Caption.amp';

type Props = {
	element: VideoVimeoBlockElement;
	pillar: ArticleTheme;
};

export const VideoVimeoBlockComponent = ({ element, pillar }: Props) => {
	// This is a hack as `url` is coming through as `""` from the embed.ly oembed endpoint
	// which is used in composer.
	// see: https://github.com/guardian/dotcom-rendering/issues/4057
	// We should remove this once ☝️ is fixed.
	const url = element.url === '' ? element.originalUrl ?? '' : element.url;
	const vimeoId = getIdFromUrl(url, true);

	if (!vimeoId) {
		logger.log(levels.WARN, `Could not get an id from: ${url}`);
		return null;
	}

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
