// ----- Imports ----- //
import { css } from '@emotion/react';
import { remSpace } from '@guardian/src-foundations';
import { from } from '@guardian/src-foundations/mq';
import * as Palette from '@guardian/src-foundations/palette';
import { textSans } from '@guardian/src-foundations/typography';
import type { FC } from 'react';

// ----- Styles ----- //

const placeholderStyles = css`
	width: 100%;
	position: relative;
	padding-bottom: 56.25%;
	background-color: ${Palette.neutral[20]};
	color: ${Palette.neutral[97]};
`;

const centerStyles = css`
	position: absolute;
	top: 50%;
	left: 50%;
	transform: translate(-50%, -50%);
`;

const wrapperStyles = css`
	display: flex;
	flex-direction: column;
	width: 290px;

	${from.tablet} {
		width: 300px;
	}

	svg {
		height: 33px;
		fill: ${Palette.neutral[97]};
		stroke: ${Palette.neutral[97]};
	}
`;

const textStyles = css`
	text-align: center;
	${textSans.small()};
	margin: ${remSpace[2]} 0;
`;

// ----- Component ----- //

// replace this with "SvgOfflineCloud" import from Source when available
const SvgOfflineCloud = (): JSX.Element => (
	<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 40 33">
		<path d="M29.9 12.64a7.27 7.27 0 112.82 14H20.95c-1.12.05-5.43.04-8.92.03l2.75-2.76h17.96a4.55 4.55 0 10-3.64-7.27 5.68 5.68 0 00-3.37-3.67l2.05-2.06c.8.45 1.52 1.03 2.14 1.73zM25.18 9.96l8.2-8.2L31.61 0l-8.8 8.8A9.39 9.39 0 0014.26 3a9.6 9.6 0 00-9.63 9.55C1.94 13.74 0 16.5 0 19.36a7.29 7.29 0 005.26 7L.5 31.1l1.77 1.77 6.23-6.23 14.1-14.1 2.58-2.59zm-10.9-4.23c3.1 0 5.56 2.34 6.36 5.25L7.7 23.9h-.43a4.52 4.52 0 01-4.54-4.55c0-2.08 1.68-4 3.63-4.54l.82 1.82 1.1-.37-.06-.15a10.2 10.2 0 01-.86-3.57 6.86 6.86 0 016.91-6.82z" />
	</svg>
);

interface Props {
	text: string;
}

const Placeholder: FC<Props> = ({ text }) => {
	return (
		<div css={placeholderStyles}>
			<div css={centerStyles}>
				<div css={wrapperStyles}>
					<SvgOfflineCloud />
					<p css={textStyles}>{text}</p>
				</div>
			</div>
		</div>
	);
};

// ----- Exports ----- //

export default Placeholder;
