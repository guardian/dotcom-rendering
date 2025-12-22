import type { ModuleDataResponse } from '@guardian/support-dotcom-components';
import type {
	BannerPayload,
	EpicPayload,
} from '@guardian/support-dotcom-components/dist/dotcom/types';
import type {
	BannerProps,
	EpicProps,
} from '@guardian/support-dotcom-components/dist/shared/types';
import { getDeviceClass } from '../client/deviceDetection/iPadDetection';

/**
 * Builds the full SDC URL with the endpoint path and deviceClass query parameter.
 * This replaces the SDC library functions which don't support query params on the base URL.
 */
const buildSDCUrl = (baseUrl: string, endpoint: string): string => {
	const deviceClass = getDeviceClass();
	if (deviceClass) {
		return `${baseUrl}/${endpoint}?deviceClass=${deviceClass}`;
	}
	return `${baseUrl}/${endpoint}`;
};

/**
 * Custom SDC fetch that properly appends deviceClass query param.
 * Replaces getEpic from @guardian/support-dotcom-components.
 */
export const getEpicWithDeviceClass = async (
	baseUrl: string,
	payload: EpicPayload,
	headers?: HeadersInit,
): Promise<ModuleDataResponse<EpicProps>> => {
	const url = buildSDCUrl(baseUrl, 'epic');
	const response = await fetch(url, {
		method: 'POST',
		headers: {
			'Content-Type': 'application/json',
			...headers,
		},
		body: JSON.stringify(payload),
	});
	return response.json() as Promise<ModuleDataResponse<EpicProps>>;
};

/**
 * Custom SDC fetch that properly appends deviceClass query param.
 * Replaces getLiveblogEpic from @guardian/support-dotcom-components.
 */
export const getLiveblogEpicWithDeviceClass = async (
	baseUrl: string,
	payload: EpicPayload,
): Promise<ModuleDataResponse<EpicProps>> => {
	const url = buildSDCUrl(baseUrl, 'liveblog-epic');
	const response = await fetch(url, {
		method: 'POST',
		headers: { 'Content-Type': 'application/json' },
		body: JSON.stringify(payload),
	});
	return response.json() as Promise<ModuleDataResponse<EpicProps>>;
};

/**
 * Custom SDC fetch that properly appends deviceClass query param.
 * Replaces getBanner from @guardian/support-dotcom-components.
 */
export const getBannerWithDeviceClass = async (
	baseUrl: string,
	payload: BannerPayload,
): Promise<ModuleDataResponse<BannerProps>> => {
	const url = buildSDCUrl(baseUrl, 'banner');
	const response = await fetch(url, {
		method: 'POST',
		headers: { 'Content-Type': 'application/json' },
		body: JSON.stringify(payload),
	});
	return response.json() as Promise<ModuleDataResponse<BannerProps>>;
};
