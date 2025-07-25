import { AUDIENCE_SPACES } from './constants.ts';
import { FastlyTestParams } from './types.ts';

const stringifyFastlySubfield = (
	obj: Record<string, string | number> | Array<string>,
) =>
	Object.entries(obj)
		.map(([key, value]) => `${key}=${value}`)
		.join(',');

const parseFastlySubfield = <T = Record<string, string | number>>(
	str: string,
): T => {
	const result: Record<string, string | number> = {};
	str.split(',').forEach((pair) => {
		const [key, value] = pair.split('=');
		if (key && value) {
			result[key] = isNaN(Number(value)) ? value : Number(value);
		}
	});
	return result as T;
};

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
