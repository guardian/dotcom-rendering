// ----- Imports ----- //
import { ArticleDesign } from '@guardian/libs';
import type { FC } from 'react';
import type { BodyImageProps } from './BodyImage.defaults';
import DefaultBodyImage from './BodyImage.defaults';
import GalleryBodyImage from './GalleryBodyImage';
// ----- Component ----- //

const BodyImage: FC<BodyImageProps> = ({
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
					leftColumnBreakpoint={leftColumnBreakpoint}
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
					leftColumnBreakpoint={leftColumnBreakpoint}
				/>
			);
	}
};

// ----- Exports ----- //

export default BodyImage;
