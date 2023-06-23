import { css } from '@emotion/react';
import type { DCRSnapType } from '../types/front';

type Props = {
	snapData?: DCRSnapType;
	children?: React.ReactNode;
};

const snapCssSandboxStyles = css`
	width: 100%;
`;

export const SnapCssSandbox = ({ snapData, children }: Props) => {
	if (snapData?.embedHtml === undefined) {
		return <></>;
	}

	return (
		<>
			<div css={[snapCssSandboxStyles, css(snapData.embedCss)]}>
				{children}
			</div>
		</>
	);
};
