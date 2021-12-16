import { css } from '@emotion/react';
import { getCookie } from '@guardian/libs';
import { WhenAdBlockInUse } from '@frontend/web/components/WhenAdBlockInUse';

const params = new URLSearchParams();
params.set(
	'acquisitionData',
	JSON.stringify({
		componentType: 'ACQUISITIONS_OTHER',
		source: 'GUARDIAN_WEB',
		campaignCode: 'shady_pie_open_2019',
		componentId: 'shady_pie_open_2019',
	}),
);
params.set('INTCMP', 'shady_pie_open_2019');

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
				<a
					href={`https://support.theguardian.com/uk/subscribe/digital?${params.toString()}`}
				>
					<img
						src="https://uploads.guim.co.uk/2020/10/02/Digisubs_MPU_c1_my_opt.png"
						width="300"
						alt=""
					/>
				</a>
			</div>
		</WhenAdBlockInUse>
	);
};
