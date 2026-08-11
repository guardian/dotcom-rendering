import { space } from '@guardian/source/foundations';
import { palette } from '../../palette';
import { ProgressNumber } from './ProgressNumber';
import { StackedProgress } from './StackedProgress';
import { Versus } from './Versus';

type Props = {
	/**
	 * The total number of seats up for election, excluding holdovers.
	 */
	total: number;
	democrats: Group;
	caucusWithDemocrats: Group;
	republicans: Group;
	caucusWithRepublicans: Group;
	others: Group;
};

type Group = {
	/**
	 * The number of races called for the this group so far.
	 */
	value: number;
	/**
	 * The net change in seats for this group so far.
	 */
	change: number;
	/**
	 * The number of seats held by this group that are not up for election this
	 * time.
	 */
	holdovers: number;
};

/**
 * Represents results from elections to the US Senate. It can be used on its
 * own, or as part of the `USCongress` component, which also includes the House.
 */
export const USSenate = (props: Props) => (
	<>
		<Versus
			left={{
				name: `Democrats${democratIndependents(props) ? '*' : ''}`,
				abbreviation: `Democrats${democratIndependents(props) ? '*' : ''}`,
				value:
					props.democrats.value +
					props.caucusWithDemocrats.value +
					props.democrats.holdovers +
					props.caucusWithDemocrats.holdovers,
				change:
					props.democrats.change + props.caucusWithDemocrats.change,
				image: undefined,
				colour: palette('--us-elections-democrats'),
			}}
			right={{
				name: `Republicans${republicanIndependents(props) ? '*' : ''}`,
				abbreviation: `Republicans${republicanIndependents(props) ? '*' : ''}`,
				value:
					props.republicans.value +
					props.caucusWithRepublicans.value +
					props.republicans.holdovers +
					props.caucusWithRepublicans.holdovers,
				change:
					props.republicans.change +
					props.caucusWithRepublicans.change,
				image: undefined,
				colour: palette('--us-elections-republicans'),
			}}
			colour="none"
			faded={false}
			banner={undefined}
		/>
		<StackedProgress
			total={props.total}
			label="50"
			calculateWinner={false}
			excludedCopy="No election"
			sections={[
				{
					name: 'Democrats',
					colour: palette('--us-elections-democrats-alt'),
					value:
						props.democrats.holdovers +
						props.caucusWithDemocrats.holdovers,
					align: 'left',
					exclude: true,
				},
				{
					name: 'Democrats',
					colour: palette('--us-elections-democrats'),
					value:
						props.democrats.value + props.caucusWithDemocrats.value,
					align: 'left',
					exclude: false,
				},
				{
					name: 'Others',
					colour: palette('--us-elections-others'),
					value: props.others.holdovers,
					align: 'left',
					exclude: true,
				},
				{
					name: 'Others',
					colour: palette('--us-elections-others'),
					value: props.others.value,
					align: 'left',
					exclude: false,
				},
				{
					name: 'Republicans',
					colour: palette('--us-elections-republicans-alt'),
					value:
						props.republicans.holdovers +
						props.caucusWithRepublicans.holdovers,
					align: 'right',
					exclude: true,
				},
				{
					name: 'Republicans',
					colour: palette('--us-elections-republicans'),
					value:
						props.republicans.value +
						props.caucusWithRepublicans.value,
					align: 'right',
					exclude: false,
				},
			]}
			css={{
				paddingTop: space[2],
			}}
		/>
		<ProgressNumber
			progress={
				props.democrats.value +
				props.caucusWithDemocrats.value +
				props.republicans.value +
				props.caucusWithRepublicans.value +
				props.others.value
			}
			total={props.total}
			copy="races called"
			additionalCopy={
				democratIndependents(props) || republicanIndependents(props)
					? '*includes independents'
					: undefined
			}
		/>
	</>
);

const democratIndependents = (props: Props) =>
	props.caucusWithDemocrats.holdovers > 0 ||
	props.caucusWithDemocrats.value > 0;

const republicanIndependents = (props: Props) =>
	props.caucusWithRepublicans.holdovers > 0 ||
	props.caucusWithRepublicans.value > 0;
