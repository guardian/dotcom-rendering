import { css } from '@emotion/react';
import { textSans, neutral, space, from } from '@guardian/source-foundations';
import { Link } from '@guardian/source-react-components';
import { timeAgo } from '@guardian/libs';
import { decidePalette } from '../lib/decidePalette';

export interface KeyEvent {
	date: Date;
	text: string;
	url: string;
	format: ArticleFormat;
	isSummary: boolean;
}

const linkStyles = (palette: Palette, isSummary: boolean) => {
	const bulletColor = isSummary
		? palette.background.keyEventBullet
		: neutral[46];

	const bulletHoverColor = isSummary
		? palette.hover.keyEventBullet
		: neutral[0];

	return css`
		text-decoration: none;
		line-height: 1.35;

		&::before {
			content: '';
			display: block;
			position: relative;
			height: 13px;
			width: 13px;
			border-radius: 50%;
			background-color: ${bulletColor};
			margin-bottom: ${space[1]}px;
			z-index: 2;

			${from.tablet} {
				height: 15px;
				width: 15px;
			}
		}

		&:hover::before {
			background-color: ${bulletHoverColor};
		}

		&:hover {
			span {
				border-bottom: 1px solid ${palette.hover.keyEventLink};
			}
		}
	`;
};

const listItemStyles = css`
	position: relative;
	padding-bottom: ${space[5]}px;
	padding-top: ${space[3]}px;
	padding-right: ${space[3]}px;
	background-color: ${neutral[97]};
	list-style: none;
	display: block;
	width: 162px;

	${from.desktop} {
		background-color: ${neutral[93]};
		width: 200px;
		padding-right: ${space[5]}px;
	}

	&::before {
		content: '';
		display: block;
		position: absolute;
		border-top: 1px dotted ${neutral[46]};
		left: 0;
		right: 0;
		top: 18px;
	}

	&:last-child::before {
		border-top: 0;
	}
`;

const textStyles = (palette: Palette) => css`
	${textSans.small({ fontWeight: 'regular', lineHeight: 'regular' })};
	color: ${palette.text.keyEvent};
`;

const timeStyles = css`
	${textSans.xsmall({ fontWeight: 'bold', lineHeight: 'tight' })};
	color: ${neutral[7]};
	display: block;
`;

export const KeyEventCard = ({
	text,
	date,
	url,
	format,
	isSummary,
}: KeyEvent) => {
	const palette = decidePalette(format);

	return (
		<li css={listItemStyles}>
			<Link
				priority="secondary"
				css={linkStyles(palette, isSummary)}
				href={url}
				data-link-name="key event card"
			>
				<time
					dateTime={date.toISOString()}
					data-relativeformat="med"
					title={`${date.toLocaleDateString('en-GB', {
						hour: '2-digit',
						minute: '2-digit',
						weekday: 'long',
						year: 'numeric',
						month: 'long',
						day: 'numeric',
						timeZoneName: 'long',
					})}`}
					css={timeStyles}
				>
					{timeAgo(date.getTime())}
				</time>
				<span css={textStyles(palette)}>{text}</span>
			</Link>
		</li>
	);
};
