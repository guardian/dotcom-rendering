import { css } from '@emotion/react';

const quoteStyles = css`
	height: 1em;
	width: 1.5em;
	margin-right: 3px;
	vertical-align: baseline;
`;

type Props = {
	colour: string;
};

/**
 * An inline quote icon (“) sized to match the font size.
 */
export const QuoteIcon = ({ colour }: Props) => (
	/* This viewBox is narrower than Source’s SvgQuote */
	<svg viewBox="4 4 24 16" css={quoteStyles} fill={colour}>
		<path d="M9.2776 8H14.0473C13.4732 12.5489 12.9653 17.0095 12.7445 22H4C4.79495 17.142 6.4511 12.5489 9.2776 8ZM20.3852 8H25.0887C24.5808 12.5489 24.0067 17.0095 23.7859 22H15.0635C15.9688 17.142 17.5587 12.5489 20.3852 8Z" />
	</svg>
);
