import { isOneOf } from '@guardian/libs';
import { type InferOutput, literal, union } from 'valibot';

const AmericanTerritoriesSchema = union([
	literal('US-East-Coast'),
	literal('US-West-Coast'),
]);

export type AmericanTerritories = InferOutput<typeof AmericanTerritoriesSchema>;

const EuropeanTerritoriesSchema = literal('EU-27');
export type EuropeanTerritories = InferOutput<typeof EuropeanTerritoriesSchema>;

const australianTerritories = ['AU-VIC', 'AU-QLD', 'AU-NSW'] as const;
export const isAustralianTerritory = isOneOf(australianTerritories);

const AustralianTerritorySchema = union(
	australianTerritories.map((t) => literal(t)),
);
export type AustralianTerritory = InferOutput<typeof AustralianTerritorySchema>;

const NewZealandTerritoriesSchema = literal('NZ');
export type NewZealandTerritories = InferOutput<
	typeof NewZealandTerritoriesSchema
>;

const UnknownTerritoriesSchema = literal('XX');
export type UnknownTerritories = InferOutput<typeof UnknownTerritoriesSchema>;

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

export type Territory = InferOutput<typeof TerritorySchema>;
