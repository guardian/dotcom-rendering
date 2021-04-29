import { Result, ok, err } from '@guardian/types';

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
	ophanComponentId?: string;
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
	ophanComponentId: string;
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
): Result<string, Variant> => {
	const basicFields: Array<keyof EpicDataFromBraze> = [
		'heading',
		'highlightedText',
		'buttonText',
		'buttonUrl',
		'ophanComponentId',
	];

	const missingBasicFields = basicFields.filter((key) => !dataFromBraze[key]);
	if (missingBasicFields.length > 0) {
		return err(`Missing field(s): ${missingBasicFields}`);
	}

	const paragraphs = parseParagraphs(dataFromBraze);
	if (paragraphs.length < 1) {
		return err('Missing paragraphs');
	}

	const variant = {
		heading: dataFromBraze.heading,
		paragraphs,
		highlightedText: dataFromBraze.highlightedText,
		cta: {
			text: dataFromBraze.buttonText,
			baseUrl: dataFromBraze.buttonUrl,
		},
		ophanComponentId: dataFromBraze.ophanComponentId,
	};

	return ok(variant as Variant);
};
