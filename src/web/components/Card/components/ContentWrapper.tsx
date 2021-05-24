import { css } from '@emotion/react';

import { from, until } from '@guardian/src-foundations/mq';
import { space } from '@guardian/src-foundations';

const sizingStyles = css`
	display: flex;
	flex-direction: column;
	justify-content: space-between;
`;

const fullCardImageStyles = css`
	flex-direction: row;
	flex-grow: 0;
	width: 100%;
	position: absolute;
	bottom: 0;
	align-content: flex-end;
	margin-left: ${space[1]}px;
	margin-bottom: 0px;
	max-height: fit-content;
	margin-top: -21px;
	${from.desktop} {
		margin-top: -23px;
	}
`;

const coverageStyles = (percentage?: string) => {
	return percentage
		? css`
				flex-basis: ${percentage};
				${until.tablet} {
					flex-basis: unset;
				}
		  `
		: css`
				flex-grow: 1;
		  `;
};

type Props = {
	children: React.ReactNode;
	isFullCardImage?: boolean;
	percentage?: CardPercentageType;
};

export const ContentWrapper = ({
	children,
	percentage,
	isFullCardImage,
}: Props) => (
	<div
		css={[
			sizingStyles,
			coverageStyles(percentage),
			isFullCardImage && fullCardImageStyles,
		]}
	>
		{children}
	</div>
);
