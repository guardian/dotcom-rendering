import { css } from '@emotion/react';
import { palette, textSans } from '@guardian/source-foundations';
import { StraightLines } from '@guardian/source-react-components-development-kitchen';
import type { FETagType } from '../types/tag';

type Props = {
	trendingTopics: FETagType[] | undefined;
};

const linkStyle = css`
	${textSans.xsmall()};
	border: 1px solid ${palette.neutral[20]};
	border-radius: 12px;
	padding: 2px 9px;
	display: inline-block;
	${textSans.xsmall({ lineHeight: 'loose' })}
	text-decoration: none;
	top: 0;
	color: ${palette.neutral[20]};
`;

const topicLabel = css`
	${textSans.xxsmall({ lineHeight: 'regular' })}
	color: ${palette.neutral[20]};
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
	background-image: repeating-linear-gradient(
			to bottom,
			${palette.neutral[100]} 0px,
			${palette.neutral[100]} 36px,
			transparent 36px,
			transparent 37px,
			${palette.neutral[100]} 37px,
			${palette.neutral[100]} 48px
		),
		repeating-linear-gradient(
			to right,
			${palette.neutral[86]} 0px,
			${palette.neutral[86]} 3px,
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
