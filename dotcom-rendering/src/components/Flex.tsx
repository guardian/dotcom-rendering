import { css } from '@emotion/react';

type Props = {
	children: React.ReactNode;
	direction?: 'row' | 'column';
	justify?: 'space-between' | 'flex-start'; // Extend as required
	gap?: 'initial' | string;
};

export const Flex = ({
	children,
	direction = 'row',
	justify = 'space-between',
	gap = 'initial',
}: Props) => (
	<div
		css={css`
			display: flex;
			flex-direction: ${direction};
			justify-content: ${justify};
			gap: ${gap};
			/* Fixes IE 10/11 bug that collapses this container by default: */
			/* stylelint-disable-next-line property-no-vendor-prefix */
			-ms-flex-positive: 1;
		`}
	>
		{children}
	</div>
);
