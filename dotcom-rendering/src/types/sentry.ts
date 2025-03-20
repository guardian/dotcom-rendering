export type ReportError = (
	error: Error,
	feature: string,
	tags?: Record<string, string>,
	extra?: Record<string, string | Record<string, string>>,
) => void;
