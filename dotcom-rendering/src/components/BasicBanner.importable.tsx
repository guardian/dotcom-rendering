import type { BannerProps } from '@guardian/support-dotcom-components/dist/shared/types';
import { useEffect, useState } from 'react';

export const BasicBanner = (props: BannerProps) => {
	const [BannerComponent, setBannerComponent] =
		useState<React.ElementType<BannerProps>>();

	useEffect(() => {
		import(`./marketing/banners/designableBanner/DesignableBanner`)
			.then((module) => {
				setBannerComponent(() => module.DesignableBanner);
			})
			.catch((err) => {
				const msg = `Error importing DesignableBanner: ${String(err)}`;
				window.guardian.modules.sentry.reportError(
					new Error(msg),
					'rr-gutter-liveblog-dynamic-import',
				);
			});
	}, []);

	if (BannerComponent) {
		return <BannerComponent {...props} />;
	}
	return null;
};
