import { map, withDefault } from '@guardian/types';
import HeaderImage from 'components/headerImage';
import HeaderVideo from 'components/headerVideo';
import type { Image as ImageData } from 'image';
import type { Item } from 'item';
import { getFormat } from 'item';
import { pipe } from 'lib';
import type { FC } from 'react';
import type { Video as VideoData } from 'video';

export const enum MainMediaKind {
	Image,
	Video,
}

export type MainMedia =
	| { kind: MainMediaKind.Image; image: ImageData }
	| { kind: MainMediaKind.Video; video: VideoData };

interface HeaderMediaProps {
	item: Item;
}

const HeaderMedia: FC<HeaderMediaProps> = ({ item }) => {
	const format = getFormat(item);
	return pipe(
		item.mainMedia,
		map((media) => {
			if (media.kind === MainMediaKind.Image) {
				return <HeaderImage image={media.image} format={format} />;
			}

			if (media.kind.valueOf() === MainMediaKind.Video.valueOf()) {
				return <HeaderVideo video={media.video} format={format} />;
			}

			return <></>;
		}),
		withDefault(<></>),
	);
};

export default HeaderMedia;
