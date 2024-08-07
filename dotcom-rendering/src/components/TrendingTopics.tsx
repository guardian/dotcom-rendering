import { css } from '@emotion/react';
import { textSans12, textSans14 } from '@guardian/source/foundations';
import { StraightLines } from '@guardian/source-development-kitchen/react-components';
import { palette } from '../palette';
import type { FETagType } from '../types/tag';

type Props = {
	trendingTopics: FETagType[] | undefined;
};

const linkStyle = css`
	${textSans14};
	border: 1px solid ${palette('--trending-topics-text')};
	border-radius: 12px;
	padding: 2px 9px;
	display: inline-block;
	${textSans14};
	/**
	 * Typography preset styles should not be overridden.
	 * This has been done because the styles do not directly map to the new presets.
	 * Please speak to your team's designer and update this to use a more appropriate preset.
	 */
	line-height: 1.4;
	text-decoration: none;
	top: 0;
	color: ${palette('--trending-topics-text')};
`;

const topicLabel = css`
	${textSans12};
	color: ${palette('--trending-topics-text')};
`;

const trendingTopicContainer = css`
	padding-top: 30px;
	padding-bottom: 20px;
`;
const listStyleNone = css`
	list-style: none;
	/* https://developer.mozilla.org/en-US/docs/Web/CSS/list-style#accessibility_concerns */
	/* Needs double escape char: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Template_literals#es2018_revision_of_illegal_escape_sequences */
	li::before {
		content: '\\200B'; /* Zero width space */
		display: block;
		height: 0;
		width: 0;
	}
	display: flex;
	flex-wrap: wrap;
	gap: 1.5rem 0.25rem;
	/*
	 to show a repeading dotted line
	 we create a 1px horizontal slit
	 through which we show a repeating pattern
	*/
	background-image: repeating-linear-gradient(
			to bottom,
			${palette('--trending-topics-background')} 0px,
			${palette('--trending-topics-background')} 36px,
			transparent 36px,
			transparent 37px,
			${palette('--trending-topics-background')} 37px,
			${palette('--trending-topics-background')} 48px
		),
		repeating-linear-gradient(
			to right,
			${palette('--trending-topics-separator')} 0px,
			${palette('--trending-topics-separator')} 3px,
			transparent 3px,
			transparent 5px
		);
	background-position: top;
	background-repeat: no-repeat;
	margin-top: 8px;
`;

export const TrendingTopics = ({ trendingTopics }: Props) => {
	return (
		<div css={trendingTopicContainer} data-link-name="keywords">
			<StraightLines
				cssOverrides={css`
					display: block;
				`}
				color={palette('--straight-lines')}
				count={4}
			/>
			<div css={topicLabel}>Explore more on these topics</div>
			{/* TODO: Add allpath link */}

			<ul css={listStyleNone}>
				{trendingTopics?.slice(0, 5).map((tag) => {
					const section = trendingTopics
						.filter((existingTag) => existingTag !== tag)
						.find(
							(existingTag) =>
								existingTag.properties.webTitle ===
								tag.properties.webTitle,
						)?.properties.sectionName;

					return (
						<li key={tag.properties.id}>
							<a
								key={tag.properties.webTitle}
								href={tag.properties.webUrl}
								css={linkStyle}
								data-link-name={`keyword: ${tag.properties.id}`}
							>
								{tag.properties.webTitle}
								{!!section && ` (${section})`}
							</a>
						</li>
					);
				})}
			</ul>
		</div>
	);
};
