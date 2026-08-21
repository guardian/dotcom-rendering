import type { Breakpoint } from '@guardian/source/foundations';
import type { ComponentProps } from 'react';
import { ChangeBars } from './ChangeBars';
import { OnwardLink } from './OnwardLink';
import { ProgressNumber } from './ProgressNumber';
import { SideBySide } from './SideBySide';
import { StackedProgress } from './StackedProgress';
import { ValuesWithChange } from './ValuesWithChange';
import { Versus } from './Versus';

type Props = {
	components: Component[];
};

type Component = Layout | ElectionElement;

type Layout = {
	kind: 'sideBySide';
	from: Breakpoint;
	left: {
		heading: string;
		children: ElectionElement[];
	};
	right: {
		heading: string;
		children: ElectionElement[];
	};
};

type ElectionElement =
	| {
			kind: 'changeBars';
			props: ComponentProps<typeof ChangeBars>;
	  }
	| {
			kind: 'onwardLink';
			props: ComponentProps<typeof OnwardLink>;
	  }
	| {
			kind: 'progressNumber';
			props: ComponentProps<typeof ProgressNumber>;
	  }
	| {
			kind: 'stackedProgress';
			props: ComponentProps<typeof StackedProgress>;
	  }
	| {
			kind: 'valuesWithChange';
			props: ComponentProps<typeof ValuesWithChange>;
	  }
	| {
			kind: 'versus';
			props: ComponentProps<typeof Versus>;
	  };

export const ElectionTracker = (props: Props) => (
	<>
		{props.components.map((component) => (
			<ElectionComponent key={component.kind} component={component} />
		))}
	</>
);

const ElectionComponent = ({ component }: { component: Component }) => {
	switch (component.kind) {
		case 'sideBySide':
			return (
				<SideBySide
					from={component.from}
					left={{
						heading: component.left.heading,
						children: (
							<ElectionTracker
								components={component.left.children}
							/>
						),
					}}
					right={{
						heading: component.right.heading,
						children: (
							<ElectionTracker
								components={component.right.children}
							/>
						),
					}}
				/>
			);
		case 'changeBars':
			return <ChangeBars changes={component.props.changes} />;
		case 'onwardLink':
			return (
				<OnwardLink
					link={component.props.link}
					text={component.props.text}
				/>
			);
		case 'progressNumber':
			return (
				<ProgressNumber
					copy={component.props.copy}
					additionalCopy={component.props.additionalCopy}
					progress={component.props.progress}
					total={component.props.total}
				/>
			);
		case 'stackedProgress':
			return (
				<StackedProgress
					calculateWinner={component.props.calculateWinner}
					excludedCopy={component.props.excludedCopy}
					label={component.props.label}
					total={component.props.total}
					sections={component.props.sections}
				/>
			);
		case 'valuesWithChange':
			return (
				<ValuesWithChange
					changeDescription={component.props.changeDescription}
					valueDescription={component.props.valueDescription}
					values={component.props.values}
				/>
			);
		case 'versus':
			return (
				<Versus
					banner={component.props.banner}
					colour={component.props.colour}
					faded={component.props.faded}
					left={component.props.left}
					right={component.props.right}
				/>
			);
	}
};
