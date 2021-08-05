export const bestFitImage = (
	images: ImageSource[],
	containerWidth: number,
): SrcSetItem => {
	const srcSets: SrcSetItem[] = images.reduce(
		(acc: SrcSetItem[], curr: ImageSource) => acc.concat(curr.srcSet),
		[],
	);

	// should confirm this is the correct behaviour
	if (srcSets.length === 0) {
		throw new Error('No inline images found');
	}

	const bestFit = srcSets
		.sort((a, b) => a.width - b.width)
		.find((img) => img.width >= containerWidth);

	return bestFit || srcSets[srcSets.length - 1];
};

// AMP images need their height set explicitly, but
// ImageBlockElement.imageSources doesn't pass height through. So
// have to calculate height using aspect ratio from ImageBlockElement.media.allImages
export const heightEstimate = (img: Image, width: number): number => {
	const w = parseInt(img.fields.width, 10);
	const h = parseInt(img.fields.height, 10);
	const aspectRatio = w / h;

	return width / aspectRatio;
};
