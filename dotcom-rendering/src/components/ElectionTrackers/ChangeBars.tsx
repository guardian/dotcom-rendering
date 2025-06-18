import {
	from,
	headlineBold17Object,
	headlineBold24Object,
	headlineBold42Object,
	headlineMedium17Object,
	headlineMedium20Object,
} from '@guardian/source/foundations';
import { palette } from '../../palette';

type Props = {
	changes: Change[];
};

type Change = {
	/**
	 * The name of the value changing. For an election, this could be the name
	 * of the group or party. It will be used as a React "key" for the element,
	 * so each value's `name` should be unique relative to the names of other
	 * changes.
	 *
	 * **Examples:** name of a candidate; name of a party.
	 */
	name: string;
	/**
	 * An abbreviated version of the {@linkcode Change.name}, used when the full
	 * name will not fit, for example on narrower breakpoints. Note that due to
	 * the constraints of the design this cannot be longer than about 7
	 * characters.
	 */
	abbreviation: string;
	/**
	 * The change to be represented. Can be positive, negative or zero.
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

export const ChangeBars = ({ changes }: Props) => {
	const maxChange = Math.max(...changes.map((c) => c.change));

	return (
		<ul
			css={{
				display: 'flex',
				margin: 0,
				padding: '4px 0',
				height: 170,
			}}
		>
			{changes.map((change) => (
				<ChangeBar
					key={change.name}
					change={change}
					maxChange={maxChange}
				/>
			))}
		</ul>
	);
};

const ChangeBar = ({
	change,
	maxChange,
}: {
	change: Change;
	maxChange: number;
}) => (
	<li
		style={{
			'--before-background-colour': change.colour,
		}}
		css={{
			flex: 1,
			display: 'flex',
			flexDirection: 'column',
			borderRightWidth: 1,
			borderRightStyle: 'solid',
			borderRightColor: palette('--change-bars-border'),
			['&:before']: {
				content: '""',
				display: 'block',
				height: 4,
				width: 40,
				borderRadius: 20,
				backgroundColor: 'var(--before-background-colour)',
			},
			['&:last-of-type']: {
				border: 'none',
			},
			['&:not(:last-of-type) > *']: {
				paddingRight: 4,
				[from.tablet]: {
					paddingRight: 10,
				},
			},
			['&:not(:first-of-type) > *']: {
				paddingLeft: 4,
				[from.tablet]: {
					paddingLeft: 10,
				},
			},
			['&:not(:first-of-type):before']: {
				marginLeft: 4,
				[from.tablet]: {
					marginLeft: 10,
				},
			},
		}}
	>
		<Name name={change.name} abbreviation={change.abbreviation} />
		<Abbreviation abbreviation={change.abbreviation} />
		<Bar
			change={change.change}
			maxChange={maxChange}
			colour={change.colour}
		/>
		<ChangeText change={change.change} />
	</li>
);

const Name = ({
	name,
	abbreviation,
}: {
	name: Change['name'];
	abbreviation: Change['abbreviation'];
}) => (
	<div
		css={{
			...headlineMedium20Object,
			color: palette('--change-bars-text'),
			display: 'none',
			[from.desktop]: {
				display: 'block',
			},
		}}
	>
		{name.length > 12 ? abbreviation : name}
	</div>
);

const Abbreviation = ({
	abbreviation,
}: {
	abbreviation: Change['abbreviation'];
}) => (
	<div
		css={{
			...headlineMedium17Object,
			color: palette('--change-bars-text'),
			flexBasis: ['3.125rem', 'calc(2lh + 4px)'],
			[from.mobileMedium]: headlineMedium20Object,
			[from.phablet]: {
				flexBasis: 'unset',
			},
			[from.desktop]: {
				display: 'none',
			},
		}}
	>
		{abbreviation}
	</div>
);

const Bar = ({
	change,
	maxChange,
	colour,
}: {
	change: Change['change'];
	maxChange: number;
	colour: Change['colour'];
}) => (
	<div
		css={{
			flex: 1,
			display: 'flex',
			flexDirection: 'column',
		}}
		style={
			change < 0
				? {
						justifyContent: 'start',
						order: 1,
				  }
				: {
						justifyContent: 'end',
						order: 0,
				  }
		}
	>
		<div
			style={{
				backgroundColor: colour,
				height: `${(Math.abs(change) * 100) / maxChange}%`,
			}}
		/>
	</div>
);

const ChangeText = ({ change }: { change: Change['change'] }) => (
	<div
		css={{
			flex: 1,
			display: 'flex',
			flexDirection: 'column',
			alignItems: 'flex-start',
			borderColor: palette('--change-bars-axis'),
			borderWidth: 1,
		}}
		style={
			change < 0
				? {
						justifyContent: 'end',
						borderBottomStyle: 'solid',
				  }
				: {
						justifyContent: 'flex-start',
						borderTopStyle: 'solid',
				  }
		}
	>
		<div
			css={{
				...headlineBold17Object,
				[from.mobileMedium]: headlineBold24Object,
				[from.desktop]: headlineBold42Object,
				paddingBottom: '0.2em',
				color: palette('--change-bars-text'),
			}}
		>
			{change > 0 ? '+' : undefined}
			{change}
		</div>
	</div>
);
