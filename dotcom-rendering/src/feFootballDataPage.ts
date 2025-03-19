import { FEFrontConfig } from './frontend/feFront';
import { EditionId } from './lib/edition';
import { FooterType } from './types/footer';
import { FENavType } from './types/frontend';

export type FERound = {
	roundNumber: string;
	name?: string;
};

export type FEFootballCompetition = {
	name: string;
	url: string;
};

export type FEFootballPageConfig = Omit<
	FEFrontConfig,
	'keywordIds' | 'keywords' | 'isFront'
> & {
	isFront: boolean;
	hasSurveyAd: boolean;
};

export type FEFootballDataPage = {
	nextPage?: string;
	previousPage?: string;
	filters: Record<string, FEFootballCompetition[]>;
	nav: FENavType;
	editionId: EditionId;
	guardianBaseURL: string;
	config: FEFootballPageConfig;
	pageFooter: FooterType;
	isAdFreeUser: boolean;
	canonicalUrl?: string;
	contributionsServiceUrl: string;
};
