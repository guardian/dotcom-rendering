import { getCookie, storage } from '@guardian/libs';
import type {
	AuxiaGateDisplayData,
	AuxiaGateReaderPersonalData,
	AuxiaProxyGetTreatmentsPayload,
	AuxiaProxyGetTreatmentsResponse,
	ShowGateValues,
} from '../components/SignInGate/types';
import type { TagType } from '../types/tag';
import {
	hasCmpConsentForBrowserId,
	shouldHideSupportMessaging,
} from './contributions';
import { getDailyArticleCount, getToday } from './dailyArticleCount';
import type { EditionId } from './edition';
import { getLocaleCode } from './getCountryCode';

const decideIsSupporter = (): boolean => {
	// nb: We will not be calling the Auxia API if the user is signed in, so we can set isSignedIn to false.
	const isSignedIn = false;
	const isSupporter = shouldHideSupportMessaging(isSignedIn);
	if (isSupporter === 'Pending') {
		return true;
	}
	return isSupporter;
};

const decideDailyArticleCount = (): number => {
	const value = getDailyArticleCount();
	if (value === undefined) {
		return 0;
	}
	const today = getToday();
	for (const daily of value) {
		if (daily.day === today) {
			return daily.count;
		}
	}
	return 0;
};

const decideAuxiaProxyReaderPersonalData =
	async (): Promise<AuxiaGateReaderPersonalData> => {
		const browserId =
			getCookie({ name: 'bwid', shouldMemoize: true }) ?? undefined;
		const dailyArticleCount = decideDailyArticleCount();
		const hasConsented = await hasCmpConsentForBrowserId();
		const isSupporter = decideIsSupporter();
		const countryCode = (await getLocaleCode()) ?? '';
		const mvtId_str: string =
			getCookie({ name: 'GU_mvt_id', shouldMemoize: true }) ?? '0';
		const mvtId: number = parseInt(mvtId_str);
		return {
			browserId,
			dailyArticleCount,
			isSupporter,
			countryCode,
			mvtId,
			hasConsented,
		};
	};

const fetchProxyGetTreatments = async (
	contributionsServiceUrl: string,
	pageId: string,
	browserId: string | undefined,
	isSupporter: boolean,
	dailyArticleCount: number,
	editionId: EditionId,
	contentType: string,
	sectionId: string,
	tagIds: string[],
	gateDismissCount: number,
	countryCode: string,
	mvtId: number,
	hasConsented: boolean,
	shouldServeDismissible: boolean,
	showDefaultGate: ShowGateValues,
	gateDisplayCount: number,
	hideSupportMessagingTimestamp: number | undefined,
): Promise<AuxiaProxyGetTreatmentsResponse> => {
	const articleIdentifier = `www.theguardian.com/${pageId}`;
	const url = `${contributionsServiceUrl}/auxia/get-treatments`;
	const headers = { 'Content-Type': 'application/json' };
	const payload: AuxiaProxyGetTreatmentsPayload = {
		browserId,
		isSupporter,
		dailyArticleCount,
		articleIdentifier,
		editionId,
		contentType,
		sectionId,
		tagIds,
		gateDismissCount,
		countryCode,
		mvtId,
		should_show_legacy_gate_tmp: false,
		hasConsented,
		shouldServeDismissible,
		showDefaultGate,
		gateDisplayCount,
		hideSupportMessagingTimestamp,
	};

	const params = { method: 'POST', headers, body: JSON.stringify(payload) };
	const response_raw = await fetch(url, params);
	const response =
		(await response_raw.json()) as AuxiaProxyGetTreatmentsResponse;
	return response;
};

const decideShouldServeDismissible = (): boolean => {
	const params = new URLSearchParams(window.location.search);
	const value: string | null = params.get('utm_source');
	return value === 'newsshowcase';
};

const decideShowDefaultGate = (): ShowGateValues => {
	const params = new URLSearchParams(window.location.search);
	const value: string | null = params.get('showgate');

	if (value === null) return undefined;
	const validValues = ['true', 'dismissible', 'mandatory'];
	if (validValues.includes(value)) return value as ShowGateValues;
	return undefined;
};

const getGateDisplayCount = (): number => {
	const count = parseInt(
		storage.local.getRaw('gate_display_count') ?? '0',
		10,
	);
	if (Number.isInteger(count)) return count;
	return 0;
};

const decideHideSupportMessagingTimestamp = (): number | undefined => {
	// Date: 1 September 2025
	//
	// This cookie is overloaded in the following way:
	// If the user has performed single contribution, then the value is the
	// timestamp of the event. But if the user has performed a recurring
	// contribution, then the value is a future timestamp.
	//
	// Ideally we would correct the semantics of the cookie, but for the moment
	// we are simply going to ignore the value if it's in the future. We
	// are making this adjustment here, but will also mirror it in SDC

	const rawValue: string | null = storage.local.getRaw(
		'gu_hide_support_messaging',
	);
	if (rawValue === null) {
		return undefined;
	}
	const timestamp = parseInt(rawValue, 10);
	const now = Date.now(); // current time in milliseconds since epoch
	if (Number.isInteger(timestamp) && timestamp < now) {
		return timestamp;
	}
	return undefined;
};

export const buildAuxiaGateDisplayData = async (
	contributionsServiceUrl: string,
	pageId: string,
	editionId: EditionId,
	contentType: string,
	sectionId: string,
	tags: TagType[],
	gateDismissCount: number,
): Promise<AuxiaGateDisplayData | undefined> => {
	const readerPersonalData = await decideAuxiaProxyReaderPersonalData();
	const tagIds = tags.map((tag) => tag.id);
	const shouldServeDismissible = decideShouldServeDismissible();
	const showDefaultGate = decideShowDefaultGate();
	const gateDisplayCount = getGateDisplayCount();

	const hideSupportMessagingTimestamp = decideHideSupportMessagingTimestamp();

	const response = await fetchProxyGetTreatments(
		contributionsServiceUrl,
		pageId,
		readerPersonalData.browserId,
		readerPersonalData.isSupporter,
		readerPersonalData.dailyArticleCount,
		editionId,
		contentType,
		sectionId,
		tagIds,
		gateDismissCount,
		readerPersonalData.countryCode,
		readerPersonalData.mvtId,
		readerPersonalData.hasConsented,
		shouldServeDismissible,
		showDefaultGate,
		gateDisplayCount,
		hideSupportMessagingTimestamp,
	);

	if (response.status && response.data) {
		return {
			browserId: readerPersonalData.browserId,
			auxiaData: response.data,
		} as AuxiaGateDisplayData;
	}
	return undefined;
};
