import { css } from '@emotion/react';
import { from, space, until } from '@guardian/source/foundations';
import type { ArticleFormat } from '../lib/articleFormat';
import type { ImageBlockElement } from '../types/content';
import { Caption } from './Caption';
import { GridItem } from './GridItem';
import { ImageComponent } from './ImageComponent';
import { SlideshowCarousel } from './SlideshowCarousel.importable';
import { getLargest, getMaster } from '../lib/image';
import { Island } from './Island';

type Props = {
	images: ImageBlockElement[];
	format: ArticleFormat;
	caption?: string;
	presentation?: 'slideshow' | 'side-by-side' | 'stacked';
};

const ieFallback = css`
	display: flex;
	flex-direction: column;
	${until.leftCol} {
		margin-left: 0px;
	}
	${from.leftCol} {
		margin-left: 151px;
	}
	${from.wide} {
		margin-left: 230px;
	}
`;

const wrapper = css`
	margin-top: 12px;
	margin-bottom: 12px;
	${until.leftCol} {
		clear: left;
	}
	img {
		object-fit: cover;
		width: 100%;
	}
`;

const SideBySideGrid = ({ children }: { children: React.ReactNode }) => (
	<div
		css={css`
			${ieFallback}
			@supports (display: grid) {
				margin-left: 0;
				margin-right: ${space[3]}px;
				display: grid;
				grid-gap: ${space[3]}px;
				grid-template-columns:
					50% /* Left column */
					50%; /* Right column */
				grid-template-areas: 'first second';
			}
		`}
	>
		{children}
	</div>
);

const OneAboveTwoGrid = ({ children }: { children: React.ReactNode }) => (
	<div
		css={css`
			${ieFallback}
			@supports (display: grid) {
				margin-left: 0;
				margin-right: ${space[3]}px;
				display: grid;
				grid-gap: ${space[3]}px;
				grid-template-columns:
					50% /* Left column */
					50%; /* Right column */
				grid-template-areas:
					'first first'
					'second third';
			}
		`}
	>
		{children}
	</div>
);

const GridOfFour = ({ children }: { children: React.ReactNode }) => (
	<div
		css={css`
			${ieFallback}
			@supports (display: grid) {
				margin-left: 0;
				margin-right: ${space[3]}px;
				display: grid;
				grid-gap: ${space[3]}px;
				grid-template-columns:
					50% /* Left column */
					50%; /* Right column */
				grid-template-areas:
					'first second'
					'third forth';
			}
		`}
	>
		{children}
	</div>
);

const removeLastFullStop = (text?: string) => {
	if (!text) return text;
	if (text.endsWith('.')) {
		return text.slice(0, -1);
	}
	return text;
};

const OneImage = ({
	images,
	format,
	caption,
}: {
	images: [ImageBlockElement];
	format: ArticleFormat;
	caption?: string;
}) => {
	const captionToUse = caption || removeLastFullStop(images[0].data.caption);
	return (
		<div css={wrapper}>
			<ImageComponent
				format={format}
				element={images[0]}
				hideCaption={true}
				role={images[0].role}
			/>
			{!!captionToUse && (
				<Caption
					format={format}
					captionText={captionToUse}
					shouldLimitWidth={false}
				/>
			)}
		</div>
	);
};

const TwoImage = ({
	images,
	format,
	caption,
}: {
	images: [ImageBlockElement, ImageBlockElement];
	format: ArticleFormat;
	caption?: string;
}) => {
	const captionLeft =
		images[0].data.caption &&
		`${removeLastFullStop(images[0].data.caption)} (above left).  `;
	const captionRight =
		images[1].data.caption &&
		`${removeLastFullStop(images[1].data.caption)} (above right).  `;
	const captionToUse = caption || `${captionLeft ?? ''}${captionRight ?? ''}`;
	return (
		<div css={wrapper}>
			<SideBySideGrid>
				<GridItem area="first">
					<ImageComponent
						element={images[0]}
						format={format}
						hideCaption={true}
						role={images[0].role}
					/>
				</GridItem>
				<GridItem area="second">
					<ImageComponent
						element={images[1]}
						format={format}
						hideCaption={true}
						role={images[1].role}
					/>
				</GridItem>
			</SideBySideGrid>
			{!!captionToUse && (
				<Caption
					captionText={captionToUse}
					format={format}
					shouldLimitWidth={false}
				/>
			)}
		</div>
	);
};

const ThreeImage = ({
	images,
	format,
	caption,
}: {
	images: [ImageBlockElement, ImageBlockElement, ImageBlockElement];
	format: ArticleFormat;
	caption?: string;
}) => {
	const captionTop =
		images[0].data.caption &&
		`${removeLastFullStop(images[0].data.caption)} (top).  `;
	const captionBottomLeft =
		images[1].data.caption &&
		`${removeLastFullStop(images[1].data.caption)} (bottom left).  `;
	const captionBottomRight =
		images[2].data.caption &&
		`${removeLastFullStop(images[2].data.caption)} (bottom right).  `;
	const captionToUse =
		caption ||
		`${captionTop ?? ''}${captionBottomLeft ?? ''}${
			captionBottomRight ?? ''
		}`;
	return (
		<div css={wrapper}>
			<OneAboveTwoGrid>
				<GridItem area="first">
					<ImageComponent
						element={images[0]}
						format={format}
						hideCaption={true}
						role={images[0].role}
					/>
				</GridItem>
				<GridItem area="second">
					<ImageComponent
						element={images[1]}
						format={format}
						hideCaption={true}
						role={images[1].role}
					/>
				</GridItem>
				<GridItem area="third">
					<ImageComponent
						element={images[2]}
						format={format}
						hideCaption={true}
						role={images[2].role}
					/>
				</GridItem>
			</OneAboveTwoGrid>
			{!!captionToUse && (
				<Caption
					captionText={captionToUse}
					format={format}
					shouldLimitWidth={false}
				/>
			)}
		</div>
	);
};

const FourImage = ({
	images,
	format,
	caption,
}: {
	images: [
		ImageBlockElement,
		ImageBlockElement,
		ImageBlockElement,
		ImageBlockElement,
	];
	format: ArticleFormat;
	caption?: string;
}) => {
	const captionTopLeft =
		images[0].data.caption &&
		`${removeLastFullStop(images[0].data.caption)} (top left).  `;
	const captionTopRight =
		images[1].data.caption &&
		`${removeLastFullStop(images[1].data.caption)} (top right).  `;
	const captionBottomLeft =
		images[2].data.caption &&
		`${removeLastFullStop(images[2].data.caption)} (bottom left).  `;
	const captionBottomRight =
		images[3].data.caption &&
		`${removeLastFullStop(images[3].data.caption)} (bottom right).  `;
	const captionToUse =
		caption ||
		`${captionTopLeft ?? ''}${captionTopRight ?? ''}${
			captionBottomLeft ?? ''
		}${captionBottomRight ?? ''}`;
	return (
		<div css={wrapper}>
			<GridOfFour>
				<GridItem area="first">
					<ImageComponent
						element={images[0]}
						format={format}
						hideCaption={true}
						role={images[0].role}
					/>
				</GridItem>
				<GridItem area="second">
					<ImageComponent
						element={images[1]}
						format={format}
						hideCaption={true}
						role={images[1].role}
					/>
				</GridItem>
				<GridItem area="third">
					<ImageComponent
						element={images[2]}
						format={format}
						hideCaption={true}
						role={images[2].role}
					/>
				</GridItem>
				<GridItem area="forth">
					<ImageComponent
						element={images[3]}
						format={format}
						hideCaption={true}
						role={images[3].role}
					/>
				</GridItem>
			</GridOfFour>
			{!!captionToUse && (
				<Caption
					captionText={captionToUse}
					format={format}
					shouldLimitWidth={false}
				/>
			)}
		</div>
	);
};

const Slideshow = ({
	images,
	format,
	caption,
}: {
	images: ImageBlockElement[];
	format: ArticleFormat;
	caption?: string;
}) => {
	const imagesForSlideshow = images.map((element) => {
		/** Legacy images do not have a master so we fallback to the largest available */
		const image =
			getMaster(element.media.allImages) ??
			getLargest(element.media.allImages);
		return {
			imageSrc: image?.url ?? '',
			imageCaption: element.data.caption,
		};
	});
	return (
		<>
			<Island priority="feature" defer={{ until: 'visible' }}>
				<SlideshowCarousel
					images={imagesForSlideshow}
					imageSize="large"
					hasNavigationBackgroundColour={false}
					linkTo="https://www.theguardian.com"
					linkAriaLabel="news | group-3 | card-@1 | media-slideshow"
					dataLinkName="slideshow-carousel-1"
				/>
			</Island>
		</>
	);
};

export const MultiImageBlockComponent = ({
	images,
	format,
	caption,
	presentation,
}: Props) => {
	if (presentation && presentation === 'slideshow') {
		return <Slideshow images={images} format={format} caption={caption} />;
	} else {
		const [one, two, three, four] = images;

		if (one && two && three && four) {
			return (
				<FourImage
					images={[one, two, three, four]}
					format={format}
					caption={caption}
				/>
			);
		}

		if (one && two && three) {
			return (
				<ThreeImage
					images={[one, two, three]}
					format={format}
					caption={caption}
				/>
			);
		}

		if (one && two) {
			return (
				<TwoImage
					images={[one, two]}
					format={format}
					caption={caption}
				/>
			);
		}

		if (one) {
			return (
				<OneImage images={[one]} format={format} caption={caption} />
			);
		}

		return null;
	}
};
