import { css } from '@emotion/react';
import { space } from '@guardian/source/foundations';
import {
	Button,
	SvgArrowDownStraight,
	SvgArrowUpStraight,
	SvgBin,
	SvgEdit,
	SvgPlus,
} from '@guardian/source/react-components';
import type { MobileOverride } from './appsNav';
import { useDispatch } from './state';

type Props = {
	location: number[];
	title: string;
	path: string;
	mobileOverride: MobileOverride | undefined;
	index: number;
	numberOfSections: number;
};

export const SectionButtons = (props: Props) => (
	<>
		<Edit
			location={props.location}
			title={props.title}
			path={props.path}
			mobileOverride={props.mobileOverride}
		/>
		<Delete location={props.location} />
		<MoveUp location={props.location} index={props.index} />
		<MoveDown
			location={props.location}
			index={props.index}
			numberOfSections={props.numberOfSections}
		/>
		<AddSubsection location={props.location} />
	</>
);

const Edit = (props: {
	location: Props['location'];
	title: Props['title'];
	path: Props['path'];
	mobileOverride: Props['mobileOverride'];
}) => {
	const dispatch = useDispatch();

	return (
		<Button
			size="xsmall"
			priority="primary"
			icon={<SvgEdit />}
			hideLabel={true}
			onClick={() =>
				dispatch({
					kind: 'edit',
					location: props.location,
					title: props.title,
					path: props.path,
					mobileOverride: props.mobileOverride,
				})
			}
		>
			Edit
		</Button>
	);
};

const Delete = (props: { location: Props['location'] }) => {
	const dispatch = useDispatch();

	return (
		<Button
			size="xsmall"
			priority="primary"
			icon={<SvgBin />}
			hideLabel={true}
			onClick={() =>
				dispatch({ kind: 'delete', location: props.location })
			}
			cssOverrides={css({
				marginLeft: space[1],
			})}
		>
			Delete
		</Button>
	);
};

const MoveUp = (props: { location: Props['location']; index: number }) => {
	const dispatch = useDispatch();

	return (
		<Button
			size="xsmall"
			priority="secondary"
			icon={<SvgArrowUpStraight />}
			disabled={props.index === 0}
			hideLabel={true}
			onClick={() =>
				dispatch({ kind: 'moveUp', location: props.location })
			}
			cssOverrides={css({
				marginLeft: space[1],
			})}
		>
			Move Up
		</Button>
	);
};

const MoveDown = (props: {
	location: Props['location'];
	index: number;
	numberOfSections: number;
}) => {
	const dispatch = useDispatch();

	return (
		<Button
			size="xsmall"
			priority="secondary"
			icon={<SvgArrowDownStraight />}
			disabled={props.index === props.numberOfSections - 1}
			hideLabel={true}
			onClick={() =>
				dispatch({ kind: 'moveDown', location: props.location })
			}
			cssOverrides={css({
				marginLeft: space[1],
			})}
		>
			Move Down
		</Button>
	);
};

const AddSubsection = (props: { location: Props['location'] }) => {
	const dispatch = useDispatch();

	return (
		<Button
			size="xsmall"
			priority="tertiary"
			icon={<SvgPlus />}
			hideLabel={true}
			onClick={() =>
				dispatch({ kind: 'insertInto', location: props.location })
			}
			cssOverrides={css({
				marginLeft: space[1],
				marginRight: space[2],
			})}
		>
			Add Subsection
		</Button>
	);
};
