export type PlatformMessageEvent = MessageEvent & {
	data: {
		type: 'platform';
		value: string;
	};
};