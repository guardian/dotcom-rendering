import { css } from '@emotion/react';
import { getCookie } from '@guardian/libs';
import { ShadyPie } from './ShadyPie';
import { WhenAdBlockInUse } from './WhenAdBlockInUse';

export const ContributionSlot = ({
	shouldHideReaderRevenue,
	isPaidContent,
}: {
	shouldHideReaderRevenue: boolean;
	isPaidContent: boolean;
}) => {
	const isSignedIn = !!getCookie({ name: 'GU_U', shouldMemoize: true });
	if (isPaidContent || shouldHideReaderRevenue || isSignedIn) return null;

	return (
		<WhenAdBlockInUse>
			<div
				css={css`
					position: sticky;
					top: 0;
				`}
			>
				<ShadyPie />
			</div>
		</WhenAdBlockInUse>
	);
};
