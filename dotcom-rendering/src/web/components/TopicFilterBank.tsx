import { css } from '@emotion/react';
import { from, headline, space, textSans } from '@guardian/source-foundations';
import { decidePalette } from '../lib/decidePalette';
import { FilterButton } from './FilterButton.importable';

type Props = {
	availableTopics: Topic[];
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

const betaTextStyles = (palette: Palette) => css`
	color: ${palette.text.keyEvent};
`;

const topicStyles = css`
	display: flex;
	align-items: flex-start;
	flex-direction: row;
	flex-wrap: wrap;
	column-gap: ${space[2]}px;
	row-gap: ${space[2]}px;
	${from.desktop} {
		flex-direction: column;
		flex-wrap: nowrap;
		column-gap: 0;
	}
`;

export const TopicFilterBank = ({ availableTopics, format }: Props) => {
	const palette = decidePalette(format);
	return (
		<div css={containerStyles}>
			<div css={headlineStyles}>
				Filters{' '}
				<span css={headlineAccentStyles}>
					(<span css={betaTextStyles(palette)}>BETA</span>
					):
				</span>
			</div>

			<div css={topicStyles}>
				{availableTopics.slice(0, 5).map((topic) => {
					return (
						<FilterButton
							value={topic.value}
							type={topic.type}
							count={topic.count}
							format={format}
							isActive={false}
							onClick={() => {}}
						/>
					);
				})}
			</div>
		</div>
	);
};
