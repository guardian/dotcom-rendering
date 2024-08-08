import { css } from '@emotion/react';
import { ArticleDesign, type ArticleFormat } from '@guardian/libs';
import {
	from,
	headlineBold17,
	headlineBold20,
	headlineMedium14,
	space,
} from '@guardian/source/foundations';
import { SvgArrowRightStraight } from '@guardian/source/react-components';
import { palette } from '../palette';

interface Props {
	sectionUrl: string;
	sectionLabel: string;
	guardianBaseURL: string;
	format: ArticleFormat;
}

const containerStyles = css`
	margin-bottom: ${space[2]}px;
	margin-right: -1px; /* To align with rich link - if we move this feature to production, we should remove this and make rich link align with everything instead */
`;

const tagLinkStyles = css`
	display: flex;
	flex-direction: row;
	justify-content: space-between;
	align-items: center;
	gap: ${space[1]}px;
	height: 44px;
	width: 100%;
	padding: ${space[2]}px;
	border-radius: 0 0 ${space[2]}px ${space[2]}px;
	text-decoration: none;
	background-color: ${palette('--tag-link-background')};
	color: ${palette('--tag-link-accent')};
	fill: ${palette('--tag-link-accent')};
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

const desktopTabStyles = css`
	${from.desktop} {
		align-items: start;
		gap: ${space[3]}px;
		height: auto;
		width: auto;
		flex-direction: column;
		margin-right: -1px;
	}
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

const fillBarStyles = css`
	background-color: ${palette('--tag-link-fill-background')};
	width: 100%;
	margin-top: -1px;
	margin-bottom: -1px;

	height: 6px;
	${from.desktop} {
		height: 10px;
	}
`;

export const TagLink = ({
	sectionUrl,
	sectionLabel,
	guardianBaseURL,
	format,
}: Props) => {
	const isBlog =
		format.design === ArticleDesign.LiveBlog ||
		format.design === ArticleDesign.DeadBlog;

	return (
		<div css={[containerStyles]}>
			<div css={fillBarStyles} />
			<a
				href={`${guardianBaseURL}/${sectionUrl}`}
				css={[tagLinkStyles, isBlog && desktopTabStyles]}
				data-component="big-event-series"
				data-link-name="article series"
			>
				<div css={labelStyles}>{sectionLabel}</div>
				<div css={tagButtonStyles}>
					<div>Discover more</div>

					<div css={arrowStyles}>
						<SvgArrowRightStraight />
					</div>
				</div>
			</a>
		</div>
	);
};
