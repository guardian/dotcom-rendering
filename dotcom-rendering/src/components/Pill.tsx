import { css } from '@emotion/react';
import { space, textSansBold12 } from '@guardian/source/foundations';

interface Props {
	content: JSX.Element;
}

const pillStyles = css`
	display: inline-flex;
	align-items: center;
	gap: ${space[1]}px;
	padding: ${space[1]}px 10px;
	border-radius: ${space[3]}px;
	${textSansBold12};
	color: white;
	background-color: rgba(18, 18, 18, 0.7);
`;

export const IconMedia = () => (
	<svg
		xmlns="http://www.w3.org/2000/svg"
		height="10"
		viewBox="0 0 8 10"
		focusable={false}
		aria-hidden={true}
	>
		<path
			fill="currentColor"
			fill-rule="evenodd"
			clip-rule="evenodd"
			d="M7.8 5.2748v-.5166L.2773-.002 0 .3302v9.3726l.2773.2952L7.8 5.2748Z"
		/>
	</svg>
);

export const IconCamera = () => (
	<svg
		xmlns="http://www.w3.org/2000/svg"
		height="10"
		viewBox="0 0 14 10"
		focusable={false}
		aria-hidden={true}
	>
		<path
			fill="currentColor"
			fill-rule="evenodd"
			clip-rule="evenodd"
			d="M13.3132 2.4186v6.6415l-.8926.938H.9077L0 9.1054V2.4186l.9077-.9077h3.0106L5.4312-.002h2.4357l1.5128 1.513h3.0409l.8926.9076ZM6.6565 8.3188c1.5129 0 2.7383-1.2103 2.7383-2.708 0-1.5129-1.2254-2.7232-2.7383-2.7232a2.7118 2.7118 0 0 0-2.7231 2.7232c0 1.4977 1.2103 2.708 2.7231 2.708Z"
		/>
	</svg>
);

export const Pill = ({ content }: Props) => (
	<span css={pillStyles}>{content}</span>
);
