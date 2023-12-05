import { css } from '@emotion/react';
import { ArticleDesign } from '@guardian/libs';
import {
	border,
	headline,
	palette as sourcePalette,
} from '@guardian/source-foundations';
import { useHover } from '../lib/useHover';
import { palette as themePalette } from '../palette';
import type { TrailType } from '../types/trails';
import { AgeWarning } from './AgeWarning';
import { Avatar } from './Avatar';
import { FormatBoundary } from './FormatBoundary';
import { LinkHeadline } from './LinkHeadline';

const listItemStyles = css`
	list-style: none;
	/* https://developer.mozilla.org/en-US/docs/Web/CSS/list-style#accessibility_concerns */
	/* Needs double escape char: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Template_literals#es2018_revision_of_illegal_escape_sequences */
	&::before {
		content: '\\200B'; /* Zero width space */
		display: block;
		height: 0;
		width: 0;
	}
	padding-top: 4px;
	margin-bottom: 12px;
	border-top: 1px solid ${border.secondary};

	&:first-of-type {
		padding-top: 0;
		border-top: none;
	}
`;

const linkTagStyles = css`
	text-decoration: none;
	font-weight: 500;
	${headline.xxxsmall()};

	&:link,
	&:active {
		color: ${themePalette('--article-text')};
	}

	&:visited h4 {
		color: ${sourcePalette.neutral[46]};
	}

	&:hover h4 {
		text-decoration: underline;
	}
`;

const lineWrapperStyles = css`
	display: flex;
`;

const headlineWrapperStyles = css`
	width: calc(100% - 82px);
	display: flex;
	flex-direction: column;
`;

const imageWrapperStyles = css`
	width: 72px;
	height: 72px;
	margin-top: 3px;
	margin-right: 10px;
`;

const marginTopStyles = css`
	margin-top: 4px;
`;

type Props = {
	trail: TrailType;
	mostViewedItemIndex: number;
};

export const MostViewedRightItem = ({ trail, mostViewedItemIndex }: Props) => {
	const [hoverRef, isHovered] = useHover<HTMLAnchorElement>();

	return (
		<li
			css={listItemStyles}
			data-link-name={`trail | ${mostViewedItemIndex + 1}`}
		>
			<FormatBoundary format={trail.format}>
				<a css={linkTagStyles} href={trail.url} ref={hoverRef}>
					<div css={lineWrapperStyles}>
						{!!trail.image && (
							<div css={imageWrapperStyles}>
								<Avatar src={trail.image} alt="" />
							</div>
						)}
						<div css={headlineWrapperStyles}>
							{trail.format.design === ArticleDesign.LiveBlog ? (
								<LinkHeadline
									headlineText={trail.headline}
									format={trail.format}
									size="small"
									showUnderline={isHovered}
									kickerText="Live"
									hideLineBreak={true}
									byline={
										trail.showByline
											? trail.byline
											: undefined
									}
								/>
							) : (
								<LinkHeadline
									headlineText={trail.headline}
									format={trail.format}
									size="small"
									showUnderline={isHovered}
									byline={
										trail.showByline
											? trail.byline
											: undefined
									}
								/>
							)}
							<div css={marginTopStyles}>
								{!!trail.ageWarning && (
									<AgeWarning
										age={trail.ageWarning}
										size="small"
									/>
								)}
							</div>
						</div>
					</div>
				</a>
			</FormatBoundary>
		</li>
	);
};
