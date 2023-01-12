import { css } from '@emotion/react';
import { border, neutral, textSans } from '@guardian/source-foundations';
import type { ReactNode } from 'react';

type Props = {
	id: string;
	label: string;
	children: ReactNode;
};

export const InlineSkipToWrapper = ({ id, label, children }: Props) => {
	return (
		<>
			<a
				href={`#${id}`}
				css={css`
					${textSans.medium()}
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
				`}
			>
				{label}
			</a>
			{children}
			<span id={id}>{id}</span>
		</>
	);
};
