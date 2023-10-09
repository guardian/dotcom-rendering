import { css } from '@emotion/react';
import { type ArticleFormat } from '@guardian/libs';
import {
	lineHeights,
	palette,
	space,
	textSans,
} from '@guardian/source-foundations';
import { decideContainerOverrides } from '../lib/decideContainerOverrides';
import { decidePalette } from '../lib/decidePalette';
import { revealStyles } from '../lib/revealStyles';
import { useApi } from '../lib/useApi';
import type { DCRContainerPalette } from '../types/front';
import { WithLink } from './CardHeadline';
import { RelativeTime } from './RelativeTime.importable';

type Props = {
	id: string;
	format: ArticleFormat;
	direction: 'horizontal' | 'vertical';
	isDynamo?: true;
	containerPalette?: DCRContainerPalette;
	now: number;
};

const style = css`
	display: flex;
	gap: 5px;
	padding-bottom: ${space[2]}px;
`;

const horizontal = css`
	flex-direction: row;
`;
const vertical = css`
	flex-direction: column;
	padding: 0 ${space[1]}px;
`;

const linkStyles = css`
	${textSans.xsmall()}
	overflow: hidden;
	flex-grow: 1;
`;

const dividerStyles = css`
	border-top: 1px solid currentColor;
	border-left: 1px solid currentColor;
`;

const bold = css`
	${textSans.xsmall({ fontWeight: 'bold' })};

	:before {
		content: '';
		height: 0.75em;
		width: 0.75em;
		margin-right: ${space[1]}px;
		display: inline-block;
		background-color: currentColor;
		border-radius: 100%;
	}
`;

const transparent = css`
	color: transparent;
`;

const THREE_LINES_AS_CHARACTERS = 75;

/**
 * We cannot rely on [`text-overflow: ellipsis`](https://developer.mozilla.org/en-US/docs/Web/CSS/text-overflow)
 * because that only applies to single lines of text without whitespace wrapping
 */
const extractAboutThreeLines = (text: string) =>
	text.length <= THREE_LINES_AS_CHARACTERS
		? text
		: text
				.slice(0, THREE_LINES_AS_CHARACTERS) // take a few characters
				.split(' ') // split by words
				.slice(0, -1) // drop the last word as it’s likely a partial one
				.join(' ') + '…'; // join with spaces and add an ellipsis

/**
 * Display the last three blocks from a Liveblog when the fronts
 * tool has enabled showing live updates.
 *
 * ## Why does this need to be an Island?
 *
 * We make an API call to retrieve the latest blocks,
 * constantly updating when new data comes in.
 *
 * ---
 *
 * [`LatestLinks` on Chromatic](https://www.chromatic.com/component?appId=63e251470cfbe61776b0ef19&csfId=components-latestlinks&buildNumber=2967)
 */
export const LatestLinks = ({
	id,
	format,
	direction,
	isDynamo,
	containerPalette,
	now,
}: Props) => {
	const { data } = useApi<{
		blocks: Array<{
			id: string;
			title: string;
			publishedDateTime: number;
			lastUpdatedDateTime: number;
			body: string;
		}>;
	}>(`https://api.nextgen.guardianapps.co.uk${id}.json?rendered=false`, {
		refreshInterval: 9_600,
	});

	const { text } = decidePalette(format, containerPalette);
	const kickerColour = isDynamo ? text.dynamoKicker : text.cardKicker;

	const dividerColour = css`
		color: ${containerPalette
			? decideContainerOverrides(containerPalette).border.container
			: palette.neutral[86]};
	`;

	const li = [
		linkStyles,
		isDynamo
			? css`
					max-height: calc(5px + 4 * ${lineHeights.regular}em);
			  `
			: css`
					max-height: calc(4 * ${lineHeights.regular}em);
			  `,
	];

	return (
		<ul
			css={[
				style,
				revealStyles,
				isDynamo || direction === 'horizontal' ? horizontal : vertical,
				css`
					color: ${text.cardHeadline};
				`,
			]}
		>
			{data && data.blocks.length >= 3 ? (
				data.blocks.slice(0, 3).map((block, index) => (
					<>
						{index > 0 && (
							<li
								key={block.id + ' : divider'}
								css={[dividerStyles, dividerColour]}
							></li>
						)}
						<li key={block.id} css={li} className={'reveal'}>
							<WithLink
								linkTo={`${id}?page=with:block-${block.id}#block-${block.id}`}
								isDynamo={isDynamo}
							>
								<div css={bold} style={{ color: kickerColour }}>
									<RelativeTime
										now={now}
										then={block.publishedDateTime}
									/>
								</div>
								<span className="show-underline">
									{extractAboutThreeLines(block.body)}
								</span>
							</WithLink>
						</li>
					</>
				))
			) : (
				<>
					<li css={li} />
					<li css={[dividerStyles, transparent]} />
					<li css={li} />
					<li css={[dividerStyles, transparent]} />
					<li css={li} />
				</>
			)}
		</ul>
	);
};
