const scriptUrls = [
	'https://interactive.guim.co.uk/page-enhancers/nav/boot.js',
	'https://uploads.guim.co.uk/2019/03/20/boot.js',
	'https://uploads.guim.co.uk/2019/12/11/boot.js',
	'https://interactive.guim.co.uk/testing/2020/11/voterSlideshow/boot.js',
	'https://uploads.guim.co.uk/2021/10/15/boot.js',
];

export const isLegacyTableOfContents = (element: CAPIElement): boolean =>
	element._type ===
		'model.dotcomrendering.pageElements.InteractiveBlockElement' &&
	!!element.scriptUrl &&
	scriptUrls.includes(element.scriptUrl);
