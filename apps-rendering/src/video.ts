import type { Atoms } from '@guardian/content-api-models/v1/atoms';
import type { BlockElement } from '@guardian/content-api-models/v1/blockElement';
import { Optional } from 'optional';
import type { MediaAtom } from '@guardian/content-atom-model/media/mediaAtom';
import { AssetType } from '@guardian/content-atom-model/media/assetType';

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
		const mediaAtom: MediaAtom = atom.data.media;
		const { posterUrl, duration, assets, activeVersion, title } = mediaAtom;
		const videoAssets = assets.filter(
			(asset) => asset.assetType === AssetType.VIDEO,
		);
		const videoId = videoAssets.find(
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
