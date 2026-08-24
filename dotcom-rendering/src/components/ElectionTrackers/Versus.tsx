import {
	from,
	headlineBold24Object,
	headlineBold42Object,
	headlineBold50Object,
	headlineBold64Object,
	headlineMedium20Object,
	headlineMedium24Object,
	headlineMedium34Object,
	textSans12Object,
} from '@guardian/source/foundations';
import { generateImageURL } from '../../lib/image';
import { palette } from '../../palette';

type Props = {
	left: Group;
	right: Group;
	/**
	 * Whether to use the group's colour for the name of the group or the value
	 * being displayed. For example, if this component is used to represent a
	 * party running for seats in an election, then setting `'name'` will mean
	 * the party's name will appear in the party's colour, and setting `'value'`
	 * will instead mean the number of seats will appear in the party's colour.
	 *
	 * See the `UKGeneral` story for an example of `'name'`, and the
	 * `USPresidential` story for an example of `'value'`.
	 */
	colour: 'name' | 'value' | 'none';
	/**
	 * Whether to use a faded colour scheme for the component.
	 *
	 * See the `UKExitPoll` story for an example.
	 */
	faded: boolean;
	/**
	 * The `string` passed will be displayed as a banner that appears between
	 * the two groups. Note that due to the constraints of the design this
	 * cannot be longer than about 9 characters, otherwise it will overrun its
	 * container. Passing `undefined` will mean no banner is shown.
	 *
	 * See the `UKExitPoll` story for an example.
	 */
	banner: string | undefined;
};

type Group = {
	/**
	 * **Examples:** name of a candidate; name of a party.
	 */
	name: string;
	/**
	 * An abbreviated version of the {@linkcode Group.name}, used when the full
	 * name will not fit, for example on narrower breakpoints. Note that due to
	 * the constraints of the design this cannot be longer than about 11
	 * characters.
	 */
	abbreviation: string;
	/**
	 * **Examples:** seats won by a party; votes won by a candidate.
	 */
	value: number;
	/**
	 * Expects images in a format that can be converted to Fastly Image
	 * Optimizer URLs. See {@linkcode generateImageURL} for more information,
	 * and the `Versus` stories for examples.
	 */
	image:
		| {
				url: URL;
				alt: string;
		  }
		| undefined;
	/**
	 * The colour used to represent the group. It expects a CSS `color` value
	 * (e.g. a hex string). To ensure dark mode support a {@linkcode palette}
	 * colour can be used; i.e. this property can be set to the return value of
	 * the {@linkcode palette} function.
	 */
	colour: string;
} & (
	| {
			/**
			 * Pass this to show a change in the {@linkcode Group.value}. Alternatively
			 * a `description` of the value can be passed instead.
			 */
			change: number;
	  }
	| {
			/**
			 * Pass this to show a description of the {@linkcode Group.value}.
			 * Alternatively a `change` in this value can be passed instead.
			 */
			description: string;
	  }
);

export const Versus = (props: Props) => (
	<div
		css={{
			display: 'flex',
			justifyContent: 'space-between',
		}}
	>
		<GroupComponent
			group={props.left}
			colour={props.colour}
			align="left"
			faded={props.faded}
		/>
		<div css={{ position: 'relative' }}>
			<Image
				image={props.left.image}
				align="left"
				banner={props.banner}
			/>
			<Banner banner={props.banner} />
			<Image
				image={props.right.image}
				align="right"
				banner={props.banner}
			/>
		</div>
		<GroupComponent
			group={props.right}
			colour={props.colour}
			align="right"
			faded={props.faded}
		/>
	</div>
);

const GroupComponent = (props: {
	group: Group;
	align: 'left' | 'right';
	colour: Props['colour'];
	faded: Props['faded'];
}) => (
	<p
		style={{
			alignItems: props.align === 'right' ? 'end' : undefined,
			'--before-background-colour': props.group.colour,
		}}
		css={{
			display: 'flex',
			flexDirection: 'column',
			flex: '1 0 0',
			['&:before']: {
				content: '""',
				width: 40,
				height: 4,
				borderRadius: 4,
				marginBottom: 2,
				backgroundColor: 'var(--before-background-colour)',
				[from.phablet]: {
					width: 60,
				},
			},
		}}
	>
		<Name
			name={props.group.name}
			abbreviation={props.group.abbreviation}
			colour={
				props.colour === 'name'
					? props.group.colour
					: textColour(props.faded)
			}
		/>
		<Value
			value={props.group.value}
			colour={
				props.colour === 'value'
					? props.group.colour
					: textColour(props.faded)
			}
			faded={props.faded}
		/>
		{'change' in props.group ? (
			<Change change={props.group.change} />
		) : (
			<Description
				description={props.group.description}
				align={props.align}
				faded={props.faded}
			/>
		)}
	</p>
);

const textColour = (faded: Props['faded']): string =>
	faded ? palette('--versus-text-faded') : palette('--versus-text');

const Name = ({
	name,
	abbreviation,
	colour,
}: {
	name: Group['name'];
	abbreviation: Group['abbreviation'];
	colour: string;
}) => (
	<span
		style={{
			color: colour,
		}}
		css={{
			...headlineMedium20Object,
			lineHeight: 1,
		}}
	>
		<span
			css={{
				display: 'none',
				[from.phablet]: {
					display: 'block',
				},
			}}
		>
			{name}
		</span>
		<span
			css={{
				[from.phablet]: {
					display: 'none',
				},
			}}
		>
			{abbreviation}
		</span>
	</span>
);

const Value = (props: {
	value: Group['value'];
	colour: string;
	faded: Props['faded'];
}) => (
	<span
		style={{
			opacity: props.faded ? 0.42 : undefined,
			color: props.colour,
		}}
		css={{
			...headlineBold42Object,
			lineHeight: 1,
			[from.mobileMedium]: {
				...headlineBold50Object,
				lineHeight: 1,
			},
			[from.desktop]: {
				...headlineBold64Object,
				lineHeight: 1,
			},
		}}
	>
		{props.value}
	</span>
);

const Change = ({ change }: { change: number }) => (
	<span
		css={{
			...headlineBold24Object,
			color: palette('--versus-change'),
		}}
	>
		{`${change > 0 ? '+' : ''}${change}`}
	</span>
);

const Description = (props: {
	description: string;
	align: 'left' | 'right';
	faded: Props['faded'];
}) => (
	<span
		style={{
			textAlign: props.align,
			color: textColour(props.faded),
		}}
		css={textSans12Object}
	>
		{props.description}
	</span>
);

const Image = (props: {
	image: Group['image'];
	align: 'left' | 'right';
	banner: Props['banner'];
}) => {
	if (props.image === undefined) {
		return null;
	}

	const highRes = generateImageURL({
		mainImage: props.image.url.href,
		imageWidth: 75,
		resolution: 'high',
	});
	const lowRes = generateImageURL({
		mainImage: props.image.url.href,
		imageWidth: 75,
		resolution: 'low',
	});

	return (
		<img
			src={lowRes}
			srcSet={`${highRes} 2x`}
			alt={props.image.alt}
			style={
				props.align === 'left'
					? {
							'--margin': '0 55px 0 0',
							'--wider-margin': props.banner
								? '0 90px 0 0'
								: 'var(--margin)',
						}
					: {
							'--margin': '0 0 0 55px',
							'--wider-margin': props.banner
								? '0 0 0 90px'
								: 'var(--margin)',
						}
			}
			css={{
				height: 103,
				[from.mobileLandscape]: {
					margin: 'var(--margin)',
				},
				[from.phablet]: {
					margin: 'var(--wider-margin)',
				},
			}}
		/>
	);
};

const Banner = (props: { banner: string | undefined }) => {
	if (props.banner === undefined) {
		return null;
	}

	return (
		<p
			css={{
				...headlineMedium24Object,
				lineHeight: 1,
				position: 'absolute',
				bottom: -15,
				width: '100%',
				textAlign: 'center',
				[from.mobileLandscape]: {
					bottom: 'unset',
					top: 0,
				},
				[from.phablet]: {
					...headlineMedium34Object,
					lineHeight: 1,
				},
			}}
		>
			<span
				css={{
					display: 'inline-block',
					backgroundColor: palette('--versus-banner-background'),
					color: palette('--versus-banner-text'),
					borderStyle: 'dashed',
					borderWidth: 1,
					borderColor: palette('--versus-banner-border'),
					borderRadius: 2,
					padding: '0 5px 3px 5px',
					[from.phablet]: {
						padding: '0 7px 7px 7px',
					},
				}}
			>
				{props.banner}
			</span>
		</p>
	);
};
