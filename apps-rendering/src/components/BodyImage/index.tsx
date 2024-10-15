// ----- Imports ----- //
import { ArticleDesign } from '../../articleFormat';
import type { Breakpoint } from '@guardian/source/foundations';
import type { Option } from '../../../vendor/@guardian/types/index';
import { none } from '../../../vendor/@guardian/types/index';
import type { BodyImageProps } from './BodyImage.defaults';
import DefaultBodyImage, {
	getDefaultImgStyles,
	getDefaultStyles,
} from './BodyImage.defaults';
import GalleryBodyImage from './GalleryBodyImage';
// ----- Component ----- //

type Props = BodyImageProps & { leftColumnBreakpoint: Option<Breakpoint> };

const BodyImage = ({
	image,
	format,
	lightbox,
	caption,
	leftColumnBreakpoint,
}: Props) => {
	switch (format.design) {
		case ArticleDesign.Gallery:
			return (
				<GalleryBodyImage
					image={image}
					format={format}
					lightbox={lightbox}
					caption={caption}
				/>
			);

		default:
			return (
				<DefaultBodyImage
					image={image}
					format={format}
					lightbox={lightbox}
					caption={caption}
					wrapperStyles={getDefaultStyles(
						image.role,
						leftColumnBreakpoint,
					)}
					imgStyles={getDefaultImgStyles(image.role)}
					captionStyles={none}
				/>
			);
	}
};

// ----- Exports ----- //

export default BodyImage;
