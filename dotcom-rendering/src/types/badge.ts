export interface DCRBadgeType {
	imageSrc: string;
	/** Href can a link to an external sponsor page */
	href: string;
}

export interface FEArticleBadgeType {
	seriesTag: string;
	imageUrl: string;
	enhanced?: DCRBadgeType;
}
