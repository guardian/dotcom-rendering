import type { SoundcloudBlockElement } from '../../../types/content';

type Props = {
	element: SoundcloudBlockElement;
};

export const SoundcloudBlockComponent = ({ element }: Props) => {
	return element.isTrack ? (
		<amp-soundcloud
			height="300"
			layout="fixed-height"
			data-visual="true"
			data-trackid={element.id}
		/>
	) : (
		<amp-soundcloud
			height="300"
			layout="fixed-height"
			data-visual="true"
			data-playlistid={element.id}
		/>
	);
};
