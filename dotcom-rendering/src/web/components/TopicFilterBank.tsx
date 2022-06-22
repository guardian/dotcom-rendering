import { css } from '@emotion/react';
import { headline, news, textSans } from '@guardian/source-foundations';
import { Button } from '@guardian/source-react-components';

type Props = {
	topics: Topic[];
};

const containerStyles = css`
	padding: 12px 0;
`;
const headlineStyles = css`
	${headline.xxxsmall({ fontWeight: 'bold', lineHeight: 'tight' })}
`;

const headlineAccentStyles = css`
	${textSans.small({ fontWeight: 'bold', lineHeight: 'tight' })};
`;

export const TopicFilterBank = ({ topics }: Props) => {
	return (
		<div css={containerStyles}>
			<div css={headlineStyles}>
				Filters{' '}
				<span css={headlineAccentStyles}>
					(
					<span
						css={css`
							color: ${news[300]};
						`}
					>
						BETA
					</span>
					)
				</span>
				:
			</div>
			{topics.map((topic) => {
				return (
					<Button>
						{topic.value} ({topic.count})
					</Button>
				);
			})}
		</div>
	);
};
