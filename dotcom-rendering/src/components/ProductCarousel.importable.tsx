import { css } from '@emotion/react';
import { isUndefined } from '@guardian/libs';
import { from } from '@guardian/source/foundations';
import { useRef, useState } from 'react';
import type { Product } from './ProductCard';
import { ProductCard } from './ProductCard';
import { palette as themePalette } from '../palette';

const carouselStyle = css`
	min-height: 227px;
	display: flex;
	flex-direction: row;
	align-items: stretch;
	scroll-snap-type: x mandatory;
	scroll-behavior: smooth;
	overflow-x: auto;
	overflow-y: hidden;
	${from.tablet} {
		&::-webkit-scrollbar {
			display: none;
		}
		scrollbar-width: none;
	}
	margin-left: -10px;
`;

const buttonStyle = css`
	border: 0 none;
	border-radius: 100%;
	height: 34px;
	width: 34px;
	cursor: pointer;
	margin-top: 10px;
	padding: 0;
	background-color: ${themePalette('--carousel-arrow-background')};

	&:active,
	&:hover {
		outline: none;
		background-color: ${themePalette('--carousel-arrow-background-hover')};
		svg {
			fill: ${themePalette('--carousel-arrow-background')};
		}
	}

	&:focus {
		outline: none;
	}

	svg {
		fill: ${themePalette('--carousel-arrow')};
		height: 34px;
	}
`;

const SvgChevronLeftSingle = () => (
	<svg
		viewBox="0 0 32 32"
		xmlns="http://www.w3.org/2000/svg"
		width="24"
		height="24"
	>
		<path
			fillRule="evenodd"
			clipRule="evenodd"
			d="M18.4 4L8 14.4V15.45L18.4 25.8499L19.375 24.8999L11.05 14.925L19.375 4.95L18.4 4Z"
		/>
	</svg>
);

const SvgChevronRightSingle = () => (
	<svg
		viewBox="0 0 32 32"
		xmlns="http://www.w3.org/2000/svg"
		width="24"
		height="24"
	>
		<path
			fillRule="evenodd"
			clipRule="evenodd"
			d="M9.975 4L9 4.95L17.325 14.925L9 24.8999L9.975 25.8499L20.375 15.45V14.4L9.975 4Z"
		/>
	</svg>
);

export const ProductCarousel = ({ products }: { products: Product[] }) => {
	const listRef = useRef<HTMLUListElement>(null);
	const carouselRef = useRef<HTMLUListElement>(null);
	const [index, setIndex] = useState(0);

	const getItems = (): HTMLElement[] => {
		const { current } = carouselRef;
		if (!current) return [];
		return Array.from(current.children) as HTMLElement[];
	};

	const getIndex = (): number => {
		const { current } = carouselRef;
		const offsets = getItems().map((el) => el.offsetLeft);
		const [offset] = offsets;
		if (!current || isUndefined(offset)) return 0;
		const scrolled = current.scrollLeft + offset;
		const active = offsets.findIndex((el) => el >= scrolled);
		return Math.max(0, active);
	};

	const getSetIndex = () => setIndex(getIndex());

	const goToIndex = (newIndex: number) => {
		const { current } = carouselRef;
		if (!current) return;
		const offsets = getItems().map((el) => el.offsetLeft);
		current.scrollTo({ left: offsets[newIndex] });
		getSetIndex();
	};

	const prev = () => {
		if (index > 0) goToIndex(index - 1);
	};

	const next = () => {
		if (index < products.length - 1) goToIndex(index + 1);
	};

	return (
		<div>
			<div
				style={{
					display: 'flex',
					justifyContent: 'flex-end',
					gap: 8,
					marginBottom: 8,
				}}
			>
				<button
					css={buttonStyle}
					onClick={prev}
					aria-label="Previous"
					disabled={index === 0}
				>
					<SvgChevronLeftSingle />
				</button>
				<button
					css={buttonStyle}
					onClick={next}
					aria-label="Next"
					disabled={index >= products.length - 1}
				>
					<SvgChevronRightSingle />
				</button>
			</div>
			<ul css={carouselStyle} ref={listRef}>
				{products.map((product, i) => (
					<li key={i}>
						<ProductCard {...product} />
					</li>
				))}
			</ul>
		</div>
	);
};
