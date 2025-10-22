import { isOneOf } from '@guardian/libs';
import { literal, union, type z } from 'zod';

const AmericanTerritoriesSchema = union([
	literal('US-East-Coast'),
	literal('US-West-Coast'),
]);

const EuropeanTerritoriesSchema = literal('EU-27');

const australianTerritories = ['AU-VIC', 'AU-QLD', 'AU-NSW'] as const;
export const isAustralianTerritory = isOneOf(australianTerritories);

const AustralianTerritorySchema = union(
	australianTerritories.map((t) => literal(t)),
);
export type AustralianTerritory = z.infer<typeof AustralianTerritorySchema>;

const NewZealandTerritoriesSchema = literal('NZ');

const UnknownTerritoriesSchema = literal('XX');

/**
 * List of territories that can be targetted against.
 *
 * @see https://github.com/guardian/facia-scala-client/blob/52562dec5e8518b79ba1c8b95a0cbe9502b9e2e5/facia-json/src/main/scala/com/gu/facia/client/models/Config.scala#L123-L187
 */
export const TerritorySchema = union([
	AmericanTerritoriesSchema,
	EuropeanTerritoriesSchema,
	AustralianTerritorySchema,
	NewZealandTerritoriesSchema,
	UnknownTerritoriesSchema,
]);

export type Territory = z.infer<typeof TerritorySchema>;
