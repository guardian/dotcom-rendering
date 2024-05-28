import { useEffect } from 'react';
import { getFavicon } from './Liveness.importable';
import { FEElement } from 'src/types/content';

type Coord = {
	x: number;
	y: number;
};
const coords = {
	a: { x: 4, y: 16 },
	b: { x: 8, y: 16 },
	c: { x: 12, y: 16 },
	d: { x: 16, y: 16 },
	e: { x: 20, y: 16 },
	f: { x: 24, y: 16 },
	g: { x: 28, y: 16 },
	h: { x: 32, y: 16 },
	i: { x: 36, y: 16 },
	j: { x: 40, y: 16 },
	k: { x: 44, y: 16 },
	l: { x: 48, y: 16 },
	m: { x: 52, y: 16 },
	n: { x: 56, y: 16 },
	o: { x: 60, y: 16 },
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
const updateFavicon = async (blocks?: Block[]) => {
	console.log({ blocks });
	if (!blocks) return;
	const favicon = getFavicon(document);
	console.log({ favicon });

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
		console.log('what');
		imageEl.src = src;
		imageEl.onload = () => resolve(imageEl);
	});
	console.log('when');

	console.log(tinyfontImg);
	// const destPos = {
	// 	x: 0,
	// 	y: 0
	// }
	const firstEl = blocks[0]?.elements[0];
	for (const block of blocks) {
		const elements = block.elements;
		for (const el of elements) {
			const elementText = getElementText(el);
		}
	}
	const elText = getElementText(firstEl);

	for (const [index, char] of 'guardian'.split('').entries()) {
		const charCoord = getCharCoord(char);
		const destX = index * 4 + 1;
		const destY = 1;
		context.drawImage(
			tinyfontImg,
			charCoord.x,
			charCoord.y,
			4,
			4,
			destX,
			destY,
			4,
			4,
		);
	}
	// context.drawImage( tinyfontImg, coords.a.x, coords.a.y, 4, 3, destPos.x, destPos.y, 4, 3 );

	favicon.element.href = canvas.toDataURL('image/png');
};

export const FaviconUpdater = ({ blocks }: { blocks: Block[] }) => {
	useEffect(() => {
		void updateFavicon(blocks);
	}, [blocks]);
	// Nothing is rendered by this component
	return null;
};
