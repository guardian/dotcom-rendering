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
						${snapData.embedCss};
					`,
				]}
			>
				{children}
			</div>
		</>
	);
};
