import { css } from '@emotion/react';
import { textSans, until } from '@guardian/source-foundations';
import { palette } from '../palette';

const datelineStyles = css`
	${textSans.xxsmall()};
	color: ${palette('--dateline')};
	padding-top: 2px;
	margin-bottom: 6px;

	${until.desktop} {
		color: ${palette('--standfirst-text')};
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
	format: ArticleFormat;
};

export const Dateline = ({
	primaryDateline,
	secondaryDateline,
	format,
}: Props) => {
	if (secondaryDateline && !secondaryDateline.includes(primaryDateline)) {
		return (
			<details css={[datelineStyles]}>
				<summary css={primaryStyles}>
					<span css={hoverUnderline}>{primaryDateline}</span>
				</summary>
				{secondaryDateline}
			</details>
		);
	}
	return <div css={[datelineStyles]}>{primaryDateline}</div>;
};
