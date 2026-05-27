import { object, Output, string } from 'valibot';

export const feSubNavSchema = object({
	pageId: string(),
});

export type FEFootballSubNav = Output<typeof feSubNavSchema>;
