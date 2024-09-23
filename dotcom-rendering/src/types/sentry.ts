export type ReportError = (
	error: Error,
	feature: string,
	tags?: {
		[key: string]: string;
	},
) => void;
