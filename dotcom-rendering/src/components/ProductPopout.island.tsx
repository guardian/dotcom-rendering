import { css } from '@emotion/react';
import {
	from,
	headlineBold20,
	space,
	textSansBold15,
} from '@guardian/source/foundations';
import { Button, SvgCross } from '@guardian/source/react-components';
import { useCallback, useEffect, useRef, useState } from 'react';
import type { ArticleFormat } from '../lib/articleFormat';
import { getZIndex } from '../lib/getZIndex';
import { palette } from '../palette';
import type { PopoutProduct } from '../types/content';
import { ModalOverlay } from './ModalOverlay';
import { ProductPopoutCard } from './ProductPopoutCard';

const thumbnailsShownInTrigger = 3;

/**
 * The mobile sticky ad is fixed to the bottom of the viewport and its height is
 * only known once the ad has loaded, so we measure it and sit the trigger on
 * top of it rather than guessing a fixed offset.
 */
const useMobileStickyAdHeight = (): number => {
	const [height, setHeight] = useState(0);

	useEffect(() => {
		const container = document.querySelector('.mobilesticky-container');
		if (!container) {
			return;
		}

		const observer = new ResizeObserver(([entry]) => {
			setHeight(entry?.contentRect.height ?? 0);
		});
		observer.observe(container);

		return () => observer.disconnect();
	}, []);

	return height;
};

const triggerContainerStyles = (bottomOffset: number, isHidden: boolean) => css`
	position: fixed;
	visibility: ${isHidden ? 'hidden' : 'visible'};
	bottom: ${bottomOffset + space[3]}px;
	left: 0;
	right: 0;
	display: flex;
	justify-content: center;
	pointer-events: none;
	z-index: ${getZIndex('mobileSticky')};
	transition: bottom 150ms ease;
`;

const triggerStyles = css`
	pointer-events: auto;
	display: flex;
	align-items: center;
	gap: ${space[2]}px;
	padding: ${space[2]}px ${space[4]}px ${space[2]}px ${space[2]}px;
	border: 1px solid ${palette('--product-card-border-neutral')};
	border-radius: 100px;
	background-color: ${palette('--product-card-background')};
	color: ${palette('--product-card-headline')};
	${textSansBold15};
	cursor: pointer;
	box-shadow: 0 2px 8px rgba(0, 0, 0, 0.2);
`;

const thumbnailStripStyles = css`
	display: flex;
	/* Overlap the thumbnails so a long list still reads as a single token */
	> * + * {
		margin-left: -10px;
	}
`;

const thumbnailStyles = css`
	width: 28px;
	height: 28px;
	border-radius: 50%;
	object-fit: cover;
	background-color: ${palette('--product-card-background')};
	border: 1px solid ${palette('--product-card-border-neutral')};
`;

const dialogStyles = css`
	background-color: ${palette('--product-card-background')};
	width: 100%;
	max-height: 85vh;
	overflow-y: auto;
	padding: ${space[4]}px;

	${from.tablet} {
		/* Docks the panel to the right of the overlay, as a side sheet */
		margin-left: auto;
		align-self: stretch;
		width: 480px;
		max-height: none;
	}
`;

const dialogHeaderStyles = css`
	display: flex;
	align-items: flex-start;
	justify-content: space-between;
	gap: ${space[3]}px;
	margin-bottom: ${space[5]}px;
`;

const dialogTitleStyles = css`
	${headlineBold20};
	color: ${palette('--product-card-headline')};
`;

const cardGridStyles = css`
	display: grid;
	grid-template-columns: repeat(2, minmax(0, 1fr));
	gap: ${space[6]}px ${space[4]}px;
	padding-bottom: ${space[4]}px;
`;

type Props = {
	products: PopoutProduct[];
	format: ArticleFormat;
	/** The label on the floating trigger, eg 'See all our picks' */
	triggerLabel: string;
	/** The heading inside the popout */
	title: string;
};

export const ProductPopout = ({
	products,
	format,
	triggerLabel,
	title,
}: Props) => {
	const [isOpen, setIsOpen] = useState(false);
	const mobileStickyAdHeight = useMobileStickyAdHeight();
	const triggerRef = useRef<HTMLButtonElement>(null);

	const close = useCallback(() => setIsOpen(false), []);

	if (products.length === 0) {
		return null;
	}

	const thumbnails = products
		.map(({ image }) => image)
		.filter((image) => image !== undefined)
		.slice(0, thumbnailsShownInTrigger);

	return (
		<>
			<div
				css={triggerContainerStyles(mobileStickyAdHeight, isOpen)}
				data-print-layout="hide"
			>
				<button
					ref={triggerRef}
					type="button"
					css={triggerStyles}
					onClick={() => setIsOpen(true)}
					aria-haspopup="dialog"
					aria-expanded={isOpen}
					data-component="product-popout-trigger"
					data-link-name="product popout open"
				>
					<span css={thumbnailStripStyles}>
						{thumbnails.map((image) => (
							<img
								key={image.url}
								src={image.url}
								alt=""
								css={thumbnailStyles}
							/>
						))}
					</span>
					{triggerLabel}
				</button>
			</div>
			{isOpen && (
				<ModalOverlay
					aria-labelledby="product-popout-title"
					onClose={close}
					dialogCss={dialogStyles}
				>
					<div css={dialogHeaderStyles}>
						<h2 id="product-popout-title" css={dialogTitleStyles}>
							{title}
						</h2>
						<Button
							priority="tertiary"
							size="small"
							icon={<SvgCross />}
							hideLabel={true}
							onClick={close}
							data-link-name="product popout close"
						>
							Close
						</Button>
					</div>
					<div css={cardGridStyles}>
						{products.map((product) => (
							<ProductPopoutCard
								key={product.elementId}
								product={product}
								format={format}
								onJumpToProduct={close}
							/>
						))}
					</div>
				</ModalOverlay>
			)}
		</>
	);
};
