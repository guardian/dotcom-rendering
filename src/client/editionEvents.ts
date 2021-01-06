export enum Platform {
	ios = 'ios',
	android = 'android',
}

export type PlatformMessageEvent = Event & {
	type: 'platform';
	value: Platform;
};
