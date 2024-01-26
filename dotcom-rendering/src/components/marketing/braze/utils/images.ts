import { isDevelopment } from './env';

const ALLOWED_HOSTS = ['https://media.guim.co.uk/', 'https://i.guim.co.uk/'];
const ALLOWED_DEV_HOSTS = [
	...ALLOWED_HOSTS,
	'https://s3-eu-west-1.amazonaws.com/',
];

export const isImageUrlAllowed = (imageUrl: string): boolean => {
	const allowedHosts = isDevelopment() ? ALLOWED_DEV_HOSTS : ALLOWED_HOSTS;
	return allowedHosts.some((host) => imageUrl.startsWith(host));
};
