import { from, textSans12Object } from '@guardian/source/foundations';
import type { ReactNode } from 'react';
import { palette } from '../../palette';

type Props = {
	/**
	 * The sections into which the stacked progress bar will be broken. For more
	 * information see {@linkcode Section}.
	 */
	sections: Section[];
	/**
	 * The maximum number the stacked progress bar can reach. For an election,
	 * this would be the number of results expected. Must be an integer (a whole
	 * number). If there are excluded sections, e.g. "holdovers", seats that are
	 * not up for election this time, they **should not** be included in this
	 * number.
	 *
	 * **Examples:** number of constituencies up for election; total electoral
	 * college votes.
	 */
	total: number;
	/**
	 * When this is specified, the bar will include a line down the centre and
	 * apply the label text to it. The groups being elected can then be arranged
	 * on either side of this line by setting their
	 * {@linkcode Section.align|align} property. If
	 * {@linkcode Props.calculateWinner|calculateWinner} is set to `true`, that
	 * number will be prepended onto this label.
	 *
	 * @example
	 * <caption>This will generate the text "326 for majority"</caption>
	 * <StackedProgress
	 *   calculateWinner={true}
	 *   total={650}
	 *   label="for majority"
	 * />
	 */
	label: string | undefined;
	/**
	 * When this is specified, the bar will include a line down the centre that
	 * represents a target needed to win the election by achieving a majority.
	 * The groups being elected can then be arranged on either side of this line
	 * by setting their {@linkcode Section.align|align} property. The majority
	 * needed will be calculated automatically based on the
	 * {@linkcode Props.total|total}.
	 *
	 * If {@linkcode Props.label|label} is also specified, that text will be
	 * appended to the calculated number.
	 *
	 * @example
	 * <caption>This will generate the text "270 to win"</caption>
	 * <StackedProgress calculateWinner={true} total={538} label="to win" />
	 *
	 * @example
	 * <caption>This will generate the text "326 for majority"</caption>
	 * <StackedProgress
	 *   calculateWinner={true}
	 *   total={650}
	 *   label="for majority"
	 * />
	 */
	calculateWinner: boolean;
	/**
	 * If there are sections excluded from the results (see
	 * {@linkcode Section.exclude|exclude}), this copy will be shown alongside
	 * those sections. For example, "No election".
	 */
	excludedCopy: string | undefined;
	/**
	 * Allows additional styles to be passed via the `css` prop.
	 */
	className?: string;
};

/**
 * A section of the stacked progress bar. For an election each section would
 * represent a group that's running. Examples: seats won by a party; votes won
 * by a candidate.
 */
type Section = {
	/**
	 * The colour used to represent the group in the stacked progress bar. It
	 * expects a CSS `color` value (e.g. a hex string). To ensure dark mode
	 * support a {@linkcode palette} colour can be used; i.e. this property
	 * can be set to the return value of the {@linkcode palette} function.
	 */
	colour: string;
	/**
	 * The size of a particular section of the progress bar, less than the
	 * {@linkcode Props.total|total}. For an election, this would be the result
	 * for the group in question.
	 *
	 * **Examples:** seats won by a party; votes won by a candidate.
	 */
	value: number;
	/**
	 * The name of the section in the stacked progress bar. For an election,
	 * this would be the name of the group. It will be used to provide an
	 * accessible description of that section and as a React "key" for the
	 * element, so each section's `name` should be unique relative to the
	 * other sections.
	 *
	 * **Examples:** name of a candidate; name of a party.
	 */
	name: string;
	/**
	 * Aligns a section to the left or right side of the stacked progress bar.
	 * For an election this can be used to represent two or more groups in
	 * opposition to one another. When used in conjunction with
	 * {@linkcode Props.toWinCopy|toWinCopy} it can be used to show two or more
	 * groups competing for a majority.
	 */
	align: 'left' | 'right';
	/**
	 * Whether this section should be included or excluded from calculations. If
	 * excluded it will be styled in a different way to sections that are
	 * included. Useful for representing "holdovers", i.e. seats that are not up
	 * for election this time.
	 */
	exclude: boolean;
};

/**
 * Represents progress towards a goal divided into groups. Designed to be used
 * in election trackers, where it can be used to show progress through an
 * election divided up by each group running.
 *
 * It's generic, so the kinds of groups it can represent varies. For example:
 *
 *  - Candidates in a US presidential election
 *  - Parties in a UK general election
 *  - Party groups in an EU parliamentary election
 *
 * These examples are demonstrated in the stories for this component.
 */
export const StackedProgress = (props: Props) => {
	const value = barValue(props.sections);
	const totalWithExcluded = barTotalWithExcluded(props.sections, props.total);
	const includeLabel = props.label !== undefined || props.calculateWinner;

	return (
		<Label
			totalWithExcluded={totalWithExcluded}
			includeLabel={includeLabel}
			label={props.label}
			calculateWinner={props.calculateWinner}
			className={props.className}
		>
			<ProgressBar
				total={props.total}
				value={value}
				sections={props.sections}
				excludedCopy={props.excludedCopy}
				className={includeLabel ? undefined : props.className}
			>
				{props.sections
					.filter((section) => section.align === 'left')
					.map((section) => (
						<SectionDiv
							section={section}
							totalWithExcluded={totalWithExcluded}
							key={`${section.name}-${section.exclude}`}
							excludedCopy={props.excludedCopy}
						/>
					))}
				<SectionDiv
					section={spacer(props.total, value)}
					totalWithExcluded={totalWithExcluded}
					excludedCopy={props.excludedCopy}
				/>
				{props.sections
					.filter((section) => section.align === 'right')
					.toReversed()
					.map((section) => (
						<SectionDiv
							section={section}
							totalWithExcluded={totalWithExcluded}
							key={`${section.name}-${section.exclude}`}
							excludedCopy={props.excludedCopy}
						/>
					))}
			</ProgressBar>
		</Label>
	);
};

/**
 * The progress made through the election to be represented on the progress bar,
 * ignoring excluded sections (e.g. seats that are not up for election this
 * time).
 */
const barValue = (sections: Section[]): number =>
	sections.reduce(
		(value, section) => (section.exclude ? value : value + section.value),
		0,
	);

/**
 * Although the progress of the bar is towards a total provided in
 * {@linkcode Props.total|total}, the actual drawn bar is larger because it
 * contains excluded sections too (e.g. seats that are not up for election this
 * time). Therefore, to get the full width of the bar we have to add on all the
 * values of the excluded sections.
 */
const barTotalWithExcluded = (sections: Section[], total: number) =>
	sections.reduce(
		(acc, section) => (section.exclude ? acc + section.value : acc),
		total,
	);

/**
 * The enclosing progress bar, with {@linkcode SectionDiv}s to be passed as
 * `children`.
 */
const ProgressBar = (props: {
	total: number;
	value: number;
	sections: Section[];
	children: ReactNode;
	excludedCopy: string | undefined;
	className?: string;
}) => (
	<div
		aria-label={`Progress to ${props.total}`}
		role="progressbar"
		aria-valuetext={valueText(
			props.value,
			props.sections,
			props.excludedCopy,
		)}
		aria-valuenow={props.value}
		aria-valuemax={props.total}
		css={{
			display: 'flex',
			width: '100%',
			height: '48px',
			[from.desktop]: {
				height: '44px',
			},
		}}
		className={props.className}
	>
		{props.children}
	</div>
);

/**
 * The sections to be included in the {@linkcode ProgressBar}.
 */
const SectionDiv = (props: {
	section: Section;
	totalWithExcluded: number;
	excludedCopy: string | undefined;
}) => (
	<div
		css={{
			display: 'flex',
			overflow: 'hidden',
			'::before': {
				...textSans12Object,
				backgroundColor: palette(
					'--stacked-progress-excluded-background',
				),
				display: 'var(--excluded-copy-display)',
				content: 'var(--excluded-copy)',
				alignSelf: 'flex-end',
				padding: '0 4px',
			},
		}}
		style={{
			flex: `0 1 ${(props.section.value * 100) / props.totalWithExcluded}%`,
			justifyContent:
				props.section.align === 'left' ? 'flex-start' : 'flex-end',
			background: props.section.exclude
				? excludedBackground(props.section.colour)
				: props.section.colour,
			'--excluded-copy-display':
				props.section.exclude && props.excludedCopy !== undefined
					? 'block'
					: 'none',
			'--excluded-copy':
				props.excludedCopy !== undefined
					? `"${props.excludedCopy}"`
					: undefined,
		}}
	/>
);

/**
 * Excluded sections in the bar are represented with a vertical stripe pattern.
 */
const excludedBackground = (colour: string): string =>
	`repeating-linear-gradient(${[
		'to right',
		colour,
		`${colour} 1px`,
		`${palette('--stacked-progress-excluded-background')} 1px`,
		`${palette('--stacked-progress-excluded-background')} 2px`,
	].join(', ')})`;

/**
 * The label that may appear above the bar alongside a central line. See
 * {@linkcode Props.label|label} and
 * {@linkcode Props.calculateWinner|calculateWinner}.
 */
const Label = (props: {
	children: ReactNode;
	totalWithExcluded: number;
	includeLabel: boolean;
	label: string | undefined;
	calculateWinner: boolean;
	className: string | undefined;
}) =>
	props.includeLabel ? (
		<label
			css={{
				position: 'relative',
				display: 'block',
				'&:after': {
					content: '""',
					position: 'absolute',
					backgroundColor: palette('--stacked-progress-to-win'),
					height: '120%',
					width: '1px',
					left: 'calc(50% - 0.5px)',
					top: '-15%',
				},
			}}
			className={props.className}
		>
			<span
				css={{
					...textSans12Object,
					position: 'absolute',
					left: 'calc(50%)',
					transform: 'translateX(-50%)',
					top: '-55%',
					color: palette('--stacked-progress-to-win'),
				}}
			>
				{`${props.calculateWinner ? toWin(props.totalWithExcluded) : ''} ${props.label ?? ''}`.trim()}
			</span>
			{props.children}
		</label>
	) : (
		<>{props.children}</>
	);

/**
 * An empty section to create space in the bar before progress has reached 100%.
 */
const spacer = (total: number, value: number): Section => ({
	colour: palette('--stacked-progress-background'),
	value: total - value,
	name: 'spacer',
	align: 'left',
	exclude: false,
});

/**
 * For a bar representing competing values on the left and right, where success
 * is measured as a majority (e.g. in elections). This calculates the number at
 * which a majority is reached, based on the total size of the bar.
 */
const toWin = (totalWithExcluded: number): number =>
	Math.floor(totalWithExcluded / 2) + 1;

/**
 * Describes the state of the bar in words.
 */
const valueText = (
	value: number,
	sections: Section[],
	excludedCopy: string | undefined,
): string => {
	const included = sections.filter((section) => !section.exclude);
	const excluded = sections.filter((section) => section.exclude);

	const includedSummary = `values: ${summary(included)}`;
	const excludedSummary =
		excluded.length > 0
			? `, ${excludedCopy ?? 'excluded'}: ${summary(excluded)}`
			: '';

	return `Progress so far: ${value}, ${includedSummary}${excludedSummary}.`;
};

const summary = (sections: Section[]): string =>
	sections.map((section) => `${section.name} ${section.value}`).join(', ');
