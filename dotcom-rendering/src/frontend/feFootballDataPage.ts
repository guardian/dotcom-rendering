import type { EditionId } from '../lib/edition';
import type { FooterType } from '../types/footer';
import type { FENavType } from '../types/frontend';
import type { FEFrontConfig } from './feFront';

export type FERound = {
	roundNumber: string;
	name?: string;
};

export type FECompetitionSummary = {
	id: string;
	url: string;
	fullName: string;
	nation: string;
	tableDividers: number[];
};

export type FEFootballCompetition = {
	name: string;
	url: string;
};

export type FESportPageConfig = Omit<
	FEFrontConfig,
	'keywordIds' | 'keywords' | 'isFront'
> & {
	isFront: boolean;
	hasSurveyAd: boolean;
};

export type FEFootballDataPage = {
	nav: FENavType;
	editionId: EditionId;
	guardianBaseURL: string;
	config: FESportPageConfig;
	pageFooter: FooterType;
	isAdFreeUser: boolean;
	canonicalUrl?: string;
	contributionsServiceUrl: string;
	pageId: string;
};
