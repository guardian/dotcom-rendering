/* eslint-disable import/no-default-export -- it's how storybook imports them */

declare module '*.mp3' {
	const src: string;
	export default src;
}
