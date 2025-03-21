export type ReportError = (
	error: Error,
	feature: string,
	tags?: Record<string, string>,
	extras?: Record<string, unknown>,
) => void;
