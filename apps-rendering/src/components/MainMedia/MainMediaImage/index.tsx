// ----- Imports ----- //

import type { SerializedStyles } from '@emotion/react';
import type { ArticleFormat } from '@guardian/libs';
import { ArticleDesign } from '@guardian/libs';
import type { Image } from 'image';
import type { FC } from 'react';
import BlogMainMediaImage from './BlogMainMediaImage';
import CommentMainMediaImage from './CommentMainMediaImage';
import InterviewMainMediaImage from './InterviewMainMediaImage';
import DefaultMainMediaImage, {
	defaultImgCss,
	defaultSizes,
	defaultStyles,
} from './MainMediaImage.defaults';

// ----- Component ----- //

interface Props {
	image: Image;
	className?: SerializedStyles;
	format: ArticleFormat;
}

const MainMediaImage: FC<Props> = ({ className, image, format }: Props) => {
	switch (format.design) {
		case ArticleDesign.LiveBlog:
		case ArticleDesign.DeadBlog:
			return <BlogMainMediaImage image={image} format={format} />;
		case ArticleDesign.Interview:
			return <InterviewMainMediaImage image={image} format={format} />;
		case ArticleDesign.Comment:
		case ArticleDesign.Editorial:
		case ArticleDesign.Letter:
			return <CommentMainMediaImage image={image} format={format} />;
		default:
			return (
				<DefaultMainMediaImage
					image={image}
					format={format}
					css={defaultStyles}
					imgCss={defaultImgCss(image)}
					sizes={defaultSizes}
				/>
			);
	}
};

// ----- Exports ----- //

export default MainMediaImage;
