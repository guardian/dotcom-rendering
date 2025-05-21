import {
	from,
	headlineBold17Object,
	headlineBold24Object,
	headlineMedium20Object,
	space,
} from '@guardian/source/foundations';
import { palette } from '../../palette';

type Props = {
	values: ValueWithChange[];
	/**
	 * An accessible description of the value being used. For example: "Seats".
	 */
	valueDescription: string;
	/**
	 * An accessible description of the change in the value being used. For
	 * example: "Change in seats".
	 */
	changeDescription: string;
};

/**
 * A value with a corresponding positive, negative, or zero change. Examples:
 * seats won by a party; votes won by a candidate.
 */
type ValueWithChange = {
	/**
	 * The name of the value in the list. For an election, this could be the
	 * name of the group or party. It will be used as a React "key" for the
	 * element, so each value's `name` should be unique relative to the other
	 * sections. Note that due to the constraints of the design this cannot be
	 * longer than about 7 characters, otherwise it will overrun its container.
	 *
	 * **Examples:** name of a candidate; name of a party.
	 */
	name: string;
	/**
	 * **Examples:** seats won by a party; votes won by a candidate.
	 */
	value: number;
	/**
	 * The change in the value; since the last election, for example. Can be
	 * positive, negative or zero. If zero, it will not be shown.
	 */
	change: number;
	/**
	 * The colour used to represent the value. It expects a CSS `color` value
	 * (e.g. a hex string). To ensure dark mode support a {@linkcode palette}
	 * colour can be used; i.e. this property can be set to the return value of
	 * the {@linkcode palette} function.
	 */
	colour: string;
};

const rowGap = 10;

export const ValuesWithChange = ({
	values,
	valueDescription,
	changeDescription,
}: Props) => (
	<ul
		css={{
			display: 'grid',
			gridTemplateColumns: 'repeat(auto-fill, minmax(84px, 1fr))',
			rowGap,
			'--column-gap': '10px',
			columnGap: 'var(--column-gap)',
			/**
			 * Used to hide parts of the borders between grid items, which are
			 * created using pseudo-elements.
			 */
			overflow: 'hidden',
			listStyle: 'none',
			marginTop: space[2],
			padding: 0,
			[from.mobileLandscape]: {
				'--column-gap': '20px',
			},
		}}
	>
		{values.map((value) => (
			<Value
				key={value.name}
				value={value}
				valueDescription={valueDescription}
				changeDescription={changeDescription}
			/>
		))}
	</ul>
);

const Value = ({
	value,
	valueDescription,
	changeDescription,
}: {
	value: ValueWithChange;
	valueDescription: Props['valueDescription'];
	changeDescription: Props['changeDescription'];
}) => (
	<li
		style={{
			'--before-background-colour': value.colour,
		}}
		css={{
			whiteSpace: 'nowrap',
			color: palette('--values-with-change-value'),
			position: 'relative',
			['&:before']: {
				content: '""',
				display: 'block',
				height: 4,
				width: 32,
				borderRadius: 20,
				backgroundColor: 'var(--before-background-colour)',
			},
			['&:after']: {
				content: '""',
				position: 'absolute',
				top: -rowGap,
				left: 'calc(-0.5 * (var(--column-gap) + 1px))',
				backgroundColor: palette('--values-with-change-border'),
				height: `calc(100% + ${rowGap}px)`,
				width: 1,
			},
		}}
	>
		<Name name={value.name} />
		<ValueText value={value.value} valueDescription={valueDescription} />
		<Change change={value.change} changeDescription={changeDescription} />
	</li>
);

const ValueText = ({
	value,
	valueDescription,
}: {
	value: ValueWithChange['value'];
	valueDescription: Props['valueDescription'];
}) => (
	<span
		aria-label={valueDescription}
		css={{
			...headlineBold24Object,
			lineHeight: 1,
		}}
	>
		{value}
	</span>
);

const Name = ({ name }: { name: ValueWithChange['name'] }) => (
	<div
		css={{
			...headlineMedium20Object,
			lineHeight: 1.2,
		}}
	>
		{name}
	</div>
);

const Change = ({
	change,
	changeDescription,
}: {
	change: number;
	changeDescription: Props['changeDescription'];
}) => {
	const text = changeText(change);

	if (text === undefined) {
		return null;
	}

	return (
		<span
			aria-label={changeDescription}
			css={{
				...headlineBold17Object,
				lineHeight: 1,
				color: palette('--values-with-change-change'),
			}}
		>
			{' '}
			{text}
		</span>
	);
};

const changeText = (change: number): string | undefined => {
	if (change > 0) {
		return `+${change}`;
	} else if (change < 0) {
		return change.toString();
	}

	return undefined;
};
