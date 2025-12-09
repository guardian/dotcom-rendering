import type { FEHostedContent } from '../frontend/feHostedContent';

enum HostedContentType {
	Article,
	Video,
	Gallery,
}

export type HostedContent = {
	frontendData: FEHostedContent;
	type: HostedContentType;
};

export const enhanceHostedContentType = (
	data: FEHostedContent,
): HostedContent => {
	let type = HostedContentType.Article;

	if (data.video) {
		type = HostedContentType.Video;
	} else if (data.images.length) {
		type = HostedContentType.Gallery;
	}

	return {
		frontendData: data,
		type,
	};
};
