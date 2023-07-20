import { css } from '@emotion/react';
import type { DCRSnapType } from '../types/front';

type Props = {
	snapData?: DCRSnapType;
	children?: React.ReactNode;
};

export const SnapCssSandbox = ({ snapData, children }: Props) => {
	if (snapData?.embedHtml === undefined) {
		return <></>;
	}

	return (
		<>
			<div
				css={[
					css`
						/* LIs that contain cards are set to flex,
						   setting this allows the contents to take up
						   all the available space in the LI */
						flex-grow: 1;
						${snapData.embedCss};
					`,
				]}
			>
				{children}
			</div>
		</>
	);
};
