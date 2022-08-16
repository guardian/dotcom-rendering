import { enum as enums, object, string } from 'zod';

const editionId = enums(['UK', 'US', 'INT', 'AU']);

const edition = object({
	id: editionId,
	displayName: string(),
	locale: string(),
});

export { edition, editionId };
