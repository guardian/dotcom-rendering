import { css } from '@emotion/react';
import { from, palette, space, textSans17 } from '@guardian/source-foundations';
import type { PropsWithChildren } from 'react';

export const DarkModeMessage = ({ children }: PropsWithChildren) => (
	<aside
		css={css`
			display: none;
			@media (prefers-color-scheme: dark) {
				${textSans17}
				background-color: ${palette.neutral[7]};
				color: ${palette.neutral[97]};

				display: grid;
				grid-template-columns:
					0px
					[centre-column-start]
					repeat(4, 1fr)
					[centre-column-end]
					0px;
				column-gap: 12px;

				${from.mobileLandscape} {
					column-gap: 20px;
				}

				${from.tablet} {
					grid-template-columns:
						1fr
						[centre-column-start]
						repeat(12, 40px)
						[centre-column-end]
						1fr;
				}

				${from.desktop} {
					grid-template-columns:
						1fr
						[centre-column-start]
						repeat(8, 60px)
						[centre-column-end]
						repeat(4, 60px)
						1fr;
				}

				${from.leftCol} {
					grid-template-columns:
						1fr
						repeat(2, 60px)
						[centre-column-start]
						repeat(8, 60px)
						[centre-column-end]
						repeat(4, 60px)
						1fr;
				}

				${from.wide} {
					grid-template-columns:
						1fr
						repeat(3, 60px)
						[centre-column-start]
						repeat(8, 60px)
						[centre-column-end]
						repeat(5, 60px)
						1fr;
				}
			}
		`}
	>
		<p
			css={css`
				max-width: 60ch;
				padding: ${space[4]}px 0;
				grid-column: centre-column;
			`}
		>
			{children}
		</p>
	</aside>
);
