import { useCallback, type FormEventHandler, type ReactNode } from 'react';
import { Dialog } from './Dialog';
import { type HistoryEvent } from './state';
import {
	Button,
	SvgArrowDownStraight,
	SvgArrowUpStraight,
	SvgBin,
	SvgEdit,
	SvgPlus,
	SvgUpload,
} from '@guardian/source/react-components';
import {
	headlineBold17Object,
	palette,
	space,
	textEgyptian17Object,
} from '@guardian/source/foundations';
import { useDispatch } from './state';
import { css } from '@emotion/react';
import type { Section } from './appsNav';

type Props = {
	history: HistoryEvent[];
	open: boolean;
	publish: () => void;
};

export const PublishDialog = (props: Props) => {
	const submit: FormEventHandler = useCallback(
		(e) => {
			e.preventDefault();
			props.publish();
		},
		[props.publish],
	);

	return (
		<Dialog heading="Confirm Publication" open={props.open}>
			<form action="" onSubmit={submit} css={textEgyptian17Object}>
				<p css={{ paddingBottom: space[2] }}>
					Here is a summary of your changes:
				</p>
				<Summary history={props.history} />
				<Buttons />
			</form>
		</Dialog>
	);
};

const Summary = (props: { history: HistoryEvent[] }) => (
	<ul
		css={{
			paddingBottom: space[9],
			paddingLeft: space[2],
			strong: headlineBold17Object,
		}}
	>
		{props.history.toReversed().map((evt) => (
			<EventSummary event={evt} />
		))}
	</ul>
);

const EventSummary = (props: { event: HistoryEvent }) => {
	switch (props.event.kind) {
		case 'delete':
			return <DeleteSummary section={props.event.section} />;
		case 'insert':
			return <InsertSummary section={props.event.section} />;
		case 'move':
			return (
				<MoveSummary
					distance={props.event.distance}
					section={props.event.section}
				/>
			);
		case 'update':
			return (
				<UpdateSummary from={props.event.from} to={props.event.to} />
			);
	}
};

const DeleteSummary = (props: { section: Section }) => (
	<SummaryItem icon={<SvgBin />} iconColour={palette.error[400]}>
		Deleted the <strong>{props.section.title}</strong> section
	</SummaryItem>
);

const InsertSummary = (props: { section: Section }) => (
	<SummaryItem icon={<SvgPlus />} iconColour={palette.success[400]}>
		Inserted the <strong>{props.section.title}</strong> section
	</SummaryItem>
);

const MoveSummary = (props: { distance: number; section: Section }) => {
	const movedUp = props.distance < 0;

	return (
		<SummaryItem
			icon={movedUp ? <SvgArrowUpStraight /> : <SvgArrowDownStraight />}
			iconColour={palette.brand[500]}
		>
			Moved the <strong>{props.section.title}</strong> section{' '}
			{movedUp ? ' up ' : ' down '} {Math.abs(props.distance)}
		</SummaryItem>
	);
};

const UpdateSummary = (props: { from: Section; to: Section }) => (
	<SummaryItem icon={<SvgEdit />} iconColour={palette.opinion[400]}>
		Edited the <strong>{props.from.title}</strong> ({props.from.path})
		section to be <strong>{props.to.title}</strong> ({props.to.path})
	</SummaryItem>
);

const SummaryItem = (props: {
	icon: ReactNode;
	iconColour: `#${string}`;
	children: ReactNode;
}) => (
	<li
		css={{
			paddingTop: space[2],
			display: 'flex',
		}}
	>
		<Icon colour={props.iconColour}>{props.icon}</Icon>
		<span>{props.children}</span>
	</li>
);

const Icon = (props: { children: ReactNode; colour: `#${string}` }) => (
	<span
		css={{
			flexBasis: 20,
			marginRight: space[1],
			fill: palette.error[400],
			display: 'inline-block',
			verticalAlign: 'middle',
			flexShrink: 0,
		}}
		style={{
			fill: props.colour,
		}}
	>
		{props.children}
	</span>
);

const Buttons = () => {
	const dispatch = useDispatch();

	const cancel = useCallback(() => {
		dispatch({ kind: 'cancelPrePublish' });
	}, [dispatch]);

	return (
		<>
			<Button type="submit" icon={<SvgUpload />}>
				Publish
			</Button>
			<Button
				cssOverrides={css({ marginLeft: space[2] })}
				onClick={cancel}
				priority="tertiary"
			>
				Cancel
			</Button>
		</>
	);
};
