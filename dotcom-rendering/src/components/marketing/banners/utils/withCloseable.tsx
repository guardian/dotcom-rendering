/**
 * @file
 * This file was migrated from:
 * https://github.com/guardian/support-dotcom-components/blob/0a2439b701586a7a2cc60dce10b4d96cf7a828db/packages/modules/src/modules/banners/hocs/withCloseable.tsx
 */
import type { BannerProps } from '@guardian/support-dotcom-components/dist/shared/types';
import { useState } from 'react';
import { useEscapeShortcut } from '../../hooks/useEscapeShortcut';
import type { ReactComponent } from '../../lib/ReactComponent';
import { setChannelClosedTimestamp } from './localStorage';

export interface CloseableBannerProps extends BannerProps {
	onClose: () => void;
}

const withCloseable = (
	CloseableBanner: ReactComponent<CloseableBannerProps>,
): ReactComponent<BannerProps> => {
	const Banner: ReactComponent<BannerProps> = (bannerProps: BannerProps) => {
		const [isOpen, setIsOpen] = useState(true);

		const onClose = (): void => {
			setChannelClosedTimestamp(bannerProps.bannerChannel);
			setIsOpen(false);
			document.body.focus();
		};

		useEscapeShortcut(onClose);

		return isOpen ? (
			<CloseableBanner onClose={onClose} {...bannerProps} />
		) : (
			<></>
		);
	};
	return Banner;
};

export { withCloseable };
