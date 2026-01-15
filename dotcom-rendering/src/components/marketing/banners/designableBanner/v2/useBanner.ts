import { useContext } from 'react';
import { BannerContext, type BannerContextType } from './BannerContext';

export const useBanner = (): BannerContextType => {
	const context = useContext(BannerContext);
	if (!context) {
		throw new Error(
			'Banner sub-components must be rendered within a <Banner /> provider',
		);
	}
	return context;
};
