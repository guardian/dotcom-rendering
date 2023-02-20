import { css } from '@emotion/react';
import { breakpoints } from '@guardian/source-foundations';
import type { DCRFrontCard } from '../../types/front';
import { LI } from './Card/components/LI';
import { PlayIcon } from './Card/components/PlayIcon';
import { FrontCard } from './FrontCard';
import { generateSources } from './Picture';

const desktopCarouselCardContainer = css`
	position: relative;
	scroll-snap-align: center;
	max-height: 425px;
	max-width: 710px;
`;

const desktopCarouselOuterCardContainer = (isFirst: boolean) => css`
	height: 425px;
	${isFirst && 'padding-left: 200px'}
	min-height: 227px;
	position: relative; /* must set position for offset(Left) calculations of children to be relative to this box */

	display: flex;
	flex-direction: row;
	align-items: stretch;

	scroll-snap-type: x mandatory;
	scroll-behavior: smooth;
	overflow-x: auto; /* Scrollbar is less intrusive visually on non-desktop devices typically */
	overflow-y: hidden;
`;

const mobileCarouselCardContainer = css`
	height: 251px;
	width: 250px;
`;

const frontCardContainer = css`
	position: absolute;
	top: 5px;
	left: 10px;
	max-width: 220px;
	max-height: 78px;
`;

const playIconContainer = css`
	position: absolute;
	bottom: 9px;
	left: 6px;
`;

type MediaCarouselPictureProps = {
	image: string;
	alt: string;
};

const imageStyles = css`
	width: 710px;
`;

const MediaCarouselPicture = ({ image, alt }: MediaCarouselPictureProps) => {
	const [source] = generateSources(image, [
		{ breakpoint: breakpoints.desktop, width: 710 },
	]);

	if (!source) throw new Error('Missing source');

	return (
		<>
			<picture>
				{/* High resolution (HDPI) sources*/}
				<source
					srcSet={source.hiResUrl}
					media={`(-webkit-min-device-pixel-ratio: 1.25), (min-resolution: 120dpi)`}
				/>
				{/* Low resolution (MDPI) source*/}
				<source srcSet={source.lowResUrl} />

				<img alt={alt} src={source.lowResUrl} css={imageStyles} />
			</picture>
		</>
	);
};

export type CarouselCardProps = {
	isFirst: boolean;
	trail: DCRFrontCard;
};

export const CarouselCardMobile = ({ trail }: CarouselCardProps) => (
	<>
		<LI
			percentage="25%"
			showDivider={false}
			padSides={true}
			padSidesOnMobile={true}
			snapAlignStart={true}
		>
			<div css={mobileCarouselCardContainer}>
				<FrontCard
					trail={trail}
					imageUrl={trail.image}
					imageSize={trail.image ? 'small' : undefined}
					imagePositionOnMobile={'bottom'}
					imagePosition={'bottom'}
				/>
			</div>
		</LI>
	</>
);

export const CarouselCardDesktop = ({ trail, isFirst }: CarouselCardProps) => (
	<>
		<LI percentage="25%" showDivider={false} snapAlignStart={true}>
			<a href={trail.url}>
				<div css={desktopCarouselOuterCardContainer(isFirst)}>
					<div css={desktopCarouselCardContainer}>
						<MediaCarouselPicture
							image={trail.image ?? ''}
							alt={trail.dataLinkName}
						/>
						<div css={playIconContainer}>
							<PlayIcon
								imageSize="large"
								imagePositionOnMobile="bottom"
							/>
						</div>
						<div css={frontCardContainer}>
							<FrontCard
								trail={trail}
								imagePosition="none"
								showMainVideo={false}
							/>
						</div>
					</div>
				</div>
			</a>
		</LI>
	</>
);
