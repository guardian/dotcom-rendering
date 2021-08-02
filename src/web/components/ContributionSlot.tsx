import { css } from '@emotion/react';

export const ContributionSlot = () => {
	return (
		<div
			css={css`
				position: sticky;
				top: 0;
			`}
		>
			<a href="https://support.theguardian.com/uk/subscribe/digital?acquisitionData=%7B%22componentType%22%3A%22ACQUISITIONS_OTHER%22%2C%22source%22%3A%22GUARDIAN_WEB%22%2C%22campaignCode%22%3A%22shady_pie_open_2019%22%2C%22componentId%22%3A%22shady_pie_open_2019%22%7D&INTCMP=shady_pie_open_2019">
				<img
					src="https://uploads.guim.co.uk/2020/10/02/Digisubs_MPU_c1_my_opt.png"
					width="300"
					alt=""
				/>
			</a>
		</div>
	);
};
