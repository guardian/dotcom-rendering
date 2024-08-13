import React, { useState } from 'react';
import { setChannelClosedTimestamp } from './localStorage';
import { useEscapeShortcut } from '../../hooks/useEscapeShortcut';
import { BannerProps } from '@guardian/support-dotcom-components/dist/shared/src/types';
import { ReactComponent } from '../../lib/ReactComponent';

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

		useEscapeShortcut(onClose, []);

		return isOpen ? (
			<CloseableBanner onClose={onClose} {...bannerProps} />
		) : (
			<></>
		);
	};
	return Banner;
};

export default withCloseable;
