export interface DCRBadgeType {
	imageSrc: string;
	href: string;
}

export interface FEArticleBadgeType {
	seriesTag: string;
	imageUrl: string;
	enhanced?: DCRBadgeType;
}
