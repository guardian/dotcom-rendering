import { css } from '@emotion/react';
import { from, headline, space, textSans } from '@guardian/source-foundations';
import type { Palette } from '../../types/palette';
import { decidePalette } from '../lib/decidePalette';
import { FilterLink } from './FilterLink';

type Props = {
	availableTopics?: Topic[];
	selectedTopics?: Topic[];
	format: ArticleFormat;
	filterKeyEvents: boolean;
	keyEvents?: Block[];
	id: 'key-events-carousel-desktop' | 'key-events-carousel-mobile';
};

const containerStyles = css`
	padding: ${space[3]}px 0;
	width: 100%;
`;
const headlineStyles = css`
	${headline.xxxsmall({ fontWeight: 'bold', lineHeight: 'tight' })}
	padding-bottom: ${space[3]}px;
`;

const headlineAccentStyles = (palette: Palette) => css`
	color: ${palette.text.betaLabel};
	${textSans.xxsmall({ fontWeight: 'regular', lineHeight: 'tight' })};
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

const getTopicLink = (isActive: boolean, topics: string, id: Props['id']) => {
	const urlParams = isActive
		? // if active, the button links to the the page without the params
		  ''
		: // we only add the link if the topic is *inactive*
		  '?' +
		  new URLSearchParams({
				topics,
		  }).toString();

	return `${urlParams}#${id}`;
};

const getKeyEventLink = (filterKeyEvents: boolean, id: Props['id']) => {
	const urlParams = new URLSearchParams({
		filterKeyEvents: filterKeyEvents ? 'false' : 'true',
	});

	return `?${urlParams.toString()}#${id}`;
};

const isEqual = (selectedTopic: Topic, availableTopic: Topic) =>
	availableTopic.type === selectedTopic.type &&
	availableTopic.value === selectedTopic.value;

const getTopFiveTopics = (availableTopics: Topic[]) =>
	availableTopics
		.slice(0, 5)
		.filter((topic) => !!topic.count && topic.count > 2);

export const hasRelevantTopics = (availableTopics?: Topic[]) => {
	return !!(availableTopics && getTopFiveTopics(availableTopics).length);
};

/**
 * # Topic Filter Bank
 *
 * A wrapper of filter links.
 *
 * ---
 *
 * [`TopicFilterBank` on Chromatic](https://www.chromatic.com/component?appId=63e251470cfbe61776b0ef19&csfId=components-topicfilterbank)
 */
export const TopicFilterBank = ({
	availableTopics = [],
	selectedTopics,
	format,
	keyEvents,
	filterKeyEvents = false,
	id,
}: Props) => {
	if (!hasRelevantTopics(availableTopics) && !keyEvents?.length) return null;
	const palette = decidePalette(format);
	const selectedTopic = selectedTopics?.[0];
	const topFiveTopics = getTopFiveTopics(availableTopics);

	if (selectedTopic) {
		const selectedIndex = availableTopics.findIndex((availableTopic) =>
			isEqual(selectedTopic, availableTopic),
		);

		const topicAtIndex = availableTopics[selectedIndex];
		if (selectedIndex > 4 && topicAtIndex) {
			topFiveTopics.splice(4, 1, topicAtIndex);
		}
	}

	return (
		<div css={containerStyles}>
			<div css={headlineStyles}>
				Filters <span css={headlineAccentStyles(palette)}>BETA</span>
			</div>
			<div css={topicStyles}>
				{keyEvents?.length ? (
					<FilterLink
						value={'Key events'}
						count={keyEvents.length}
						format={format}
						isActive={filterKeyEvents}
						href={getKeyEventLink(filterKeyEvents, id)}
					/>
				) : null}

				{topFiveTopics.map((topic) => {
					const linkParams = `${topic.type}:${topic.value}`;
					const isActive =
						!!selectedTopic && isEqual(selectedTopic, topic);

					return (
						<FilterLink
							value={topic.value}
							type={topic.type}
							count={topic.count}
							format={format}
							isActive={isActive}
							href={getTopicLink(isActive, linkParams, id)}
							key={`filter-${topic.value}`}
						/>
					);
				})}
			</div>
		</div>
	);
};
