import type { Atoms } from "@guardian/content-api-models/v1/atoms";
import type { BlockElement } from "@guardian/content-api-models/v1/blockElement";
import type { Option } from "@guardian/types/option";
import { none, some } from "@guardian/types/option";

interface Video {
    posterUrl: string;
    videoId: string;
    duration?: number;
}

const parseVideo = (element: BlockElement, atoms?: Atoms): Option<Video> => {
    if (!atoms) {
        return none;
    }

    const id = element.contentAtomTypeData?.atomId;
    const atom = atoms.media?.find((media) => media.id === id);

    if (atom?.data.kind !== "media") {
        return none;
    }

    const { posterUrl, duration, assets, activeVersion } = atom.data.media;
    const videoId = assets.find(
        (asset) => asset.version.toNumber() === activeVersion?.toNumber()
    )?.id;

    if (!posterUrl || !videoId) {
        return none;
    }

    return some({
        posterUrl,
        videoId,
        duration: duration?.toNumber(),
    });
};

export { Video, parseVideo };
