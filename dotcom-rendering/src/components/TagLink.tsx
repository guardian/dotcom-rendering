import { css } from '@emotion/react';
import {
	from,
	headlineBold17,
	headlineBold20,
	headlineMedium14,
	space,
} from '@guardian/source-foundations';
import { SvgArrowRightStraight } from '@guardian/source-react-components';
import { palette } from '../palette';

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
	background-color: ${palette('--tag-link-background')};
	color: ${palette('--tag-link-accent')};
	fill: ${palette('--tag-link-accent')};
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
		margin-right: -1px; // To align with rich link - if we move this feature to production, we should remove this and make rich link align with everything instead.
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
	display: inline-flex;
	align-items: center;
	border: none;
	vertical-align: middle;
	justify-content: center;
	padding: 0;
	width: 24px;
	height: 24px;
	color: ${palette('--tag-link-background')};
	background-color: ${palette('--tag-link-accent')};
	border-radius: 50%;
	svg {
		flex: 0 0 auto;
		display: block;
		fill: currentColor;
		position: relative;
		width: 20px;
		height: auto;
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

				<div css={arrowStyles}>
					<SvgArrowRightStraight />
				</div>
			</div>
		</a>
	);
};
