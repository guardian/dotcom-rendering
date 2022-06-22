import { css } from '@emotion/react';
import { headline, textSans } from '@guardian/source-foundations';
import { Button } from '@guardian/source-react-components';
import { decidePalette } from '../lib/decidePalette';

type Props = {
	topics: Topic[];
	format: ArticleFormat;
};

const containerStyles = css`
	padding: 12px 0;
	width: 100%;
`;
const headlineStyles = css`
	${headline.xxxsmall({ fontWeight: 'bold', lineHeight: 'tight' })}
	padding-bottom: 12px;
`;

const headlineAccentStyles = css`
	${textSans.small({ fontWeight: 'bold', lineHeight: 'tight' })};
`;

const topicStyles = css`
	padding-right: 12px;
	padding-bottom: 12px;
`;
export const TopicFilterBank = ({ topics, format }: Props) => {
	const palette = decidePalette(format);
	return (
		<div css={containerStyles}>
			<div css={headlineStyles}>
				Filters{' '}
				<span css={headlineAccentStyles}>
					(
					<span
						css={css`
							color: ${palette.text.keyEvent};
						`}
					>
						BETA
					</span>
					)
				</span>
				:
			</div>
			<div css={topicStyles}>
				{topics.map((topic) => {
					return (
						<Button>
							{topic.value} ({topic.count})
						</Button>
					);
				})}
			</div>
		</div>
	);
};
