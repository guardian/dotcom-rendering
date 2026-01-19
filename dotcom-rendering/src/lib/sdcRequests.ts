import type {
	BannerPayload,
	BannerProps,
	EpicPayload,
	EpicProps,
	GutterPayload,
	GutterProps,
	HeaderPayload,
	HeaderProps,
} from '@guardian/support-dotcom-components/dist/shared/types';
import type { TestTracking } from '@guardian/support-dotcom-components/dist/shared/types/abTests/shared';
import { getDeviceClass } from '../client/deviceDetection/iPadDetection';

export interface ModuleData<PROPS> {
	name: string;
	props: PROPS;
}

export interface ModuleDataResponse<PROPS> {
	data?: {
		module: ModuleData<PROPS>;
		meta: TestTracking;
	};
}

type ModuleType =
	| 'epic'
	| 'liveblog-epic'
	| 'banner'
	| 'header'
	| 'gutter-liveblog';

const getForcedVariant = (type: ModuleType): string | null => {
	const params = new URLSearchParams(window.location.search);
	return params.get(`force-${type}`);
};

type Payload = EpicPayload | BannerPayload | HeaderPayload | GutterPayload;

const buildSDCUrl = (baseUrl: string, type: ModuleType): string => {
	const deviceClass = getDeviceClass();
	const forcedVariant = getForcedVariant(type);

	const queryParams = new URLSearchParams();
	if (deviceClass) {
		queryParams.set('deviceClass', deviceClass);
	}
	if (forcedVariant) {
		queryParams.set('force', forcedVariant);
	}

	const queryString = queryParams.toString();
	return queryString
		? `${baseUrl}/${type}?${queryString}`
		: `${baseUrl}/${type}`;
};

const getModuleData = <PROPS>(
	type: ModuleType,
	baseUrl: string,
	payload: Payload,
	headers?: HeadersInit,
): Promise<ModuleDataResponse<PROPS>> => {
	const url = buildSDCUrl(baseUrl, type);

	return fetch(url, {
		method: 'post',
		headers: {
			'Content-Type': 'application/json',
			...headers,
		},
		body: JSON.stringify(payload),
	})
		.then((response: Response) => {
			if (!response.ok) {
				throw Error(
					response.statusText ||
						`Supporter Revenue ${type} | Api call returned HTTP status ${response.status}`,
				);
			}
			return response;
		})
		.then((response) => response.json());
};

export const getEpic = (
	baseUrl: string,
	payload: EpicPayload,
	headers?: HeadersInit,
): Promise<ModuleDataResponse<EpicProps>> =>
	getModuleData('epic', baseUrl, payload, headers);

export const getLiveblogEpic = (
	baseUrl: string,
	payload: EpicPayload,
): Promise<ModuleDataResponse<EpicProps>> =>
	getModuleData('liveblog-epic', baseUrl, payload);

export const getBanner = (
	baseUrl: string,
	payload: BannerPayload,
): Promise<ModuleDataResponse<BannerProps>> =>
	getModuleData('banner', baseUrl, payload);

export const getGutterLiveblog = (
	baseUrl: string,
	payload: GutterPayload,
): Promise<ModuleDataResponse<GutterProps>> =>
	getModuleData('gutter-liveblog', baseUrl, payload);

export const getHeader = (
	baseUrl: string,
	payload: HeaderPayload,
): Promise<ModuleDataResponse<HeaderProps>> =>
	getModuleData('header', baseUrl, payload);
