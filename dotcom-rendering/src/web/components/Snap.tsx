import { css } from '@emotion/react';
import type { DCRSnapType } from '../../types/front';

const snapStyles = css`
	overflow-y: hidden;
	position: relative;
	display: flex;
`;

type Props = {
	snapData?: DCRSnapType;
};

export const Snap = ({ snapData }: Props) => {
	if (snapData?.embedHtml === undefined) {
		return <></>;
	}

	return (
		<div
			css={[
				snapStyles,
				css`
					${snapData.embedCss}
				`,
			]}
			dangerouslySetInnerHTML={{ __html: snapData.embedHtml }}
		/>
	);
};
