const isEntry = (
	tuple: [string | number, string | number],
): tuple is [string, number] =>
	typeof tuple[0] === 'string' && typeof tuple[1] === 'number';

/**
 * TypeScript enums have values both as keys and values, so this
 * method filters out keys that are created from values.
 *
 * @example
 * enumEntries(ArticlePillar);
 * [
 * 	["News", 0],
 * 	["Opinion", 1],
 * 	["Sport", 2],
 * 	["Culture", 3],
 * 	["Lifestyle",4]
 * ]
 *
 * // Compare with :
 * Object.entries(ArticlePillar);
 * [
 * 	["0", "News"],
 * 	["1", "Opinion"],
 * 	["2", "Sport"],
 * 	["3", "Culture"],
 * 	["4", "Lifestyle"],
 * 	["News", 0],
 * 	["Opinion", 1],
 * 	["Sport", 2],
 * 	["Culture", 3],
 * 	["Lifestyle",4]
 * ];
 *
 * @see https://www.typescriptlang.org/play?#code/KYOwrgtgBAggTgFwJYGMA2wAKS1oIZxQDeAsAFBSVQBywA7gM5QC8UADADTlVQDyADkhBIA9iBZQAjFwpUAyvxGIJAJhk8AwmDQIwcYBIDM6qgBkkAM2AMEATwwSALDIC+5cijEMRGAHRoRAHMACl4AIwArYBQEX1AEOCRrYPhkdCwcfDgASmyAbnIAegAqcgBtbioygCI2ao4oatpGaoBdE0oayXrGgSFREDaOqBqVHuqFJQQhys7qw3GtHT1gGdk5x3HzKxt7VfbZkab6Bh62A-WjvuExHskLnhrJxB6VB6rqpd19HsN3ue21jsGHqjla5FaUHIxUKQA
 */
export const enumEntries = <T extends Record<string | number, string | number>>(
	record: T,
): Array<[keyof T, number]> => Object.entries(record).filter(isEntry);
