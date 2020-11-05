// ----- Imports ----- //

import type { SerializedStyles } from '@emotion/core';
import { css } from '@emotion/core';
import { remSpace } from '@guardian/src-foundations';
import { from } from '@guardian/src-foundations/mq';
import type { FC } from 'react';
import React from 'react';
import { wideColumnWidth, wideContentWidth } from 'styles';

// ----- Styles ----- //

const LeftColumnStyles = css`
	padding: ${remSpace[2]};

	${from.phablet} {
		display: flex;
	}

	.column-content {
		${from.phablet} {
			width: 33%;
		}

		${from.leftCol} {
			width: ${wideColumnWidth}px;
		}
	}

	.main-content {
		${from.phablet} {
			width: 67%;
		}

		${from.leftCol} {
			width: ${wideContentWidth}px;
		}
	}
`;

// ----- Props ----- //

interface LeftColumnProps {
	children: React.ReactNode;
	columnContent?: JSX.Element | null;
	className?: SerializedStyles | null;
}

// ----- Component ----- //

const LeftColumn: FC<LeftColumnProps> = ({
	children,
	columnContent = null,
	className = null,
}) => (
	<div css={[LeftColumnStyles, className]}>
		<div className="column-content">{columnContent}</div>
		<div className="main-content">{children}</div>
	</div>
);

export default LeftColumn;
