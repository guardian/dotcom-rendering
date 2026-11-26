import { space } from '@guardian/source/foundations';
import { palette } from '../../palette';
import { ProgressNumber } from './ProgressNumber';
import { StackedProgress } from './StackedProgress';
import { Versus } from './Versus';

type Props = {
	/**
	 * The total number of seats up for election.
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
	 * The number of races called for this group so far.
	 */
	value: number;
	/**
	 * The net change in seats for this group so far.
	 */
	change: number;
};

/**
 * Represents results from elections to the US House of Representatives. It can
 * be used on its own, or as part of the `USCongress` component, which also
 * includes the Senate.
 */
export const USHouse = (props: Props) => (
	<>
		<Versus
			left={{
				name: `Democrats${democratIndependents(props) ? '*' : ''}`,
				abbreviation: `Democrats${democratIndependents(props) ? '*' : ''}`,
				value: props.democrats.value + props.caucusWithDemocrats.value,
				change:
					props.democrats.change + props.caucusWithDemocrats.change,
				image: undefined,
				colour: palette('--us-elections-democrats'),
			}}
			right={{
				name: `Republicans${republicanIndependents(props) ? '*' : ''}`,
				abbreviation: `Republicans${republicanIndependents(props) ? '*' : ''}`,
				value:
					props.republicans.value + props.caucusWithRepublicans.value,
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
			label="to win"
			calculateWinner={true}
			excludedCopy={undefined}
			sections={[
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
					value: props.others.value,
					align: 'left',
					exclude: false,
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
	props.caucusWithDemocrats.value > 0;

const republicanIndependents = (props: Props) =>
	props.caucusWithRepublicans.value > 0;
