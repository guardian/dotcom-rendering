import * as Acquisitions from '@guardian/bridget/Acquisitions';
import * as Analytics from '@guardian/bridget/Analytics';
import * as Commercial from '@guardian/bridget/Commercial';
import * as Environment from '@guardian/bridget/Environment';
import * as Gallery from '@guardian/bridget/Gallery';
import * as Metrics from '@guardian/bridget/Metrics';
import * as Navigation from '@guardian/bridget/Navigation';
import * as Newsletters from '@guardian/bridget/Newsletters';
import * as Notifications from '@guardian/bridget/Notifications';
// import * as Tag from '@guardian/bridget/Notifications'; // TODO update to TAG
import * as User from '@guardian/bridget/User';
import * as Video from '@guardian/bridget/Videos';
import { createAppClient } from './thrift/nativeConnection';

let environmentClient: Environment.Client<void> | undefined = undefined;
export const getEnvironmentClient = (): Environment.Client<void> => {
	if (environmentClient === undefined) {
		environmentClient = createAppClient<Environment.Client<void>>(
			Environment.Client,
			'buffered',
			'compact',
		);
	}
	return environmentClient;
};

let commercialClient: Commercial.Client<void> | undefined = undefined;
export const getCommercialClient = (): Commercial.Client<void> => {
	if (commercialClient === undefined) {
		commercialClient = createAppClient<Commercial.Client<void>>(
			Commercial.Client,
			'buffered',
			'compact',
		);
	}
	return commercialClient;
};

let acquisitionsClient: Acquisitions.Client<void> | undefined = undefined;
export const getAcquisitionsClient = (): Acquisitions.Client<void> => {
	if (!acquisitionsClient) {
		acquisitionsClient = createAppClient<Acquisitions.Client<void>>(
			Acquisitions.Client,
			'buffered',
			'compact',
		);
	}
	return acquisitionsClient;
};

let notificationsClient: Notifications.Client<void> | undefined = undefined;
export const getNotificationsClient = (): Notifications.Client<void> => {
	if (!notificationsClient) {
		notificationsClient = createAppClient<Notifications.Client<void>>(
			Notifications.Client,
			'buffered',
			'compact',
		);
	}
	return notificationsClient;
};

// TODO use TagService once bridget is updated
let tagClient: Notifications.Client<void> | undefined = undefined;
export const getTagClient = (): Notifications.Client<void> => {
	if (!tagClient) {
		tagClient = createAppClient<Notifications.Client<void>>(
			Notifications.Client,
			'buffered',
			'compact',
		);
	}
	return tagClient;
};

let userClient: User.Client<void> | undefined = undefined;
export const getUserClient = (): User.Client<void> => {
	if (!userClient) {
		userClient = createAppClient<User.Client<void>>(
			User.Client,
			'buffered',
			'compact',
		);
	}
	return userClient;
};
let galleryClient: Gallery.Client<void> | undefined = undefined;
export const getGalleryClient = (): Gallery.Client<void> => {
	if (!galleryClient) {
		galleryClient = createAppClient<Gallery.Client<void>>(
			Gallery.Client,
			'buffered',
			'compact',
		);
	}
	return galleryClient;
};
let videoClient: Video.Client<void> | undefined = undefined;
export const getVideoClient = (): Video.Client<void> => {
	if (!videoClient) {
		videoClient = createAppClient<Video.Client<void>>(
			Video.Client,
			'buffered',
			'compact',
		);
	}
	return videoClient;
};
let metricsClient: Metrics.Client<void> | undefined = undefined;
export const getMetricsClient = (): Metrics.Client<void> => {
	if (!metricsClient) {
		metricsClient = createAppClient<Metrics.Client<void>>(
			Metrics.Client,
			'buffered',
			'compact',
		);
	}
	return metricsClient;
};
let analyticsClient: Analytics.Client<void> | undefined = undefined;
export const getAnalyticsClient = (): Analytics.Client<void> => {
	if (!analyticsClient) {
		analyticsClient = createAppClient<Analytics.Client<void>>(
			Analytics.Client,
			'buffered',
			'compact',
		);
	}
	return analyticsClient;
};

let navigationClient: Navigation.Client<void> | undefined = undefined;
export const getNavigationClient = (): Navigation.Client<void> => {
	if (!navigationClient) {
		navigationClient = createAppClient<Navigation.Client<void>>(
			Navigation.Client,
			'buffered',
			'compact',
		);
	}
	return navigationClient;
};

let newslettersClient: Newsletters.Client<void> | undefined = undefined;
export const getNewslettersClient = (): Newsletters.Client<void> => {
	if (!newslettersClient) {
		newslettersClient = createAppClient<Newsletters.Client<void>>(
			Newsletters.Client,
			'buffered',
			'compact',
		);
	}
	return newslettersClient;
};
