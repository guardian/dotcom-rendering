import { space } from '@guardian/source/foundations';
import {
	Button,
	SvgReload,
	SvgArrowOutdent,
	SvgPlus,
	SvgUpload,
} from '@guardian/source/react-components';
import type { Section } from './appsNav';
import { useDispatch, type HistoryEvent } from './appsNavContext';
import type { ReactNode } from 'react';

type Props = {
	initialSections: Section[];
	history: HistoryEvent[];
	publish: () => Promise<void>;
};

export const MenuActions = (props: Props) => (
	<Menu>
		<Undo history={props.history} />
		<Reset
			history={props.history}
			initialSections={props.initialSections}
		/>
		<AddSection />
		<Publish publish={props.publish} />
	</Menu>
);

const Menu = (props: { children: ReactNode }) => (
	<menu
		css={{
			paddingTop: space[2],
			paddingBottom: space[2],
			paddingLeft: space[5],
			paddingRight: space[5],
			display: 'flex',
		}}
	>
		{props.children}
	</menu>
);

const Undo = (props: { history: Props['history'] }) => {
	const dispatch = useDispatch();

	return (
		<li css={{ paddingRight: space[2] }}>
			<Button
				size="small"
				priority="secondary"
				onClick={() => dispatch({ kind: 'undo' })}
				disabled={props.history.length === 0}
				icon={<SvgReload />}
			>
				Undo
			</Button>
		</li>
	);
};

const Reset = (props: {
	history: Props['history'];
	initialSections: Props['initialSections'];
}) => {
	const dispatch = useDispatch();

	return (
		<li css={{ paddingRight: space[2] }}>
			<Button
				size="small"
				priority="secondary"
				onClick={() =>
					dispatch({
						kind: 'reset',
						initial: props.initialSections,
					})
				}
				disabled={props.history.length === 0}
				type="reset"
				icon={<SvgArrowOutdent />}
			>
				Reset
			</Button>
		</li>
	);
};

const AddSection = () => {
	const dispatch = useDispatch();

	return (
		<li css={{ paddingRight: space[2] }}>
			<Button
				size="small"
				priority="tertiary"
				icon={<SvgPlus />}
				onClick={() => dispatch({ kind: 'insertInto', location: [] })}
			>
				Add Section
			</Button>
		</li>
	);
};

const Publish = (props: { publish: Props['publish'] }) => (
	<li
		css={{
			marginLeft: 'auto',
		}}
	>
		<Button
			size="small"
			priority="primary"
			icon={<SvgUpload />}
			onClick={props.publish}
		>
			Publish
		</Button>
	</li>
);
