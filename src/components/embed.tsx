// ----- Imports ----- //

import Audio from 'components/audio';
import GenericEmbed from 'components/genericEmbed';
import Instagram from 'components/instagram';
import Video from 'components/video';
import { EmbedKind, youtubeUrl } from 'embed';
import type { Embed } from 'embed';
import type { FC } from 'react';

// ----- Component ----- //

interface Props {
	embed: Embed;
	editions: boolean;
}

/**
 * Handles rendering of all third-party embeds.
 * See the `Embed` type for more information.
 */
const EmbedComponent: FC<Props> = ({ embed, editions }) => {
	switch (embed.kind) {
		case EmbedKind.Spotify:
			return !editions ? (
				<Audio
					src={embed.src}
					width={embed.width}
					height={embed.height}
				/>
			) : null;

		case EmbedKind.YouTube:
			return (
				<Video
					src={youtubeUrl(embed.id)}
					width={embed.width}
					height={embed.height}
				/>
			);

		case EmbedKind.Instagram:
			return !editions ? (
				<Instagram id={embed.id} caption={embed.caption} />
			) : null;

		case EmbedKind.Generic:
			return <GenericEmbed embed={embed} />;

		default:
			return null;
	}
};

// ----- Exports ----- //

export default EmbedComponent;
