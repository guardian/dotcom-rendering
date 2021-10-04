/* eslint-disable react/jsx-props-no-spreading */
import React from 'react';
import { Caption } from '@root/src/amp/components/Caption';
import { constructQuery } from '@root/src/lib/querystring';

type EmbedConfig = {
	adsConfig:
		| {
				adTagParameters: {
					iu: string;
					cust_params: string;
				};
				disableAds?: false;
		  }
		| {
				disableAds: true;
		  };
};

const buildEmbedConfig = (adTargeting: AdTargeting): EmbedConfig => {
	switch (adTargeting.disableAds) {
		case true:
			return {
				adsConfig: {
					disableAds: true,
				},
			};
		case false:
		case undefined:
			return {
				adsConfig: {
					adTagParameters: {
						iu: `${adTargeting.adUnit || ''}`,
						cust_params: encodeURIComponent(
							constructQuery(adTargeting.customParams || {}),
						),
					},
				},
			};
	}
};

export const YoutubeBlockComponent: React.FC<{
	element: YoutubeBlockElement;
	
	pillar: ArticleTheme;
	adTargetingBuilder?: AdTargetingBuilder;
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
			buildEmbedConfig(adTargetingBuilder()),
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
