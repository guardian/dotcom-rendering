export type EpicDataFromBraze = {
	componentName: 'Epic';
	heading?: string;
	highlightedText?: string;
	buttonText?: string;
	buttonUrl?: string;
	paragraph1?: string;
	paragraph2?: string;
	paragraph3?: string;
	paragraph4?: string;
	paragraph5?: string;
	paragraph6?: string;
	paragraph7?: string;
	paragraph8?: string;
	paragraph9?: string;
};

export type Variant = {
	// name: string;
	heading: string;
	paragraphs: Array<string>;
	highlightedText: string;
	cta: {
		text: string;
		baseUrl: string;
	};
};

const parseParagraphs = (dataFromBraze: EpicDataFromBraze): string[] => {
	const isParagraphKey = (k: string): boolean => /^paragraph\d$/.test(k);
	const orderedParagraphKeys = Object.keys(dataFromBraze)
		.filter(isParagraphKey)
		.sort();

	const paragraphs = [];

	for (const key of orderedParagraphKeys) {
		const value = dataFromBraze[key as keyof EpicDataFromBraze];
		if (value) paragraphs.push(value);
	}

	return paragraphs;
};

export const parseBrazeEpicParams = (
	dataFromBraze: EpicDataFromBraze,
): Variant | null => {
	const { heading, highlightedText, buttonText, buttonUrl } = dataFromBraze;

	if (!heading || !highlightedText || !buttonText || !buttonUrl) {
		console.log('Braze Epic: props missing', dataFromBraze);
		return null;
	}

	const paragraphs = parseParagraphs(dataFromBraze);
	if (paragraphs.length < 1) {
		console.log('Braze Epic: no valid paragraphs received', dataFromBraze);
		return null;
	}

	return {
		// name: 'BrazeEpic', // This may be useful for click tracking once we add it
		heading,
		paragraphs,
		highlightedText,
		cta: { text: buttonText, baseUrl: buttonUrl },
	};
};
