/**
 * Jest mock for islandRegistry.ts which uses import.meta.glob
 * (not supported by Jest/SWC).
 */
export const getIslandModule = (
	// eslint-disable-next-line @typescript-eslint/no-unused-vars -- mock
	_name: string,
): (() => Promise<Record<string, unknown>>) | undefined => {
	return undefined;
};
