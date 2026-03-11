import { css } from '@emotion/react';
import { breakpoints, from } from '@guardian/source/foundations';
import { grid } from '../grid';
import { CallToActionAtom } from './CallToActionAtom';

export type CallToActionProps = {
	url?: string;
	image?: string;
	label?: string;
	btnText?: string;
};

export const CallToActionAtomWrapper = ({
	url,
	image,
	label,
	btnText,
}: CallToActionProps) => {
	const ctaStyles = css`
		${grid.container}
		${grid.column.all}
		grid-row-end: -1;
		overflow: hidden;
		max-height: 400px;
		${from.wide} {
			width: ${breakpoints.wide}px;
			margin: auto;
		}
	`;
	return (
		<div css={ctaStyles}>
			<CallToActionAtom
				url={url}
				image={image}
				label={label}
				btnText={btnText}
			/>
		</div>
	);
};
