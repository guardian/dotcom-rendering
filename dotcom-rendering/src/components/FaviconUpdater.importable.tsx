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

const updateFavicon = async (blocks?: Block[]) => {
	if (!blocks) return;
	const favicon = getFavicon(document);

	if (!favicon) return;

	const faviconSize = 32;
	const canvas = document.createElement('canvas');
	const context = canvas.getContext('2d');
	if (!context) return;

	canvas.width = faviconSize;
	canvas.height = faviconSize;
	context.fillStyle = '#F76B67';
	context.fillRect(0, 0, canvas.width, canvas.height);

	const tinyfontImg = await new Promise<HTMLImageElement>((resolve) => {
		const src = `/static/frontend/logos/tinyfont.png`;
		const imageEl = new Image();
		imageEl.src = src;
		imageEl.onload = () => resolve(imageEl);
	});

	const firstEl = blocks[0]?.elements[0];
	for (const block of blocks) {
		const elements = block.elements;
		for (const el of elements) {
			const elementText = getElementText(el);
		}
	}
	const elText = getElementText(firstEl);

	// for (const [index, char] of 'guardian'.split('').entries()) {
	// 	const charCoord = getCharCoord(char);
	// 	const destX = index * 4 + 1;
	// 	const destY = 1;
	// 	context.drawImage(
	// 		tinyfontImg,
	// 		charCoord.x,
	// 		charCoord.y,
	// 		4,
	// 		4,
	// 		destX,
	// 		destY,
	// 		4,
	// 		4,
	// 	);
	// }
	writeLineToCanvas(context, 'grauniad', tinyfontImg, 1);
	// context.drawImage( tinyfontImg, coords.a.x, coords.a.y, 4, 3, destPos.x, destPos.y, 4, 3 );

	// Have an initial offset to leave room for the logo
	// For each text element, add the text. Add an empty line after.
	// Image height will be (total text rows * 4) + (total blocks * 4) + image height (if we're doing those)
	// Height of any one image will be (initial image height / (initial image width/32))
	// Then try image elements.

	favicon.element.href = canvas.toDataURL('image/png');
};

export const FaviconUpdater = ({ blocks }: { blocks: Block[] }) => {
	useEffect(() => {
		void updateFavicon(blocks);
	}, [blocks]);
	// Nothing is rendered by this component
	return null;
};
