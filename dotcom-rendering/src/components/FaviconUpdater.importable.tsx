import { useEffect } from 'react';
import type { FEElement } from '../types/content';
import { getFavicon } from './Liveness.importable';

type Coord = {
	x: number;
	y: number;
};

const getCharCoord = (char: string): Coord => {
	const charCode = char.toUpperCase().charCodeAt(0);
	return {
		x: (charCode % 16) * 4,
		y: Math.floor(charCode / 16) * 4,
	};
};

const getElementText = (element: FEElement): string => {
	switch (element._type) {
		case 'model.dotcomrendering.pageElements.TextBlockElement':
			const el = document.createElement('div');
			el.innerHTML = element.html;
			return el.textContent ?? '';
		default:
			return '';
	}
};

const writeLineToCanvas = (
	context: CanvasRenderingContext2D,
	str: string,
	fontImg: HTMLImageElement,
	yOffset: number,
) => {
	for (const [index, char] of str.split('').entries()) {
		const charCoord = getCharCoord(char);
		const destX = index * 4 + 1;
		context.drawImage(
			fontImg,
			charCoord.x,
			charCoord.y,
			4,
			4,
			destX,
			yOffset + 1,
			4,
			4,
		);
	}
};

// Split text into array of >8 char length string, with words split with hyphens.
// Only splits in certain circumstances
const splitText = (text: string) => {
	const split = [''];
	const words = text.split(' ');
	const initialSpace = 8;
	for (let i = 0; i < words.length; i++) {
		const word = words[i] as string;
		const remainingSpace =
			initialSpace - (split[split.length - 1] as string).length;
		if (word.length < remainingSpace) {
			split[split.length - 1] += word;
			const sufficientRoomForASpace = remainingSpace - word.length >= 1;
			if (sufficientRoomForASpace) {
				split[split.length - 1] += ' ';
			}
		} else if (remainingSpace >= 3) {
			const frontCharCount = remainingSpace - 1;
			const frontChars = word.substring(0, frontCharCount);
			const backChars = word.substring(frontCharCount);
			words.splice(i + 1, 0, backChars);
			split[split.length - 1] += `${frontChars}-`;
		} else {
			// Add the word to the next line
			split.push('');
			words.splice(i + 1, 0, word);
		}
	}
	return split;
};

const getArticleAsCanvas = async (blocks?: Block[], webTitle?: string) => {
	if (!blocks || !webTitle) return;
	const favicon = getFavicon(document);

	if (!favicon) return;

	const faviconSize = 32;
	const canvas = document.createElement('canvas');
	const context = canvas.getContext('2d');
	if (!context) return;

	canvas.width = faviconSize;

	const tinyfontImg = await new Promise<HTMLImageElement>((resolve) => {
		const src = `/static/frontend/logos/tinyfont.png`;
		const imageEl = new Image();
		imageEl.src = src;
		imageEl.onload = () => resolve(imageEl);
	});

	const tinyHeader = await new Promise<HTMLImageElement>((resolve) => {
		const src = `/static/frontend/logos/tinyguardian.png`;
		const imageEl = new Image();
		imageEl.src = src;
		imageEl.onload = () => resolve(imageEl);
	});

	const firstBlock = blocks[0];
	if (!firstBlock) return;

	const filteredElements = firstBlock.elements.filter(
		(el) =>
			el._type ===
				'model.dotcomrendering.pageElements.TextBlockElement' ||
			el._type === 'model.dotcomrendering.pageElements.ImageBlockElement',
	);
	const onlyTextEls = firstBlock.elements.filter(
		(el) =>
			el._type === 'model.dotcomrendering.pageElements.TextBlockElement',
	);

	const headlineElement = splitText(webTitle);
	const printableElements = [
		headlineElement,
		...onlyTextEls
			.map((el) => getElementText(el))
			.map((text) => splitText(text)),
	];

	const totalTextLines = printableElements.flat().length;
	const headerHeight = 14;
	// We're assuming all images are 22px high here based on a aspect ratio of 3:2, this will be wrong in some cases.
	// TODO: prefetch the image elements here so we know their actual height.
	const assumedImageHeight = 22;
	const totalElements = printableElements.length;
	const imageCount = filteredElements.filter(
		(el) =>
			el._type === 'model.dotcomrendering.pageElements.ImageBlockElement',
	).length;
	// 4px per image for space afterwards
	const totalImageHeight = imageCount * (assumedImageHeight + 4);
	const totalHeight =
		headerHeight +
		totalImageHeight +
		totalTextLines * 4 +
		totalElements * 4;
	canvas.height = totalHeight;

	context.fillStyle = '#ffffff';
	context.fillRect(0, 0, canvas.width, canvas.height);

	//TODO Account for image height

	// TODO: add a white background on the whole canvas

	// Add the header
	context.drawImage(tinyHeader, 0, 0, 32, 12, 0, 0, 32, 12);

	let currentOffset = headerHeight;
	// Current offset = lines in all preceding blocks + total of preceding blocks + position in current array * 4

	for (const textLine of headlineElement) {
		writeLineToCanvas(context, textLine, tinyfontImg, currentOffset);
		// Offset by 4px for each line
		currentOffset += 4;
	}
	// Leave a blank line after the headline
	currentOffset += 4;

	for (const el of filteredElements) {
		if (
			el._type === 'model.dotcomrendering.pageElements.TextBlockElement'
		) {
			const elementText = getElementText(el);
			const printableTextElement = splitText(elementText);
			for (const textLine of printableTextElement) {
				writeLineToCanvas(
					context,
					textLine,
					tinyfontImg,
					currentOffset,
				);
				// Offset by 4px for each line
				currentOffset += 4;
			}
		}
		if (
			el._type === 'model.dotcomrendering.pageElements.ImageBlockElement'
		) {
			const imageUrl = el.media.allImages[0]?.url ?? '';
			if (imageUrl) {
				const image = await new Promise<HTMLImageElement>((resolve) => {
					const imageEl = new Image();
					imageEl.crossOrigin = 'Anonymous';
					imageEl.src = imageUrl;
					imageEl.onload = () => resolve(imageEl);
				});
				const { height, width } = image;
				const destHeight = Math.round(height / (width / faviconSize));
				context.drawImage(
					image,
					0,
					0,
					width,
					height,
					0,
					currentOffset,
					32,
					destHeight,
				);
				currentOffset += destHeight;
			}
		}

		// Leave a 4px blank row after each block
		currentOffset += 4;
	}

	// writeLineToCanvas(context, 'grauniad', tinyfontImg, 1);
	// context.drawImage( tinyfontImg, coords.a.x, coords.a.y, 4, 3, destPos.x, destPos.y, 4, 3 );

	// Have an initial offset to leave room for the logo
	// For each text element, add the text. Add an empty line after.
	// Image height will be (total text rows * 4) + (total blocks * 4) + image height (if we're doing those)
	// Height of any one image will be (initial image height / (initial image width/32))
	// Then try image elements.
	document.body.appendChild(canvas);
	favicon.element.href = canvas.toDataURL('image/png');
	return canvas;
};

export const FaviconUpdater = ({
	blocks,
	webTitle,
}: {
	blocks: Block[];
	webTitle: string;
}) => {
	useEffect(() => {
		getArticleAsCanvas(blocks, webTitle)
			.then((articleCanvas) => {
				const faviconSize = 32;
				const faviconCanvas = document.createElement('canvas');
				const faviconContext = faviconCanvas.getContext('2d');
				const main = document.getElementById('maincontent');
				if (!faviconContext || !main || !articleCanvas) return;
				faviconCanvas.width = faviconSize;
				faviconCanvas.height = faviconSize;

				setInterval(() => {
					// Find pos in doc relative to main.
					const mainYMin = main.offsetTop;
					const mainYMax = main.offsetTop + main.offsetHeight;
					const currentScroll = window.scrollY;
					const pos =
						(currentScroll < mainYMin
							? mainYMin
							: currentScroll > mainYMax
							? mainYMax
							: currentScroll) - mainYMin;
					const progress = pos / (mainYMax - mainYMin);

					const articleCanvasHeight = articleCanvas.height - 32;
					const articleCanvasYPos = Math.round(
						articleCanvasHeight * progress,
					);
					console.log({
						currentScroll,
						mainYMin,
						articleCanvasHeight,
						mainYMax,
						progress,
						articleCanvasYPos,
					});
					faviconContext.drawImage(
						articleCanvas,
						0,
						articleCanvasYPos,
						32,
						32,
						0,
						0,
						32,
						32,
					);
					const favicon = getFavicon(document);
					if (!favicon) return;
					favicon.element.href = faviconCanvas.toDataURL('image/png');
				}, 50);
			})
			.catch(() => null);
	}, [blocks, webTitle]);
	// Nothing is rendered by this component
	return null;
};
