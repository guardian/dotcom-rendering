export type ABTestSwitches = Record<`ab${string}`, boolean>;

export const filterABTestSwitches = (switches: Switches): ABTestSwitches =>
	Object.fromEntries(
		Object.entries(switches).filter(([key]) => key.startsWith('ab')),
	);
