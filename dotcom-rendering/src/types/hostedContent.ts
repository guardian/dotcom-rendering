import type { FEHostedContent } from '../frontend/feHostedContent';

type HostedContentType = 'article' | 'video' | 'gallery';

export type HostedContent = {
	frontendData: FEHostedContent;
	type: HostedContentType;
};

export const enhanceHostedContentType = (
	data: FEHostedContent,
): HostedContent => {
	let type: HostedContentType = 'article';

	if (data.video) {
		type = 'video';
	} else if (data.images.length) {
		type = 'gallery';
	}

	return {
		frontendData: data,
		type,
	};
};
