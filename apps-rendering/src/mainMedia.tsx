// ----- Imports ----- //

import type { ArticleFormat } from '@guardian/libs';
import type { Option } from '@guardian/types';
import HeaderImage from 'components/HeaderImage';
import HeaderVideo from 'components/HeaderVideo';
import type { Image as ImageData } from 'image';
import { maybeRender } from 'lib';
import type { FC } from 'react';
import type { Video as VideoData } from 'video';

// ----- Types ----- //

export const enum MainMediaKind {
	Image,
	Video,
}

export type MainMedia =
	| { kind: MainMediaKind.Image; image: ImageData }
	| { kind: MainMediaKind.Video; video: VideoData };

// ----- Component ----- //

interface Props {
	format: ArticleFormat;
	mainMedia: Option<MainMedia>;
}

const MainMedia: FC<Props> = ({ format, mainMedia }) =>
	maybeRender(mainMedia, (media) => {
		switch (media.kind) {
			case MainMediaKind.Image:
				return <HeaderImage image={media.image} format={format} />;
			case MainMediaKind.Video:
				return <HeaderVideo video={media.video} format={format} />;
		}
	});

// ----- Exports ----- //

export default MainMedia;
