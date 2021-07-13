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
	heading?: string;
	paragraphs: Array<string>;
	highlightedText?: string;
	cta: {
		text: string;
		baseUrl: string;
	};
	ophanComponentId: string;
	name: string;
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
	const requiredBasicFields: Array<keyof EpicDataFromBraze> = [
		'buttonText',
		'buttonUrl',
		'ophanComponentId',
	];

	const missingBasicFields = requiredBasicFields.filter(
		(key) => !dataFromBraze[key],
	);
	if (missingBasicFields.length > 0) {
		return err(`Missing field(s): ${missingBasicFields}`);
	}

	const paragraphs = parseParagraphs(dataFromBraze);
	if (paragraphs.length < 1) {
		return err('Missing paragraphs');
	}

	const variant = {
		name: 'CONTROL', // A name is required by the ContributionsEpic component
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
