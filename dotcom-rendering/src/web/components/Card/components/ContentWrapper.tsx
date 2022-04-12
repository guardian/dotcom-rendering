import { css } from '@emotion/react';

import { until } from '@guardian/source-foundations';

const sizingStyles = css`
	display: flex;
	flex-direction: column;
	justify-content: space-between;
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
	percentage?: CardPercentageType;
};

export const ContentWrapper = ({ children, percentage }: Props) => (
	<div css={[sizingStyles, coverageStyles(percentage)]}>{children}</div>
);
