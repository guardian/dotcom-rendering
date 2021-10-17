/* eslint-disable react/jsx-props-no-spreading */
import React from 'react';
import { Caption } from '@root/src/amp/components/Caption';
import type { AdTargetingBuilderStatic } from '@root/src/lib/ad-targeting';

export const YoutubeBlockComponent: React.FC<{
	element: YoutubeBlockElement;

	pillar: ArticleTheme;
	adTargetingBuilder?: AdTargetingBuilderStatic;
}> = ({ element, pillar, adTargetingBuilder }) => {
	// https://www.ampproject.org/docs/reference/components/amp-youtube
	// https://developers.google.com/youtube/player_parameters
	const attributes: { [key: string]: any } = {
		id: `gu-video-youtube-${element.id}`,
		'data-videoid': element.assetId,
		layout: 'responsive',
		width: '16',
		height: '9',
		'data-param-modestbranding': true, // Remove YouTube logo
		credentials: 'omit',
	};

	if (adTargetingBuilder) {
		attributes['data-param-embed_config'] = JSON.stringify(
			{ adsConfig: adTargetingBuilder() },
		);
	}

	if (element.channelId) {
		// related videos metadata
		attributes['data-param-rel'] = '0';
	}

	return (
		<Caption
			captionText={element.mediaTitle}
			pillar={pillar}
			padCaption={true}
		>
			<amp-youtube {...attributes} />
		</Caption>
	);
};
