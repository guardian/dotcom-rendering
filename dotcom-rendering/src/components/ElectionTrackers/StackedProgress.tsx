import { from, textSans12 } from '@guardian/source/foundations';
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
	 * number).
	 *
	 * **Examples:** number of constituencies up for election; total electoral
	 * college votes.
	 */
	total: number;
	/**
	 * When this is specified, the bar will include a line down the centre that
	 * represents a target needed to win the election by achieving a majority.
	 * The groups being elected can then be arranged on either side of this line
	 * by setting their {@linkcode Section.align|align} property. The majority
	 * needed will be calculated automatically based on the
	 * {@linkcode Props.total|total}.
	 *
	 * The copy specified here will be prefixed by the majority number and used
	 * to label the stacked progress bar, and will appear above the central
	 * line.
	 *
	 * **Examples:** Specify {@linkcode Props.total|total} as 538 and this prop
	 * as "to win" to get "270 to win"; specify {@linkcode Props.total|total} as
	 * 650 and this prop as "for majority" to get "326 for majority".
	 */
	toWinCopy: string | undefined;
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
export const StackedProgress = ({ sections, total, toWinCopy }: Props) => {
	const value = sections.reduce((acc, section) => acc + section.value, 0);

	return (
		<Label total={total} toWinCopy={toWinCopy}>
			<div
				aria-label={`Progress to ${total}`}
				role="progressbar"
				aria-valuetext={valueText(value, sections)}
				aria-valuenow={value}
				aria-valuemax={total}
				css={{
					display: 'flex',
					width: '100%',
					height: '48px',
					[from.desktop]: {
						height: '44px',
					},
				}}
			>
				{sections
					.filter((section) => section.align === 'left')
					.map((section) => (
						<SectionDiv
							section={section}
							total={total}
							key={section.name}
						/>
					))}
				<SectionDiv section={spacer(total, value)} total={total} />
				{sections
					.filter((section) => section.align === 'right')
					.toReversed()
					.map((section) => (
						<SectionDiv
							section={section}
							total={total}
							key={section.name}
						/>
					))}
			</div>
		</Label>
	);
};

type SectionDivProps = {
	section: Section;
	total: number;
};

const SectionDiv = ({ section, total }: SectionDivProps) => (
	<div
		css={{
			flex: `0 1 ${(section.value * 100) / total}%`,
			backgroundColor: section.colour,
		}}
	/>
);

type LabelProps = {
	children: ReactNode;
	total: number;
	toWinCopy: string | undefined;
};

const Label = ({ children, total, toWinCopy }: LabelProps) =>
	toWinCopy === undefined ? (
		<>{children}</>
	) : (
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
		>
			<span
				css={[
					{
						position: 'absolute',
						left: 'calc(50%)',
						transform: 'translateX(-50%)',
						top: '-55%',
						color: palette('--stacked-progress-to-win'),
					},
					textSans12,
				]}
			>
				{toWin(total)} {toWinCopy}
			</span>
			{children}
		</label>
	);

const spacer = (total: number, value: number): Section => ({
	colour: palette('--stacked-progress-background'),
	value: total - value,
	name: 'spacer',
	align: 'left',
});

const toWin = (total: number): number => Math.floor(total / 2) + 1;

const valueText = (value: number, sections: Section[]): string =>
	`Progress so far: ${value}, values: ${sections
		.map((section) => `${section.name} ${section.value}`)
		.join(', ')}`;
