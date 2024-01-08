import { css } from '@emotion/react';
import { headline, palette, textSans } from '@guardian/source-foundations';
import { blockLink } from '../lib/block-link.amp';
import DownArrow from '../static/icons/down-arrow.svg';

const headingStyle = css`
	${headline.xxsmall()};
	background-color: ${palette.neutral[100]};
	padding: 0.375rem 0.625rem;
	font-weight: bold;
	span {
		background-color: ${palette.neutral[46]};
		float: right;
		position: relative;
	}

	svg {
		fill: ${palette.neutral[100]};
		color: black;
		display: block;
	}
`;

const listItemStyle = css`
	display: table;
	${textSans.small()};
	width: 100%;
	overflow: hidden;
	min-height: 2.5rem;
	border-bottom: 0.0625rem solid ${palette.neutral[86]};
	padding: 0.125rem 0 0.375rem;
`;

const timeStyle = css`
	display: table-cell;
	width: 6.75rem;
	font-weight: bold;
`;

const listTitleStyle = css`
	display: table-cell;
`;

const wrapper = css`
	margin-bottom: 6px;
`;

// TODO text link style shouldn't be here
const eventLinkStyle = css`
	display: block;
	text-decoration: none;
	color: ${palette.sport[300]};
	:hover {
		text-decoration: underline;
	}
`;

const listStyle = css`
	padding: 0.375rem 0.625rem;
`;

type Props = {
	events: Block[];
	url: string;
};

export const KeyEvents = ({ events, url }: Props) => {
	if (events.length < 1) {
		return null;
	}

	const lis = events.map((event) => (
		<li css={listItemStyle} key={event.id}>
			<a css={eventLinkStyle} href={blockLink(url, event.id)}>
				<span css={timeStyle}>{event.blockCreatedOnDisplay}</span>
				<span css={listTitleStyle}>{event.title ?? ''}</span>
			</a>
		</li>
	));

	return (
		<amp-accordion class={wrapper}>
			<section>
				<h2 css={headingStyle}>
					Key events{' '}
					<span>
						<DownArrow />
					</span>
				</h2>
				<ul css={listStyle}>{lis}</ul>
			</section>
		</amp-accordion>
	);
};
