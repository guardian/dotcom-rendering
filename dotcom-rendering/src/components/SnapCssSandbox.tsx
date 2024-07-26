import { css } from '@emotion/react';
import { isUndefined } from '@guardian/libs';
import type { DCRSnapType } from '../types/front';

type Props = {
	snapData?: DCRSnapType;
	children?: React.ReactNode;
};

export const SnapCssSandbox = ({ snapData, children }: Props) => {
	if (isUndefined(snapData?.embedHtml)) {
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
