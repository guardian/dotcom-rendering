type StrInOutFuncType = (str: string) => string;

const removeAlphaNumeric: StrInOutFuncType = (str) =>
	str.replace(new RegExp('[^0-9a-z ]', 'gi'), ';'); // We set it to semicolon so we can remove it at the end
const lowercase: StrInOutFuncType = (str) => str.toLowerCase();
const replaceSpacesWithHyphens: StrInOutFuncType = (str) =>
	str.replace(new RegExp(' ', 'g'), '-'); // Replace the space
const removeTempChars: StrInOutFuncType = (str) =>
	str.replace(new RegExp('[;]', 'g'), ''); // Strip out those semicolons

export const formatAttrString = (input: string): string =>
	removeTempChars(
		replaceSpacesWithHyphens(lowercase(removeAlphaNumeric(input))),
	);
