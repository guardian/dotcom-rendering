import { constructQuery } from '../../../lib/querystring';
import type { YoutubeBlockElement } from '../../../types/content';
import { Caption } from '../Caption';

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

type Props = {
	element: YoutubeBlockElement;
	pillar: ArticleTheme;
	adTargeting?: AdTargeting;
};

export const YoutubeBlockComponentAMP = ({
	element,
	pillar,
	adTargeting,
}: Props) => {
	// https://www.ampproject.org/docs/reference/components/amp-youtube
	// https://developers.google.com/youtube/player_parameters
	const attributes: { [key: string]: any } = {
		id: `gu-video-youtube-${element.id}`,
		'data-videoid': element.assetId,
		layout: 'responsive',
		width: '16',
		height: '9',
		'data-block-on-consent': '', // Block player until consent is obtained
		'data-param-modestbranding': true, // Remove YouTube logo
		credentials: 'omit',
	};

	if (adTargeting) {
		attributes['data-param-embed_config'] = JSON.stringify(
			buildEmbedConfig(adTargeting),
		);
	}

	if (element.channelId) {
		// related videos metadata
		attributes['data-param-rel'] = '0';
	}

	return (
		<Caption captionText={element.mediaTitle} pillar={pillar} padCaption={true}>
			<amp-youtube {...attributes} />
		</Caption>
	);
};
