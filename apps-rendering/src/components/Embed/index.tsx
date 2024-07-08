// ----- Imports ----- //

import Audio from 'components/Audio';
import EmailSignupEmbed from 'components/EmailSignup';
import GenericEmbed from 'components/GenericEmbed';
import Instagram from 'components/Instagram';
import Video from 'components/Video';
import { EmbedKind, youtubeUrl } from 'embed';
import type { Embed } from 'embed';

// ----- Component ----- //

interface Props {
	embed: Embed;
	editions: boolean;
}

/**
 * Handles rendering of all third-party embeds.
 * See the `Embed` type for more information.
 */
const EmbedComponent = ({ embed, editions }: Props) => {
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

		case EmbedKind.EmailSignup:
			return !editions ? <EmailSignupEmbed embed={embed} /> : null;
		case EmbedKind.TikTok:
			return !editions ? <GenericEmbed embed={embed} /> : null;

		case EmbedKind.Generic:
			return !editions ? <GenericEmbed embed={embed} /> : null;

		default:
			return null;
	}
};

// ----- Exports ----- //

export default EmbedComponent;
