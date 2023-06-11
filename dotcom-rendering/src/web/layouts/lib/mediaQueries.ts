import { Breakpoint, from } from '@guardian/source-foundations';
import type { BreakpointMap } from '@guardian/source-foundations/cjs/mq/mq';

type NewBreakpointMap = Omit<BreakpointMap, 'leftCol' | 'wide'>;

type Entries<T> = {
	[K in keyof T]: [K, T[K]];
}[keyof T][];

const remap = (map: BreakpointMap, hasPageSkin: boolean): NewBreakpointMap => {
	if (!hasPageSkin) return map;
	const newMap = Object.fromEntries(
		(Object.entries(map) as Entries<BreakpointMap>).filter(
			([key]) => key !== 'leftCol' && key !== 'wide',
		),
	);
	return newMap;
};
