import { css } from '@emotion/react';

import { neutral, border, text } from '@guardian/src-foundations/palette';
import { headline } from '@guardian/src-foundations/typography';
import { Design } from '@guardian/types';
import { AgeWarning } from '@root/src/web/components/AgeWarning';
import { Avatar } from '@root/src/web/components/Avatar';
import { LinkHeadline } from '@root/src/web/components/LinkHeadline';
import { useHover } from '@root/src/web/lib/useHover';
import { decidePalette } from '@root/src/web/lib/decidePalette';

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
		color: ${text.anchorSecondary};
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
	padding-top: 3px;
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

	const linkProps = {
		to: trail.url,
		visitedColour: neutral[46],
		preventFocus: true,
	};

	return (
		<li
			css={listItemStyles}
			data-link-name={`trail | ${mostViewedItemIndex + 1}`}
		>
			<a css={linkTagStyles} href={trail.url} ref={hoverRef}>
				<div css={lineWrapperStyles}>
					{trail.image && (
						<div css={imageWrapperStyles}>
							<Avatar
								imageSrc={trail.image}
								imageAlt=""
								palette={decidePalette(trail.format)}
							/>
						</div>
					)}
					<div css={headlineWrapperStyles}>
						{trail.format.design === Design.LiveBlog ? (
							<LinkHeadline
								headlineText={trail.headline}
								palette={trail.palette}
								format={trail.format}
								size="small"
								showUnderline={isHovered}
								link={linkProps}
								kickerText="Live"
								showSlash={false}
								byline={
									trail.showByline ? trail.byline : undefined
								}
							/>
						) : (
							<LinkHeadline
								headlineText={trail.headline}
								palette={trail.palette}
								format={trail.format}
								size="small"
								showUnderline={isHovered}
								link={linkProps}
								byline={
									trail.showByline ? trail.byline : undefined
								}
							/>
						)}
						<div css={marginTopStyles}>
							{trail.ageWarning && (
								<AgeWarning
									age={trail.ageWarning}
									size="small"
								/>
							)}
						</div>
					</div>
				</div>
			</a>
		</li>
	);
};
