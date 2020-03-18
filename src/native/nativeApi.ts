import { createAppClient } from './thrift/nativeConnection';
import * as Environment from 'bridget-typescript/Environment';
import * as Commercial from 'bridget-typescript/Commercial';
import * as Acquisitions from 'bridget-typescript/Acquistions';
import * as Notifications from 'bridget-typescript/Notifications';
import * as User from 'bridget-typescript/User';
import * as Gallery from 'bridget-typescript/Gallery';

const environmentClient: Environment.Client<void> = createAppClient<Environment.Client>(Environment.Client, 'buffered', 'compact');
const commercialClient: Commercial.Client<void> = createAppClient<Commercial.Client>(Commercial.Client, 'buffered', 'compact');
const acquisitionsClient: Acquisitions.Client<void> = createAppClient<Acquisitions.Client>(Acquisitions.Client, 'buffered', 'compact');
const notificationsClient: Notifications.Client<void> = createAppClient<Notifications.Client>(Notifications.Client, 'buffered', 'compact');
const userClient: User.Client<void> = createAppClient<User.Client>(User.Client, 'buffered', 'compact');
const galleryClient: Gallery.Client<void> = createAppClient<Gallery.Client>(Gallery.Client, 'buffered', 'compact');

export {
    environmentClient,
    commercialClient,
    acquisitionsClient,
    notificationsClient,
    userClient,
    galleryClient
};