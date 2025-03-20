export type ReportError = (
	error: Error,
	feature: string,
	tags?: Record<string, string>,
	context?: Record<string, Record<string, unknown>>,
) => void;
