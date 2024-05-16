// ----- Imports ----- //

import { css } from '@emotion/react';
import { border, neutral, textSans17 } from '@guardian/source/foundations';
import type { FC, ReactNode } from 'react';

// ----- Component ----- //

type Props = {
	/**string to act as the id attribute of the skip target element and used in the
	 * href attribute of the skip link (`#${id}`). As such, the id needs to be unique
	 * and follow the requirements at https://html.spec.whatwg.org/multipage/dom.html#the-id-attribute
	 */
	id: string;
	blockDescription: string;
	children: ReactNode;
};

const skipLinkCss = css`
	${textSans17};
	height: 40px;
	left: -100vw;
	line-height: 30px;
	overflow: hidden;
	padding: 0;
	position: absolute;
	background: ${neutral[100]};
	display: block;
	text-align: center;
	margin: 0;
	text-decoration: none;
	color: ${neutral[0]};
	&:focus,
	&:active {
		border: 5px solid ${border.focusHalo};
		position: static;
	}
	&:visited,
	&:active {
		color: ${neutral[0]};
	}
`;

// Using single template literals for the labels instead of
// `after {blockDescription}` to prevent JSX rendering
// an empty comment in the HTML between the static text
// and the variable. That comment can make screen readers
// announce the text oddly.
// https://github.com/guardian/dotcom-rendering/pull/6950#pullrequestreview-1279406318

/**
 * Component that places a visually hidden link before its child, pointing to a visually
 * hidden target element after it. Intended to allow screen reader users to skip past
 * complementary blocks inline with the article content, rather than hearing all the text
 * read out.
 *
 * The "id" props is a string to act as the id attribute of the skip target element and used in the
 * href attribute of the skip link (`#${id}`). As such, the id needs to be unique
 * and follow the requirements at https://html.spec.whatwg.org/multipage/dom.html#the-id-attribute.
 *
 * The "blockDescription" prop will be announced by screen readers when the visually hidden elements
 * are reached - needs to be a **short** explanation of what the child element is.
 */
const InlineSkipToWrapper: FC<Props> = ({
	id,
	blockDescription,
	children,
}: Props) => {
	return (
		<>
			<a
				data-ignore="global-link-styling"
				href={`#${id}`}
				css={skipLinkCss}
			>
				{`skip past ${blockDescription}`}
			</a>
			{children}

			<p
				id={id}
				tabIndex={0}
				css={skipLinkCss}
				aria-label={`after ${blockDescription}`}
				role={'note'}
			>
				{`after ${blockDescription}`}
			</p>
		</>
	);
};

// ----- Exports ----- //

export default InlineSkipToWrapper;
