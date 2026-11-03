import {
	type Breakpoint,
	from,
	headlineBold20Object,
	headlineBold24Object,
	space,
} from '@guardian/source/foundations';

export const Heading = (props: { children: string; from: Breakpoint }) => (
	<h3
		css={{
			...headlineBold20Object,
			paddingBottom: space[2],
			[from[props.from]]: {
				...headlineBold24Object,
				paddingTop: 0,
			},
		}}
	>
		{props.children}
	</h3>
);
