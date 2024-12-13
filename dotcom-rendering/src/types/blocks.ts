import type { FEElement } from './content';

interface MembershipPlaceholder {
	campaignCode?: string;
}

interface Attributes {
	pinned: boolean;
	summary: boolean;
	keyEvent: boolean;
	membershipPlaceholder?: MembershipPlaceholder;
}

interface BlockContributor {
	name: string;
	imageUrl?: string;
	largeImageUrl?: string;
}

export interface Block {
	id: string;
	elements: FEElement[];
	attributes: Attributes;
	blockCreatedOn?: number;
	blockCreatedOnDisplay?: string;
	blockLastUpdated?: number;
	blockLastUpdatedDisplay?: string;
	title?: string;
	blockFirstPublished?: number;
	blockFirstPublishedDisplay?: string;
	blockFirstPublishedDisplayNoTimezone?: string;
	primaryDateLine: string;
	secondaryDateLine: string;
	createdOn?: number;
	createdOnDisplay?: string;
	lastUpdated?: number;
	lastUpdatedDisplay?: string;
	firstPublished?: number;
	firstPublishedDisplay?: string;
	contributors?: BlockContributor[];
}
