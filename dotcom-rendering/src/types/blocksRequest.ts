import type { BaseRequestBody } from './request';

/**
 * BlocksRequest is the expected body format for POST requests made to /Blocks
 */
export interface FEBlocksRequest extends BaseRequestBody {
	blocks: Block[];
	format: FEFormat;
	host?: string;
	webTitle: string;
	ajaxUrl: string;
	isAdFreeUser: boolean;
	isSensitive: boolean;
	edition: string;
	section: string;
	sharedAdTargeting: Record<string, unknown>;
	adUnit: string;
	videoDuration?: number;
	switches: { [key: string]: boolean };
	keywordIds: string;
}
