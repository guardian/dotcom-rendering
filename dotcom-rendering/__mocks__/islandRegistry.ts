/**
 * Jest mock for islandRegistry.ts which uses import.meta.glob
 * (not supported by Jest/SWC).
 */
export const getIslandModule = (
	_name: string,
): (() => Promise<Record<string, unknown>>) | undefined => {
	return undefined;
};
