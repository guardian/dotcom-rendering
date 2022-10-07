// ----- Imports ----- //

import type { SerializedStyles } from '@emotion/react';
import type { ArticleFormat } from '@guardian/libs';
import { ArticleDesign, ArticleDisplay } from '@guardian/libs';
import type { Image } from 'image';
import type { FC } from 'react';
import BlogMainMediaImage from './BlogMainMediaImage';
import CommentMainMediaImage from './CommentMainMediaImage';
import GalleryMainMediaImage from './GalleryMainMediaImage';
import ImmersiveMainMediaImage from './ImmersiveMainMediaImage';
import InterviewMainMediaImage from './InterviewMainMediaImage';
import DefaultMainMediaImage, {
	defaultImgCss,
	defaultSizes,
	defaultStyles,
} from './MainMediaImage.defaults';
import NewsletterSignupMainMediaImage from './NewsletterSignupMainMediaImage';

// ----- Component ----- //

interface Props {
	image: Image;
	className?: SerializedStyles;
	format: ArticleFormat;
}

const MainMediaImage: FC<Props> = ({ image, format }: Props) => {
	if (format.display === ArticleDisplay.Immersive) {
		return <ImmersiveMainMediaImage image={image} format={format} />;
	}

	switch (format.design) {
		case ArticleDesign.Gallery:
			return <GalleryMainMediaImage image={image} format={format} />;
		case ArticleDesign.LiveBlog:
		case ArticleDesign.DeadBlog:
			return <BlogMainMediaImage image={image} format={format} />;
		case ArticleDesign.Interview:
			return <InterviewMainMediaImage image={image} format={format} />;
		case ArticleDesign.Comment:
		case ArticleDesign.Editorial:
		case ArticleDesign.Letter:
			return <CommentMainMediaImage image={image} format={format} />;
		case ArticleDesign.NewsletterSignup:
			return <NewsletterSignupMainMediaImage image={image} format={format} />;
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
