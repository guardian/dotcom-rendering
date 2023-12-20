// ----- Imports ----- //

import type { ArticleFormat } from '@guardian/libs';
import type { Option } from '../../../vendor/@guardian/types/index';
import MainMediaImage from 'components/MainMedia/MainMediaImage';
import MainMediaVideo from 'components/MainMedia/MainMediaVideo';
import { maybeRender } from 'lib';
import { MainMedia, MainMediaKind } from 'mainMedia';
import type { FC } from 'react';
import GalleryCaption from './GalleryCaption';
import ImmersiveCaption from './ImmersiveCaption';

// ----- Component ----- //

interface Props {
	format: ArticleFormat;
	mainMedia: Option<MainMedia>;
}

const MainMedia: FC<Props> = ({ format, mainMedia }) =>
	maybeRender(mainMedia, (media) => {
		switch (media.kind) {
			case MainMediaKind.Image:
				return <MainMediaImage image={media.image} format={format} />;
			case MainMediaKind.Video:
				return <MainMediaVideo video={media.video} format={format} />;
			case MainMediaKind.Cartoon:
				return null;
		}
	});

// ----- Exports ----- //

export { ImmersiveCaption, GalleryCaption };

export default MainMedia;
