import { getIdFromUrl } from '../lib/get-video-id.amp';
import type { VideoYoutubeBlockElement } from '../types/content';
import { Caption } from './Caption.amp';

type Props = {
	element: VideoYoutubeBlockElement;
	pillar: ArticleTheme;
};

export const ampYoutubeIdRegex = '^[a-zA-Z0-9_-]{11}$'; // Alphanumeric, underscores and hyphens, 11 characters long

export const VideoYoutubeBlockComponent = ({ element, pillar }: Props) => {
	const youtubeId = getIdFromUrl(
		element.originalUrl || element.url,
		ampYoutubeIdRegex,
		true,
		'v',
	);
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
