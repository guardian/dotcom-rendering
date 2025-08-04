import type { DCRFrontImage } from '../../types/front';
import type { MainMedia } from '../../types/mainMedia';
import { Avatar } from '../Avatar';
import type { Loading } from '../CardPicture';
import { CardPicture } from '../CardPicture';

type Props = {
	imageLoading: Loading;
	image?: DCRFrontImage;
	avatarUrl?: string;
	byline?: string;
	mainMedia?: MainMedia;
};

export const HighlightsCardImage = ({
	imageLoading,
	image,
	avatarUrl,
	byline,
	mainMedia,
}: Props) => {
	if (avatarUrl) {
		return (
			<Avatar
				src={avatarUrl}
				alt={byline ?? ''}
				shape="cutout"
				imageSize="large"
			/>
		);
	}

	if (image) {
		if (mainMedia?.type === 'Audio' && mainMedia.podcastImage?.src) {
			return (
				<>
					<CardPicture
						imageSize="medium"
						mainImage={mainMedia.podcastImage.src}
						alt={mainMedia.podcastImage.altText}
						loading={imageLoading}
						isCircular={false}
						aspectRatio="1:1"
					/>
					<div className="image-overlay" />
				</>
			);
		}

		return (
			<>
				<CardPicture
					imageSize="highlights-card"
					mainImage={image.src}
					alt={image.altText}
					loading={imageLoading}
					isCircular={true}
					aspectRatio="1:1"
				/>
				{/* This image overlay is styled when the CardLink is hovered */}
				<div className="image-overlay circular" />
			</>
		);
	}

	return null;
};
