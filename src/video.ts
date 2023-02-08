import type { Atoms } from '@guardian/content-api-models/v1/atoms';
import type { BlockElement } from '@guardian/content-api-models/v1/blockElement';
import { Optional } from 'optional';

interface Video {
	posterUrl: string;
	videoId: string;
	duration?: number;
	atomId: string;
	title: string;
}

const parseVideo =
	(atoms?: Atoms) =>
	(element: BlockElement): Optional<Video> => {
		if (!atoms) {
			return Optional.none();
		}

		const atomId = element.contentAtomTypeData?.atomId;
		const atom = atoms.media?.find((media) => media.id === atomId);

		if (atom?.data.kind !== 'media') {
			return Optional.none();
		}

		const { posterUrl, duration, assets, activeVersion, title } =
			atom.data.media;
		const videoId = assets.find(
			(asset) => asset.version.toNumber() === activeVersion?.toNumber(),
		)?.id;

		if (!posterUrl || !videoId || !atomId) {
			return Optional.none();
		}

		return Optional.some({
			posterUrl,
			videoId,
			duration: duration?.toNumber(),
			atomId,
			title,
		});
	};

export { Video, parseVideo };
