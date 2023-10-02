import * as Acquisitions from '@guardian/bridget/Acquisitions';
import * as Analytics from '@guardian/bridget/Analytics';
import * as Commercial from '@guardian/bridget/Commercial';
import * as Environment from '@guardian/bridget/Environment';
import * as Gallery from '@guardian/bridget/Gallery';
import * as Navigation from '@guardian/bridget/Navigation';
import * as Newsletters from '@guardian/bridget/Newsletters';
import * as Notifications from '@guardian/bridget/Notifications';
import * as Tag from '@guardian/bridget/Tag';
import * as User from '@guardian/bridget/User';
import * as Video from '@guardian/bridget/Videos';
import { createAppClient } from './thrift/nativeConnection';

const environmentClient: Environment.Client<void> = createAppClient<
	Environment.Client<void>
>(Environment.Client, 'buffered', 'compact');
const commercialClient: Commercial.Client<void> = createAppClient<
	Commercial.Client<void>
>(Commercial.Client, 'buffered', 'compact');
const acquisitionsClient: Acquisitions.Client<void> = createAppClient<
	Acquisitions.Client<void>
>(Acquisitions.Client, 'buffered', 'compact');

const tagClient: Tag.Client<void> = createAppClient<Tag.Client<void>>(
	Tag.Client,
	'buffered',
	'compact',
);

const notificationsClient: Notifications.Client<void> = createAppClient<
	Notifications.Client<void>
>(Notifications.Client, 'buffered', 'compact');
const userClient: User.Client<void> = createAppClient<User.Client<void>>(
	User.Client,
	'buffered',
	'compact',
);
const galleryClient: Gallery.Client<void> = createAppClient<
	Gallery.Client<void>
>(Gallery.Client, 'buffered', 'compact');
const videoClient: Video.Client<void> = createAppClient<Video.Client<void>>(
	Video.Client,
	'buffered',
	'compact',
);

const analyticsClient: Analytics.Client<void> = createAppClient<
	Analytics.Client<void>
>(Analytics.Client, 'buffered', 'compact');

const navigationClient: Navigation.Client<void> = createAppClient<
	Navigation.Client<void>
>(Navigation.Client, 'buffered', 'compact');

const newslettersClient: Newsletters.Client<void> = createAppClient<
	Newsletters.Client<void>
>(Newsletters.Client, 'buffered', 'compact');

export {
	environmentClient,
	commercialClient,
	acquisitionsClient,
	notificationsClient,
	tagClient,
	userClient,
	galleryClient,
	videoClient,
	analyticsClient,
	navigationClient,
	newslettersClient,
};
