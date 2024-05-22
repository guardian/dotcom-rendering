import { css } from '@emotion/react';
import {
	from,
	headlineBold17,
	headlineBold20,
	headlineMedium14,
	palette,
	space,
} from '@guardian/source-foundations';
import { SvgArrowRightStraight } from '@guardian/source-react-components';

interface Props {
	sectionLabel: string;
	sectionUrl: string;
	guardianBaseURL: string;
}

const TagLinkStyle = css`
	display: flex;
	flex-direction: row;
	justify-content: space-between;
	align-items: center;
	height: 44px;
	width: 100%;
	padding: ${space[2]}px;
	border-radius: ${space[2]}px;
	text-decoration: none;
	background-color: ${palette.sport[800]};
	color: ${palette.sport[400]};
	fill: ${palette.sport[400]};
	margin-bottom: ${space[2]}px;
	:hover {
		text-decoration: underline;
	}
	${from.leftCol} {
		align-items: start;
		gap: ${space[3]}px;
		height: auto;
		width: auto;
		flex-direction: column;
	}
`;
const labelStyles = css`
	${headlineBold17};
	${from.desktop} {
		${headlineBold20};
	}
`;

const tagButtonStyles = css`
	display: flex;
	align-items: center;
	${headlineMedium14};
	gap: ${space[2]}px;
`;

const arrowStyles = css`
	svg {
		fill: ${palette.sport[800]};
		margin-top: 5px;
		height: 14px;
		width: 14px;
	}
	text-align: center;
	display: inline-block;
	margin-top: ${space[2]}px;
	margin-bottom: ${space[2]}px;
	border-radius: 50%;
	height: 24px;
	width: 24px;
	border: none;
	cursor: pointer;
	transition: background-color 0.2s;
	background-color: ${palette.sport[400]};
	:hover {
		background-color: ${palette.sport[400]};
	}
`;

export const TagLink = ({
	sectionUrl,
	sectionLabel,
	guardianBaseURL,
}: Props) => {
	return (
		<a
			href={`${guardianBaseURL}/${sectionUrl}`}
			css={TagLinkStyle}
			data-component="series"
			data-link-name="article series"
		>
			<div css={labelStyles}>{sectionLabel}</div>
			<div css={tagButtonStyles}>
				<div>Discover More</div>
				<span css={arrowStyles}>
					<SvgArrowRightStraight isAnnouncedByScreenReader={false} />
				</span>
			</div>
		</a>
	);
};
