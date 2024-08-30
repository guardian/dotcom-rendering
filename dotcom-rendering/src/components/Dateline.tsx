import { css } from '@emotion/react';
import { textSans12, until } from '@guardian/source/foundations';
import { palette } from '../palette';
import { useConfig } from './ConfigContext';

const datelineStyles = css`
	${textSans12};
	color: ${palette('--dateline')};
	padding-top: 2px;
	margin-bottom: 6px;
`;

const appsStyles = css`
	${until.desktop} {
		color: ${palette('--dateline-apps-mobile')};
	}
`;

const primaryStyles = css`
	list-style: none;
	cursor: pointer;
	&::-webkit-details-marker {
		display: none;
	}
`;

const hoverUnderline = css`
	:hover {
		text-decoration: underline;
	}
`;

// At the moment the 'First published on' / 'Last modified on' is passed through on
// the secondaryDateline (this will be refactored). The current logic checks if the primary
// date is in the secondary to avoid duplicate dates being shown
type Props = {
	primaryDateline: string;
	secondaryDateline: string;
};

export const Dateline = ({ primaryDateline, secondaryDateline }: Props) => {
	const { renderingTarget } = useConfig();
	const isApps = renderingTarget === 'Apps';

	if (secondaryDateline && !secondaryDateline.includes(primaryDateline)) {
		return (
			<details css={[datelineStyles, isApps ? appsStyles : undefined]}>
				<summary css={primaryStyles}>
					<span css={hoverUnderline}>{primaryDateline}</span>
				</summary>
				{secondaryDateline}
			</details>
		);
	}
	return (
		<div css={[datelineStyles, isApps ? appsStyles : undefined]}>
			{primaryDateline}
		</div>
	);
};
