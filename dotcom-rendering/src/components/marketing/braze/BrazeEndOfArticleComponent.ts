import type React from 'react';
import type {
	BrazeMessageProps,
	ComponentMapping,
	HasConsolidatedTrackClick,
} from './buildBrazeMessageComponent';
import { buildBrazeMessageComponent } from './buildBrazeMessageComponent';
import {
	COMPONENT_NAME as AU_NEWSLETTER_EPIC_NAME,
	AUNewsletterEpic,
} from './epics/AUNewsletterEpic';
import {
	DownToEarthNewsletterEpic,
	COMPONENT_NAME as DTE_NEWSLETTER_EPIC_NAME,
} from './epics/DownToEarthNewsletterEpic';
import { Epic, COMPONENT_NAME as EPIC_NAME } from './epics/Epic';
import {
	EpicNewsletter_AU_AfternoonUpdate,
	COMPONENT_NAME as EPICNEWSLETTER_AU_AFTERNOONUPDATE_NAME,
} from './epics/EpicNewsletter_AU_AfternoonUpdate';
import {
	EpicNewsletter_TheGuide,
	COMPONENT_NAME as EPICNEWSLETTER_THEGUIDE_NAME,
} from './epics/EpicNewsletter_TheGuide';
import {
	COMPONENT_NAME as EPIC_WITH_HEADER_IMAGE_NAME,
	EpicWithSpecialHeader,
} from './epics/EpicWithSpecialHeader';
import {
	NewsletterEpic,
	COMPONENT_NAME as NEWSLETTEREPIC_NAME,
} from './epics/NewsletterEpic';
import {
	COMPONENT_NAME as UK_NEWSLETTER_EPIC_NAME,
	UKNewsletterEpic,
} from './epics/UKNewsletterEpic';
import {
	COMPONENT_NAME as US_NEWSLETTER_EPIC_NAME,
	USNewsletterEpic,
} from './epics/USNewsletterEpic';
import type { FetchEmail, NewsletterSubscribeCallback } from './types/dcrTypes';
import type { BrazeClickHandler, SubmitComponentEvent } from './utils/tracking';

export type CommonEndOfArticleComponentProps = {
	componentName: string;
	brazeMessageProps: BrazeMessageProps;
	subscribeToNewsletter: NewsletterSubscribeCallback;
	fetchEmail: FetchEmail;
	countryCode?: string;
	logButtonClickWithBraze: BrazeClickHandler;
	submitComponentEvent: SubmitComponentEvent;
};

const END_OF_ARTICLE_MAPPINGS: ComponentMapping<
	CommonEndOfArticleComponentProps & HasConsolidatedTrackClick
> = {
	[EPIC_NAME]: Epic,
	[EPIC_WITH_HEADER_IMAGE_NAME]: EpicWithSpecialHeader,

	// Old name Newsletter Epics
	[US_NEWSLETTER_EPIC_NAME]: USNewsletterEpic,
	[AU_NEWSLETTER_EPIC_NAME]: AUNewsletterEpic,
	[UK_NEWSLETTER_EPIC_NAME]: UKNewsletterEpic,
	[DTE_NEWSLETTER_EPIC_NAME]: DownToEarthNewsletterEpic,

	// New name Newsletter Epics
	[EPICNEWSLETTER_AU_AFTERNOONUPDATE_NAME]: EpicNewsletter_AU_AfternoonUpdate,
	[EPICNEWSLETTER_THEGUIDE_NAME]: EpicNewsletter_TheGuide,
	[NEWSLETTEREPIC_NAME]: NewsletterEpic,
};

export const BrazeEndOfArticleComponent: React.FC<CommonEndOfArticleComponentProps> =
	buildBrazeMessageComponent<CommonEndOfArticleComponentProps>(
		'RETENTION_EPIC',
		END_OF_ARTICLE_MAPPINGS,
	);
