import { getCookie, storage } from '@guardian/libs';
import type {
	AuxiaGateDisplayData,
	AuxiaGateReaderPersonalData,
	AuxiaProxyGetTreatmentsPayload,
	AuxiaProxyGetTreatmentsResponse,
	ShowGateValues,
} from '../components/SignInGate/types';
import type { TagType } from '../types/tag';
import { hasCmpConsentForBrowserId } from './contributions';
import { getDailyArticleCount, getToday } from './dailyArticleCount';
import type { EditionId } from './edition';
import { getLocaleCode } from './getCountryCode';

const decideIsSupporter = (): boolean => {
	// Conservative default until we use the higher-level helper that needs auth state.
	return true;
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
	);

	if (response.status && response.data) {
		return {
			browserId: readerPersonalData.browserId,
			auxiaData: response.data,
		} as AuxiaGateDisplayData;
	}
	return undefined;
};
