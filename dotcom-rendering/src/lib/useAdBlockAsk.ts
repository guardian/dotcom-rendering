import { useAB } from './useAB';

const useIsInAdBlockAskVariant = (): boolean => {
	const abTestAPI = useAB()?.api;
	const isInVariant = !!abTestAPI?.isUserInVariant('AdBlockAsk', 'variant');
	return isInVariant;
};

export const useAdblockAsk = (): boolean => {
	const isInVariant = useIsInAdBlockAskVariant();
	// This is just a stub implementation
	// TODO(@chrislomaxjones) Replace with proper ad block detection logic in subsequent PR
	return isInVariant;
};
