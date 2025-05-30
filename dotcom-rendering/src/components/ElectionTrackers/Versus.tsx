import { css } from '@emotion/react';
import {
	from,
	headlineBold24,
	headlineBold42,
	headlineBold50,
	headlineBold64,
	headlineMedium20,
	headlineMedium24,
	headlineMedium34,
	textSans12,
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
	colour: 'name' | 'value';
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
	image: {
		url: URL;
		alt: string;
	};
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

export const Versus = ({ left, right, colour, faded, banner }: Props) => (
	<div
		css={{
			display: 'flex',
			justifyContent: 'space-between',
		}}
	>
		<GroupComponent
			group={left}
			colour={colour}
			align="left"
			faded={faded}
		/>
		<div css={{ position: 'relative' }}>
			<Image image={left.image} align="left" banner={banner} />
			<Banner banner={banner} />
			<Image image={right.image} align="right" banner={banner} />
		</div>
		<GroupComponent
			group={right}
			colour={colour}
			align="right"
			faded={faded}
		/>
	</div>
);

const GroupComponent = ({
	group,
	align,
	colour,
	faded,
}: {
	group: Group;
	align: 'left' | 'right';
	colour: Props['colour'];
	faded: Props['faded'];
}) => (
	<p
		style={{
			alignItems: align === 'right' ? 'end' : undefined,
			'--before-background-colour': group.colour,
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
			name={group.name}
			abbreviation={group.abbreviation}
			colour={colour === 'name' ? group.colour : textColour(faded)}
		/>
		<Value
			value={group.value}
			colour={colour === 'value' ? group.colour : textColour(faded)}
			faded={faded}
		/>
		{'change' in group ? (
			<Change change={group.change} />
		) : (
			<Description
				description={group.description}
				align={align}
				faded={faded}
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
			['&']: css(headlineMedium20),
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

const Value = ({
	value,
	colour,
	faded,
}: {
	value: Group['value'];
	colour: string;
	faded: Props['faded'];
}) => (
	<span
		style={{
			opacity: faded ? 0.42 : undefined,
			color: colour,
		}}
		css={{
			['&']: css(headlineBold42),
			lineHeight: 1,
			[from.mobileMedium]: [css(headlineBold50), { lineHeight: 1 }],
			[from.desktop]: [css(headlineBold64), { lineHeight: 1 }],
		}}
	>
		{value}
	</span>
);

const Change = ({ change }: { change: number }) => (
	<span
		css={{
			['&']: css(headlineBold24),
			color: palette('--versus-change'),
		}}
	>
		{`${change > 0 ? '+' : ''}${change}`}
	</span>
);

const Description = ({
	description,
	align,
	faded,
}: {
	description: string;
	align: 'left' | 'right';
	faded: Props['faded'];
}) => (
	<span
		style={{
			textAlign: align,
			color: textColour(faded),
		}}
		css={{
			['&']: css(textSans12),
		}}
	>
		{description}
	</span>
);

const Image = ({
	image,
	align,
	banner,
}: {
	image: Group['image'];
	align: 'left' | 'right';
	banner: Props['banner'];
}) => {
	const highRes = generateImageURL({
		mainImage: image.url.href,
		imageWidth: 75,
		resolution: 'high',
	});
	const lowRes = generateImageURL({
		mainImage: image.url.href,
		imageWidth: 75,
		resolution: 'low',
	});

	return (
		<img
			src={lowRes}
			srcSet={`${highRes} 2x`}
			alt={image.alt}
			style={
				align === 'left'
					? {
							'--margin': '0 55px 0 0',
							'--wider-margin': banner
								? '0 90px 0 0'
								: 'var(--margin)',
					  }
					: {
							'--margin': '0 0 0 55px',
							'--wider-margin': banner
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

const Banner = ({ banner }: { banner: string | undefined }) => {
	if (banner === undefined) {
		return null;
	}

	return (
		<p
			css={{
				['&']: css(headlineMedium24),
				lineHeight: 1,
				position: 'absolute',
				bottom: -15,
				width: '100%',
				textAlign: 'center',
				[from.mobileLandscape]: {
					bottom: 'unset',
					top: 0,
				},
				[from.phablet]: [css(headlineMedium34), { lineHeight: 1 }],
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
				{banner}
			</span>
		</p>
	);
};
