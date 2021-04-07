/*
	Date: April 2021
	This is a reimplementation in DCR, for parity of the Localisation.scala file in frontend.
	I realise that the replacement items are rather adhoc but again, we are just ensuring parity.
*/

// How to read the repacement instructions ?
// ["US", "Film", "Movies"] , means: If the edition is US, then replace "Film" by "Movies"
// Instructions in the caseInsensitive array must also work in lowecase, therefore replace "film" by "movies"

type TranslationInstruction = [Edition, string, string];

const caseInsensitive: TranslationInstruction[] = [
	['US', 'Film', 'Movies'],
	['US', 'Football', 'Soccer'],
];

const caseSensitive: TranslationInstruction[] = [
	['US', 'in film', 'in movies'],
	['US', 'in football', 'in soccer'],
	[
		'US',
		'Football news, match reports and fixtures',
		'Soccer news, match reports and fixtures',
	],
];

const intructionToLowerCase = (
	instr: TranslationInstruction,
): TranslationInstruction => {
	return [instr[0], instr[1].toLowerCase(), instr[2].toLowerCase()];
};

const instructionsToLowerCase = (
	instrs: TranslationInstruction[],
): TranslationInstruction[] => {
	return instrs.map((i) => {
		return intructionToLowerCase(i);
	});
};

const allInstructions: TranslationInstruction[] = caseInsensitive.concat(
	instructionsToLowerCase(caseInsensitive),
	caseSensitive,
);

export const localise = (editionId: Edition | undefined, input: string) => {
	const localiseReduceStep = (
		str: string,
		instr: TranslationInstruction,
	): string => {
		if (instr[0] === editionId) {
			if (str === instr[1]) {
				return instr[2];
			}
		}
		return str;
	};
	return allInstructions.reduce(localiseReduceStep, input);
};
