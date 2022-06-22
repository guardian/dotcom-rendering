import { css } from '@emotion/react';
import { headline, space, textSans } from '@guardian/source-foundations';
import { Button, Hide } from '@guardian/source-react-components';
import { decidePalette } from '../lib/decidePalette';
import { FilterButton } from './FilterButton.importable';

type Props = {
	topics: Topic[];
	format: ArticleFormat;
};

const containerStyles = css`
	padding: ${space[3]}px 0;
	width: 100%;
`;
const headlineStyles = css`
	${headline.xxxsmall({ fontWeight: 'bold', lineHeight: 'tight' })}
	padding-bottom: ${space[3]}px;
`;

const headlineAccentStyles = css`
	${textSans.small({ fontWeight: 'regular', lineHeight: 'tight' })};
`;

const desktopTopicStyles = css`
	display: flex;
	flex-direction: column;
	align-items: flex-start;
`;

const mobileTopicStyles = css`
	display: flex;
	flex-direction: row;
	flex-wrap: wrap;
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
					):
				</span>
			</div>

			<Hide above="desktop">
				<div css={mobileTopicStyles}>
					{topics.slice(0, 5).map((topic) => {
						return (
							<FilterButton
								text={topic.value}
								count={topic.count}
								format={format}
								isActive={false}
								onClick={() => {
									console.log('filter clicked');
								}}
							/>
							// <Button
							// 	cssOverrides={css`
							// 		margin-bottom: ${space[3]}px;
							// 		margin-right: ${space[1]}px;
							// 	`}
							// >
							// 	{topic.value} ({topic.count})
							// </Button>
						);
					})}
				</div>
			</Hide>
			<Hide below="desktop">
				<div css={desktopTopicStyles}>
					{topics.slice(0, 5).map((topic) => {
						return (
							<FilterButton
								text={topic.value}
								count={topic.count}
								format={format}
								isActive={false}
								onClick={() => {
									console.log('filter clicked');
								}}
							/>
							// <Button
							// 	cssOverrides={css`
							// 		margin-bottom: ${space[3]}px;
							// 	`}
							// >
							// 	{topic.value} ({topic.count})
							// </Button>
						);
					})}
				</div>
			</Hide>
		</div>
	);
};
