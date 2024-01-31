export interface DCRBadgeType {
	imageSrc: string;
	/** Link to an external sponsor page */
	href: string;
}

export interface FEArticleBadgeType {
	seriesTag: string;
	imageUrl: string;
	enhanced?: DCRBadgeType;
}
