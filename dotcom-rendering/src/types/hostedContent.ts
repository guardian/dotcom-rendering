import { ArticleDesign } from '@guardian/libs';
import type { FEHostedContent } from '../frontend/feHostedContent';

type HostedContentDesign =
	| ArticleDesign.Standard
	| ArticleDesign.Video
	| ArticleDesign.Gallery;

export type HostedContent = {
	frontendData: FEHostedContent;
	design: HostedContentDesign;
};

const getHostedContentDesign = (data: FEHostedContent): HostedContentDesign => {
	if (data.video) {
		return ArticleDesign.Video;
	} else if (data.images.length) {
		return ArticleDesign.Gallery;
	} else {
		return ArticleDesign.Standard;
	}
};

export const enhanceHostedContent = (
	frontendData: FEHostedContent,
): HostedContent => {
	return {
		frontendData,
		design: getHostedContentDesign(frontendData),
	};
};
