import { css } from '@emotion/react';
import { space, until } from '@guardian/source/foundations';
import type { DCRFrontImage } from '../../types/front';
import type { MainMedia } from '../../types/mainMedia';
import { Avatar } from '../Avatar';
import type { Loading } from '../CardPicture';
import { CardPicture } from '../CardPicture';

const imageStyles = css`
	position: relative;
	align-self: flex-end;
	flex-shrink: 0;
	width: 98px;
	${until.tablet} {
		margin-top: ${space[2]}px;
	}
`;

/** An avatar should align with the bottom of the card */
const nonAvatarImageStyles = css`
	margin-bottom: 10px;
`;

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
			<div css={imageStyles}>
				<Avatar
					src={avatarUrl}
					alt={byline ?? ''}
					shape="cutout"
					imageSize="highlights-card"
				/>
			</div>
		);
	}

	if (image) {
		if (mainMedia?.type === 'Audio' && mainMedia.podcastImage?.src) {
			return (
				<div css={[imageStyles, nonAvatarImageStyles]}>
					<CardPicture
						imageSize="highlights-card"
						mainImage={mainMedia.podcastImage.src}
						alt={mainMedia.podcastImage.altText}
						loading={imageLoading}
						isCircular={false}
						aspectRatio="1:1"
					/>
					<div className="media-overlay" />
				</div>
			);
		}

		return (
			<div css={[imageStyles, nonAvatarImageStyles]}>
				<CardPicture
					imageSize="highlights-card"
					mainImage={image.src}
					alt={image.altText}
					loading={imageLoading}
					isCircular={true}
					aspectRatio="1:1"
				/>
				{/* This overlay is styled when the CardLink is hovered */}
				<div className="media-overlay circular" />
			</div>
		);
	}

	return null;
};
