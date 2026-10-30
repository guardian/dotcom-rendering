import { type Breakpoint, from, space } from '@guardian/source/foundations';
import type { ReactNode } from 'react';
import { palette } from '../../palette';
import { Heading } from './Heading';

type Props = {
	/**
	 * The breakpoint from which to place the components side-by-side.
	 */
	from: Breakpoint;
	left: {
		heading: string;
		children: ReactNode;
	};
	right: {
		heading: string;
		children: ReactNode;
	};
};

/**
 * Handles a common design pattern, where components are placed above one
 * another at narrower breakpoints and side-by-side at wider ones.
 */
export const SideBySide = (props: Props) => (
	<div
		css={{
			[from[props.from]]: {
				display: 'flex',
			},
		}}
	>
		<div
			css={{
				[from[props.from]]: {
					flexBasis: '50%',
					paddingRight: space[2],
				},
			}}
		>
			<Heading from={props.from}>{props.left.heading}</Heading>
			{props.left.children}
		</div>
		<div
			css={{
				paddingTop: space[4],
				[from[props.from]]: {
					paddingTop: 0,
					flexBasis: '50%',
					paddingLeft: space[2],
					borderLeftStyle: 'solid',
					borderLeftColor: palette('--election-tracker-border'),
					borderLeftWidth: 1,
				},
			}}
		>
			<Heading from={props.from}>{props.right.heading}</Heading>
			{props.right.children}
		</div>
	</div>
);
