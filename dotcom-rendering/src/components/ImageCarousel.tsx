import { css } from '@emotion/react';
import { palette, space, textSansBold12 } from '@guardian/source/foundations';
import {
	Button,
	SvgChevronLeftSingle,
	SvgChevronRightSingle,
} from '@guardian/source/react-components';
import { useRef, useState } from 'react';
import { takeFirst } from '../lib/tuple';
import type { DCRSlideshowImage } from '../types/front';
import type { ImageSizeType } from './Card/components/ImageWrapper';
import { CardPicture } from './CardPicture';

const carouselContainer = css`
	display: flex;
	scroll-snap-type: x mandatory;
	scroll-behavior: smooth;
	overflow-x: scroll;
	&::-webkit-scrollbar {
		display: none;
	}
`;

const carouselItem = css`
	position: relative;
	flex: 1 0 100%;
	scroll-snap-align: start;
`;

const caption = css`
	${textSansBold12}
	position: absolute;
	bottom: 0;
	left: 0;
	right: 0;
	background: linear-gradient(
		to bottom,
		rgba(0, 0, 0, 0) 0%,
		rgba(0, 0, 0, 0.8) 100%
	);
	color: ${palette.neutral[100]};
	padding: 60px ${space[2]}px ${space[2]}px;
`;

const navigation = css`
	display: flex;
	margin-top: ${space[2]}px;
`;

const pagination = css`
	display: flex;
	flex-grow: 1;
	align-items: center;
	justify-content: center;
	> * + * {
		margin-left: ${space[1]}px;
	}
`;

const pageDot = css`
	display: inline-block;
	width: 6px;
	height: 6px;
	border-radius: 100%;
	background-color: ${palette.neutral[86]};
`;

const currentPageDot = css`
	width: 8px;
	height: 8px;
	background-color: ${palette.neutral[0]};
`;

const buttonGroup = css`
	> * + * {
		margin-left: ${space[2]}px;
	}
`;

export const ImageCarousel = ({
	images,
	imageSize,
}: {
	images: readonly DCRSlideshowImage[];
	imageSize: ImageSizeType;
}) => {
	const carouselItems = useRef<HTMLUListElement>(null);
	const [index, setIndex] = useState(0);

	const getItems = (): HTMLElement[] => {
		const { current } = carouselItems;
		if (current === null) return [];
		return Array.from(current.children) as HTMLElement[];
	};

	const next = () => {
		const items = getItems().length;
		if (index < items - 1) {
			getItems()[index + 1]?.scrollIntoView({ behavior: 'smooth' });
			setIndex(index + 1);
		}
	};

	const prev = () => {
		if (index > 0) {
			getItems()[index - 1]?.scrollIntoView({ behavior: 'smooth' });
			setIndex(index - 1);
		}
	};

	return (
		<div>
			<ul css={carouselContainer} ref={carouselItems}>
				{takeFirst(images, 10).map((image) => {
					const loading = index > 0 ? 'lazy' : 'eager';

					return (
						<li css={carouselItem} key={image.imageSrc}>
							<figure>
								<CardPicture
									mainImage={image.imageSrc}
									imageSize={imageSize}
									alt={image.imageCaption}
									loading={loading}
								/>
								{!!image.imageCaption && (
									<figcaption css={caption}>
										{image.imageCaption}
									</figcaption>
								)}
							</figure>
						</li>
					);
				})}
			</ul>
			<div css={navigation}>
				<div css={pagination}>
					{takeFirst(images, 10).map((_, i) => (
						<span
							css={[pageDot, i === index && currentPageDot]}
							key={`page-${i}`}
						/>
					))}
				</div>
				<div css={buttonGroup}>
					<Button
						size="small"
						icon={<SvgChevronLeftSingle />}
						hideLabel={true}
						priority="tertiary"
						theme={{
							textTertiary: palette.neutral[0],
							borderTertiary: palette.neutral[86],
						}}
						onClick={prev}
					>
						Previous image
					</Button>
					<Button
						size="small"
						icon={<SvgChevronRightSingle />}
						hideLabel={true}
						priority="tertiary"
						theme={{
							textTertiary: palette.neutral[0],
							borderTertiary: palette.neutral[86],
						}}
						onClick={next}
					>
						Next image
					</Button>
				</div>
			</div>
		</div>
	);
};
