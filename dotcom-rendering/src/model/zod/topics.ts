import { enum as enums, number, object, string } from 'zod';

const topicTypeSchema = enums([
	'ORG',
	'PRODUCT',
	'PERSON',
	'GPE',
	'WORK_OF_ART',
	'LOC',
]);

export const topicSchema = object({
	type: topicTypeSchema,
	value: string(),
	count: number().optional(),
});
