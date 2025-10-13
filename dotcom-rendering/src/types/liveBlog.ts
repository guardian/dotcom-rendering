import { number, object, optional, string, type InferOutput } from "valibot";

export type LiveUpdateType = {
	numNewBlocks: number;
	html: string;
	mostRecentBlockId: string;
};

export const PaginationTypeSchema = object({
	currentPage: number(),
	totalPages: number(),
	newest: optional(string()),
	newer: optional(string()),
	oldest: optional(string()),
	older: optional(string()),
});

export type PaginationType = InferOutput<typeof PaginationTypeSchema>;
