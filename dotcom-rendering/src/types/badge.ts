export interface DCRBadgeType {
	imageSrc: string;
	/** Href can be an internal path including a series tag or a link to an external sponsor page */
	href: string;
}

export interface FEBadgeType {
	seriesTag: string;
	imageSrc: string;
}

export interface FESpecialBadgeType {
	salt: string;
	hashedTag: string;
	imageSrc: string;
}

export interface FEArticleBadgeType {
	seriesTag: string;
	imageUrl: string;
	enhanced?: DCRBadgeType;
}
