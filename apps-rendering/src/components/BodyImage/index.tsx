// ----- Imports ----- //
import { ArticleDesign } from '@guardian/libs';
import type { Breakpoint } from '@guardian/source-foundations';
import type { Option } from '@guardian/types';
import { none } from '@guardian/types';
import type { FC } from 'react';
import type { BodyImageProps } from './BodyImage.defaults';
import DefaultBodyImage, {
	getDefaultImgStyles,
	getDefaultStyles,
} from './BodyImage.defaults';
import GalleryBodyImage from './GalleryBodyImage';
// ----- Component ----- //

type Props = BodyImageProps & { leftColumnBreakpoint: Option<Breakpoint> };

const BodyImage: FC<Props> = ({
	image,
	format,
	supportsDarkMode,
	lightbox,
	caption,
	leftColumnBreakpoint,
}) => {
	switch (format.design) {
		case ArticleDesign.Gallery:
			return (
				<GalleryBodyImage
					image={image}
					format={format}
					supportsDarkMode={supportsDarkMode}
					lightbox={lightbox}
					caption={caption}
					wrapperStyles={getDefaultStyles(
						image.role,
						leftColumnBreakpoint,
					)}
					imgStyles={getDefaultImgStyles(
						image.role,
						supportsDarkMode,
					)}
					captionStyles={none}
				/>
			);

		default:
			return (
				<DefaultBodyImage
					image={image}
					format={format}
					supportsDarkMode={supportsDarkMode}
					lightbox={lightbox}
					caption={caption}
					wrapperStyles={getDefaultStyles(
						image.role,
						leftColumnBreakpoint,
					)}
					imgStyles={getDefaultImgStyles(
						image.role,
						supportsDarkMode,
					)}
					captionStyles={none}
				/>
			);
	}
};

// ----- Exports ----- //

export default BodyImage;
