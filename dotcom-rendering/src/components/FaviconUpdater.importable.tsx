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
			console.log({ html: element.html, textContent: el.textContent });
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

const updateFavicon = async (blocks?: Block[], webTitle: string) => {
	if (!blocks) return;
	const favicon = getFavicon(document);

	if (!favicon) return;

	const faviconSize = 32;
	const canvas = document.createElement('canvas');
	const context = canvas.getContext('2d');
	if (!context) return;

	canvas.width = faviconSize;
	context.fillStyle = '#F76B67';
	context.fillRect(0, 0, canvas.width, canvas.height);

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

	const onlyTextEls = firstBlock.elements.filter(
		(el) =>
			el._type === 'model.dotcomrendering.pageElements.TextBlockElement',
	);
	console.log(onlyTextEls);
	const headlineElement = splitText(webTitle);
	const printableElements = [
		headlineElement,
		...onlyTextEls
			.map((el) => getElementText(el))
			.map((text) => splitText(text)),
	];
	console.log(printableElements);
	const totalTextLines = printableElements.flat().length;
	const headerHeight = 14;
	const totalElements = printableElements.length;
	// each line is rendered as 4px high, including blank pixel above char, and elements have 4px blank space after
	const totalHeight = headerHeight + totalTextLines * 4 + totalElements * 4;
	canvas.height = totalHeight;

	// TODO: add a white background on the whole canvas

	// Add the header
	context.drawImage(tinyHeader, 0, 0, 32, 12, 0, 0, 32, 12);

	let currentOffset = headerHeight;
	// Current offset = lines in all preceding blocks + total of preceding blocks + position in current array * 4

	for (const printableElement of printableElements) {
		for (const textLine of printableElement) {
			// console.log(textLine)
			// console.log(currentOffset)
			writeLineToCanvas(context, textLine, tinyfontImg, currentOffset);
			// Offset by 4px for each line
			currentOffset += 4;
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
};

export const FaviconUpdater = ({
	blocks,
	webTitle,
}: {
	blocks: Block[];
	webTitle: string;
}) => {
	useEffect(() => {
		void updateFavicon(blocks, webTitle);
	}, [blocks, webTitle]);
	// Nothing is rendered by this component
	return null;
};
