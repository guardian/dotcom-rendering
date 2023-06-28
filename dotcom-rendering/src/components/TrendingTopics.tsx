import { css } from '@emotion/react';
import { palette, textSans } from '@guardian/source-foundations';
import { StraightLines } from '@guardian/source-react-components-development-kitchen';
import type { FETagType } from '../types/tag';

type Props = {
	trendingTopics: FETagType[] | undefined;
};

const linkStyle = css`
	display: inline-block;
	${textSans.xsmall({ lineHeight: 'loose' })}
	text-decoration: none;
	top: 0;
	color: ${palette.neutral[7]};

	/** All but first items */
	&:nth-of-type(n + 2):before {
		color: ${palette.neutral[86]};
		pointer-events: none;
		margin: 2.56px;
		content: '/';
	}
`;

const topicLabel = css`
	${textSans.xxsmall({ lineHeight: 'regular' })}
	color: ${palette.neutral[60]};
`;

const trendingTopicContainer = css`
	padding-top: 30px;
	padding-bottom: 20px;
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
			<div css={topicLabel}>Topics</div>
			{/* TODO: Add allpath link */}
			{trendingTopics?.slice(0, 5).map((tag) => {
				const section = trendingTopics
					.filter((existingTag) => existingTag !== tag)
					.find(
						(existingTag) =>
							existingTag.properties.webTitle ===
							tag.properties.webTitle,
					)?.properties.sectionName;

				return (
					<a
						key={tag.properties.webTitle}
						href={tag.properties.webUrl}
						css={linkStyle}
						data-link-name={`keyword: ${tag.properties.id}`}
					>
						{tag.properties.webTitle}
						{!!section && ` (${section})`}
					</a>
				);
			})}
		</div>
	);
};
