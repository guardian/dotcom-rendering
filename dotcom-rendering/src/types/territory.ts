import { isOneOf } from '@guardian/libs';

type AmericanTerritories = 'US-East-Coast' | 'US-West-Coast';

type EuropeanTerritories = 'EU-27';

const australianTerritories = ['AU-VIC', 'AU-QLD', 'AU-NSW'] as const;
export const isAustralianTerritory = isOneOf(australianTerritories);
export type AustralianTerritory = (typeof australianTerritories)[number];

type NewZealandTerritories = 'NZ';

type UnknownTerritories = 'XX';

/**
 * List of territories that can be targetted against.
 *
 * @see https://github.com/guardian/facia-scala-client/blob/52562dec5e8518b79ba1c8b95a0cbe9502b9e2e5/facia-json/src/main/scala/com/gu/facia/client/models/Config.scala#L123-L187
 */
export type Territory =
	| AmericanTerritories
	| EuropeanTerritories
	| AustralianTerritory
	| NewZealandTerritories
	| UnknownTerritories;
