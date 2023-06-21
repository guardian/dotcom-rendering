import { css } from '@emotion/react';
import type { DCRSnapType } from '../types/front';

const snapStyles = css`
	overflow: hidden;
	position: relative;
	display: flex;
`;

type Props = {
	snapData?: DCRSnapType;
	dataLinkName?: string;
};

export const Snap = ({ snapData, dataLinkName }: Props) => {
	if (snapData?.embedHtml === undefined) {
		return <></>;
	}

	return (
		<>
			<div
				css={[snapStyles]}
				dangerouslySetInnerHTML={{ __html: snapData.embedHtml }}
				data-link-name={dataLinkName}
			/>
			{snapData.embedJs ? (
				<div>
					<script
						dangerouslySetInnerHTML={{ __html: snapData.embedJs }}
					/>
				</div>
			) : undefined}
		</>
	);
};
