import type { SerializedStyles } from '@emotion/react';
import type { ReactElement } from 'react';
import type { BannerId } from '../banners/common/types';
import type { ReactComponent } from '../lib/ReactComponent';

export type ImageAttrs = {
	url: string;
	media: string;
	alt?: string;
};

type ResponsiveImageProps = {
	images: Array<ImageAttrs>;
	baseImage: ImageAttrs;
	bannerId?: BannerId;
	cssOverrides?: SerializedStyles;
};

function createSource(image: ImageAttrs): ReactElement {
	return <source media={image.media} srcSet={image.url} key={image.url} />;
}

export const ResponsiveImage: ReactComponent<ResponsiveImageProps> = ({
	images,
	baseImage,
	bannerId,
	cssOverrides,
}: ResponsiveImageProps) => {
	return (
		<picture id={bannerId} css={cssOverrides}>
			{images.map(createSource)}
			<img src={baseImage.url} alt={baseImage.alt} />
		</picture>
	);
};
