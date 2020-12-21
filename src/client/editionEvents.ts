type Platform = 'ios' | 'android';

export type PlatformMessageEvent = {
	type: 'platform';
	value: Platform;
};
