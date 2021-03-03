// ----- Imports ----- //

import Audio from 'components/audio';
import GenericEmbed from 'components/genericEmbed';
import Video from 'components/video';
import { EmbedKind, youtubeUrl } from 'embed';
import type { Embed } from 'embed';
import React from 'react';
import type { FC } from 'react';

// ----- Component ----- //

interface Props {
	embed: Embed;
}

/**
 * Handles rendering of all third-party embeds.
 * See the `Embed` type for more information.
 */
const EmbedComponent: FC<Props> = ({ embed }) => {
	switch (embed.kind) {
		case EmbedKind.Spotify:
			return (
				<Audio
					src={embed.src}
					width={embed.width}
					height={embed.height}
				/>
			);

		case EmbedKind.YouTube:
			return (
				<Video
					src={youtubeUrl(embed.id)}
					width={embed.width}
					height={embed.height}
				/>
			);

		case EmbedKind.Generic:
			return <GenericEmbed embed={embed} />;

		default:
			return null;
	}
};

// ----- Exports ----- //

export default EmbedComponent;
