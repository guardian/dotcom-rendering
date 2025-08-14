import { AUDIENCE_SPACES } from './constants.ts';
import { FastlyTestParams } from './types.ts';

const validateValue = (value: string | number): void => {
	const stringValue = String(value);
	if (stringValue.includes(',')) {
		throw new Error(
			`Value "${stringValue}" contains invalid character: comma (,)`,
		);
	}
	if (stringValue.includes(':')) {
		throw new Error(
			`Value "${stringValue}" contains invalid character: colon (:)`,
		);
	}
};

/**
 * Stringifies an object or array into a Fastly subfield format.
 * https://www.fastly.com/documentation/reference/vcl/functions/miscellaneous/subfield/
 */
const stringifyFastlySubfield = (
	obj: Record<string, string | number> | Array<string>,
) =>
	Object.entries(obj)
		.map(([key, value]) => {
			validateValue(value);
			return `${key}=${value}`;
		})
		.join(',');

/**
 * Parses a Fastly subfield string into an object.
 * https://www.fastly.com/documentation/reference/vcl/functions/miscellaneous/subfield/
 */
const parseFastlySubfield = (str: string): Record<string, string | number> => {
	const result: Record<string, string | number> = {};
	str.split(',').forEach((pair) => {
		const [key, value] = pair.split('=');
		if (key && value) {
			result[key] = isNaN(Number(value)) ? value : Number(value);
		}
	});
	return result;
};

/**
 * Parses a Fastly subfield string into an array of FastlyTestParams.
 * This is specifically for MVT values where each group has its own parameters.
 * The expected format is:
 * group:0=control,group:0:type=client,group:0:exp=1700000000,group:1=variant,group:1:type=client,group:1:exp=1700000000 etc.
 */
const parseMVTValue = (subfield: string): FastlyTestParams[] => {
	const value = parseFastlySubfield(subfield);
	return AUDIENCE_SPACES.map((_, i) => {
		return {
			name: String(value[`group:${i}`]),
			type: String(value[`group:${i}:type`]),
			exp: Number(value[`group:${i}:exp`]),
		};
	});
};

/**
 * Stringifies an array of FastlyTestParams into a Fastly subfield string.
 * This is specifically for MVT values where each group has its own parameters.
 */
const stringifyMVTValue = (array: FastlyTestParams[]): string => {
	const subfield: Record<string, string> = {};
	array.forEach((item, index) => {
		subfield[`group:${index}`] = item.name;
		subfield[`group:${index}:type`] = item.type;
		subfield[`group:${index}:exp`] = String(item.exp);
	});
	return stringifyFastlySubfield(subfield);
};

export {
	stringifyFastlySubfield,
	parseFastlySubfield,
	parseMVTValue,
	stringifyMVTValue,
};
