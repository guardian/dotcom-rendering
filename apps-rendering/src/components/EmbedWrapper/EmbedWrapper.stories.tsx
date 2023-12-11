// ----- Imports ----- //

import { EmbedTracksType } from '@guardian/content-api-models/v1/embedTracksType';
import { some } from '../../../vendor/@guardian/types/index';
import { EmbedKind } from 'embed';
import EmbedComponentWrapper from './';

// ----- Stories ----- //
// I'm disabling the requirement for a return type because that doesnt make sense here 🤷. It
// popped up after I removed the FC type which was causing problems when I tried to set parameters
// on an individual story. Ideally, we'd use the type from Storybook directly
// but https://github.com/storybookjs/storybook/issues/13486
// eslint-disable-next-line -- because 👆
const Generic = () => (
	<div>
		<p>
			This is an example of the embed wrapper rendering a Spotify
			&apos;Generic&apos; embed overlay.
		</p>
		<EmbedComponentWrapper
			embed={{
				kind: EmbedKind.Generic,
				alt: some('Lemmy'),
				html: '<iframe src="https://embed.spotify.com/?uri=spotify:user:guardianmusic:playlist:00lXay2hDczhstNhC7D1sl" width="460" height="480" frameborder="0" allowtransparency="true">',
				height: 480,
				mandatory: true,
				source: some('Spotify'),
				sourceDomain: some('embed.spotify.com'),
				tracking: EmbedTracksType.TRACKS,
			}}
			editions={false}
		/>
		<p>
			This is an example of the embed wrapper rendering a Spotify
			&apos;Generic&apos; embed.
		</p>
		<EmbedComponentWrapper
			embed={{
				kind: EmbedKind.Generic,
				alt: some('Lemmy'),
				html: '<iframe src="https://embed.spotify.com/?uri=spotify:user:guardianmusic:playlist:00lXay2hDczhstNhC7D1sl" width="460" height="480" frameborder="0" allowtransparency="true">',
				height: 480,
				mandatory: true,
				source: some('Spotify'),
				sourceDomain: some('embed.spotify.com'),
				tracking: EmbedTracksType.DOES_NOT_TRACK,
			}}
			editions={false}
		/>
	</div>
);
Generic.story = {
	parameters: {
		chromatic: { disable: true },
	},
};

// I'm disabling the requirement for a return type because that doesnt make sense here 🤷. It
// popped up after I removed the FC type which was causing problems when I tried to set parameters
// on an individual story. Ideally, we'd use the type from Storybook directly
// but https://github.com/storybookjs/storybook/issues/13486
// eslint-disable-next-line -- because 👆
const Youtube = () => (
	<div>
		<p>
			This is an example of the embed wrapper rendering a YouTube
			&apos;YouTube&apos; embed overlay.
		</p>
		<EmbedComponentWrapper
			embed={{
				kind: EmbedKind.YouTube,
				id: 'iAIXqcHQTD0',
				width: 460,
				height: 259,
				tracking: EmbedTracksType.TRACKS,
			}}
			editions={false}
		/>
		<p>
			This is an example of the embed wrapper rendering a YouTube
			&apos;YouTube&apos; embed.
		</p>
		<EmbedComponentWrapper
			embed={{
				kind: EmbedKind.YouTube,
				id: 'iAIXqcHQTD0',
				width: 460,
				height: 259,
				tracking: EmbedTracksType.DOES_NOT_TRACK,
			}}
			editions={false}
		/>
	</div>
);
Youtube.story = {
	parameters: {
		chromatic: { disable: true },
	},
};

// I'm disabling the requirement for a return type because that doesnt make sense here 🤷. It
// popped up after I removed the FC type which was causing problems when I tried to set parameters
// on an individual story. Ideally, we'd use the type from Storybook directly
// but https://github.com/storybookjs/storybook/issues/13486
// eslint-disable-next-line -- because 👆
const Spotify = () => (
	<div>
		<p>
			This is an example of the embed wrapper rendering a spotify
			&apos;Spotify&apos; embed overlay.
		</p>
		<EmbedComponentWrapper
			embed={{
				kind: EmbedKind.Spotify,
				src: 'https://embed.spotify.com/?uri=spotify:album:1PULmKbHeOqlkIwcDMNwD4',
				width: 300,
				height: 380,
				tracking: EmbedTracksType.TRACKS,
			}}
			editions={false}
		/>
		<p>
			This is an example of the embed wrapper rendering a spotify
			&apos;Spotify&apos; embed.
		</p>
		<EmbedComponentWrapper
			embed={{
				kind: EmbedKind.Spotify,
				src: 'https://embed.spotify.com/?uri=spotify:user:juderogers:playlist:5FTUcQhfk54BZwcdiwE1QY',
				width: 300,
				height: 380,
				tracking: EmbedTracksType.DOES_NOT_TRACK,
			}}
			editions={false}
		/>
	</div>
);
Spotify.story = {
	parameters: {
		chromatic: { disable: true },
	},
};

// I'm disabling the requirement for a return type because that doesnt make sense here 🤷. It
// popped up after I removed the FC type which was causing problems when I tried to set parameters
// on an individual story. Ideally, we'd use the type from Storybook directly
// but https://github.com/storybookjs/storybook/issues/13486
// eslint-disable-next-line -- because 👆
const Instagram = () => (
	<div>
		<p>
			This is an example of the embed wrapper rendering a instagram
			&apos;Instagram&apos; embed overlay.
		</p>
		<EmbedComponentWrapper
			embed={{
				kind: EmbedKind.Instagram,
				id: 'B-uYh7FBWU5',
				caption: some('a caption'),
				tracking: EmbedTracksType.TRACKS,
			}}
			editions={false}
		/>
		<p>
			This is an example of the embed wrapper rendering a instagram
			&apos;Instagram&apos; embed overlay.
		</p>
		<EmbedComponentWrapper
			embed={{
				kind: EmbedKind.Instagram,
				id: 'B-uYh7FBWU5',
				caption: some('a caption'),
				tracking: EmbedTracksType.DOES_NOT_TRACK,
			}}
			editions={false}
		/>
	</div>
);
Instagram.story = {
	parameters: {
		chromatic: { disable: true },
	},
};

// ----- Exports ----- //

export default {
	component: EmbedComponentWrapper,
	title: 'AR/EmbedComponentWrapper',
};

export { Generic, Youtube, Spotify, Instagram };
