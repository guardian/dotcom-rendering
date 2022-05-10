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
	const { keyEvent, keyEventUnderline } = palette.text;

	const bgColor = isSummary ? keyEvent : neutral[46];
	const bgColorHover = isSummary ? keyEventUnderline : neutral[0];

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
			background-color: ${bgColor};
			margin-bottom: ${space[1]}px;
			z-index: 2;

			${from.tablet} {
				height: 15px;
				width: 15px;
			}
		}

		&:hover::before {
			background-color: ${bgColorHover};
		}

		&:hover {
			span {
				text-decoration: underline;
				text-decoration-color: ${palette.text.keyEventUnderline};
			}
		}
	`;
};

const listItemStyles = css`
	position: relative;
	padding-bottom: ${space[5]}px;
	padding-top: ${space[3]}px;
	padding-right: ${space[5]}px;
	background-color: ${neutral[97]};
	list-style: none;
	display: block;
	width: 150px;

	${from.desktop} {
		background-color: ${neutral[93]};
		width: 180px;
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
