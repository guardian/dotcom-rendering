import { css } from '@emotion/react';
import { neutral } from '@guardian/source-foundations';
import { StraightLines } from '@guardian/source-react-components-development-kitchen';
import type { FETagType } from '../../types/tag';

type Props = {
	trendingTopics: FETagType[] | undefined;
};

const linkStyle = css`
	text-decoration: none;
	font-size: 16px;
	top: 0;
	line-height: 16px;
	color: ${neutral[7]};
	&:after {
		color: ${neutral[86]};
		font-size: 16px;
		pointer-events: none;
		margin: 2.56px;
		content: '/';
	}
	&:last-of-type {
		&:after {
			content: '';
		}
	}
`;

const topicLabel = css`
	font-size: 13.6px;
	line-height: 22px;
	color: ${neutral[60]};
`;

const trendingTopicContainer = css`
	padding-top: 30px;
	padding-bottom: 20px;
`;

export const TrendingTopics = ({ trendingTopics }: Props) => {
	return (
		<div css={trendingTopicContainer}>
			<StraightLines
				cssOverrides={css`
					display: block;
				`}
				count={4}
			/>
			<div css={topicLabel}>Topics</div>
			{/* TODO: Add allpath link */}
			{trendingTopics?.map((tag) => {
				return (
					<a
						key={tag.properties.webTitle}
						href={tag.properties.webUrl}
						css={linkStyle}
					>
						{tag.properties.webTitle}
					</a>
				);
			})}
		</div>
	);
};
