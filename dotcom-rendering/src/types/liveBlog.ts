export type LiveUpdateType = {
	numNewBlocks: number;
	html: string;
	mostRecentBlockId: string;
};

export interface PaginationType {
	currentPage: number;
	totalPages: number;
	newest?: string;
	newer?: string;
	oldest?: string;
	older?: string;
}
