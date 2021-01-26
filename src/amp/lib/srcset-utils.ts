import { bestFitImage } from '@root/src/amp/lib/image-fit';

const containerWidths: number[] = [600, 800, 1000, 1200, 1600];
// This distribution of numbers is a balance between providing enough pictures
// to cover a wide variety of widths while keeping the set as small as possible.
// Pascal, Feb 2020

type DeduplicationPacket = {
	items: SrcSetItem[];
	widthsUsed: number[];
};

const removeDuplicateWidth = (items: SrcSetItem[]): SrcSetItem[] => {
	const packet: DeduplicationPacket = items.reduce(
		(acc: DeduplicationPacket, curr: SrcSetItem) => {
			if (acc.widthsUsed.includes(curr.width)) {
				return acc;
			}
			return {
				items: acc.items.concat(curr),
				widthsUsed: acc.widthsUsed.concat(curr.width),
			};
		},
		{
			items: [],
			widthsUsed: [],
		},
	);
	return packet.items;
};

export const scrsetStringFromImagesSources = (
	imageSources: ImageSource[],
): string => {
	const srcSetItems1 = containerWidths.map((width) =>
		bestFitImage(imageSources, width),
	);
	// We now need to make sure that we do not have multiple images with the same width
	const srcSetItems2 = removeDuplicateWidth(srcSetItems1);
	return srcSetItems2.map((item) => `${item.src} ${item.width}w`).join(', ');
};
