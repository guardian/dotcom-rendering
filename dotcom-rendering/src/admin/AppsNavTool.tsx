import {
	headlineBold17Object,
	palette,
	space,
} from '@guardian/source/foundations';
import {
	useReducer,
	useState,
	type FormEventHandler,
	type ReactNode,
} from 'react';
import { type AppsNav, type Section } from './appsNav';
import {
	Button,
	SvgArrowDownStraight,
	SvgArrowOutdent,
	SvgArrowUpStraight,
	SvgBin,
	SvgChevronDownSingle,
	SvgPlus,
	SvgReload,
	TextInput,
} from '@guardian/source/react-components';
import { css } from '@emotion/react';
import {
	DispatchContext,
	reducer,
	useDispatch,
	type HistoryEvent,
} from './appsNavContext';

type Props = {
	ukNav: AppsNav;
	guardianBaseUrl: string;
};

export const AppsNavTool = (props: Props) => {
	const [state, dispatch] = useReducer(reducer, {
		sections: props.ukNav.pillars,
		history: [],
	});

	return (
		<DispatchContext.Provider value={dispatch}>
			<MenuActions
				initialSections={props.ukNav.pillars}
				history={state.history}
			/>
			<InsertDialog insertingAt={state.insertingAt} />
			{state.error !== undefined ? <p>{state.error}</p> : null}
			<Sections
				sections={state.sections}
				guardianBaseUrl={props.guardianBaseUrl}
				location={[]}
			/>
		</DispatchContext.Provider>
	);
};

const MenuActions = (props: {
	initialSections: Section[];
	history: HistoryEvent[];
}) => {
	const dispatch = useDispatch();

	return (
		<menu
			css={{
				paddingTop: space[2],
				paddingBottom: space[2],
				paddingLeft: space[4],
				li: {
					display: 'inline',
					paddingRight: space[1],
				},
			}}
		>
			<li>
				<Button
					size="small"
					priority="tertiary"
					onClick={() => dispatch({ kind: 'undo' })}
					disabled={props.history.length === 0}
					icon={<SvgReload />}
				>
					Undo
				</Button>
			</li>
			<li>
				<Button
					size="small"
					priority="tertiary"
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
			<li>
				<Button
					size="small"
					priority="tertiary"
					icon={<SvgPlus />}
					onClick={() =>
						dispatch({ kind: 'insertInto', location: [] })
					}
				>
					Add Section
				</Button>
			</li>
		</menu>
	);
};

const Sections = (props: {
	sections: Section[];
	guardianBaseUrl: string;
	location: number[];
}) => (
	<ul css={{ paddingLeft: 20 }}>
		{props.sections.map((section, index) => (
			<Section
				key={`${section.title}-${section.path}`}
				section={section}
				guardianBaseUrl={props.guardianBaseUrl}
				location={[...props.location, index]}
			/>
		))}
	</ul>
);

const Section = (props: {
	section: Section;
	guardianBaseUrl: string;
	location: number[];
}) => {
	const hasSubsections = props.section.sections?.length ?? 0 > 0;

	return (
		<li css={{ borderTop: '1px solid lightgrey' }}>
			<details>
				<summary
					css={{
						display: 'flex',
						paddingTop: space[1],
						paddingBottom: space[1],
						alignItems: 'center',
					}}
				>
					<SectionActions location={props.location} />
					<span
						css={{
							width: 20,
							cursor: 'pointer',
							'[open] &': {
								transform: 'rotate(180deg)',
							},
							svg: {
								verticalAlign: 'middle',
							},
						}}
					>
						{hasSubsections ? <SvgChevronDownSingle /> : null}
					</span>
					<Title location={props.location}>
						{props.section.title}
					</Title>{' '}
					<Path
						path={props.section.path}
						guardianBaseUrl={props.guardianBaseUrl}
					/>
				</summary>
				{props.section.sections !== undefined ? (
					<Sections
						sections={props.section.sections}
						guardianBaseUrl={props.guardianBaseUrl}
						location={props.location}
					/>
				) : null}
			</details>
		</li>
	);
};

const Title = (props: { children: ReactNode; location: number[] }) => (
	<span
		css={{
			...headlineBold17Object,
			paddingLeft: space[2],
		}}
	>
		{props.children}
	</span>
);

const Path = (props: { path: string; guardianBaseUrl: string }) => (
	<span
		css={{
			fontSize: 17,
			fontFamily: 'monospace',
			marginLeft: space[2],
		}}
	>
		<a
			href={new URL(props.path, props.guardianBaseUrl).href}
			css={{ color: palette.brand[500] }}
		>
			{props.path}
		</a>
	</span>
);

const SectionActions = (props: { location: number[] }) => {
	const dispatch = useDispatch();

	return (
		<>
			<Button
				size="xsmall"
				priority="primary"
				icon={<SvgArrowUpStraight />}
				hideLabel
				onClick={() =>
					dispatch({ kind: 'moveUp', location: props.location })
				}
			>
				Move Up
			</Button>
			<Button
				size="xsmall"
				priority="primary"
				icon={<SvgArrowDownStraight />}
				hideLabel
				onClick={() =>
					dispatch({ kind: 'moveDown', location: props.location })
				}
				cssOverrides={css({
					marginLeft: space[1],
				})}
			>
				Move Down
			</Button>
			<Button
				size="xsmall"
				priority="secondary"
				icon={<SvgBin />}
				hideLabel
				onClick={() =>
					dispatch({ kind: 'delete', location: props.location })
				}
				cssOverrides={css({
					marginLeft: space[1],
				})}
			>
				Delete
			</Button>
			<Button
				size="xsmall"
				priority="tertiary"
				icon={<SvgPlus />}
				hideLabel
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
		</>
	);
};

const InsertDialog = (props: { insertingAt: number[] | undefined }) => {
	const [title, setTitle] = useState('');
	const [path, setPath] = useState('');
	const dispatch = useDispatch();

	const submit: FormEventHandler = (e) => {
		e.preventDefault();

		if (props.insertingAt !== undefined) {
			dispatch({
				kind: 'insert',
				section: {
					title,
					path,
				},
				location: props.insertingAt,
			});
		}
	};

	const cancel = () => {
		dispatch({ kind: 'cancelInsert' });
	};

	return (
		<dialog open={props.insertingAt !== undefined}>
			<form action="" onSubmit={submit}>
				<TextInput
					label="Title"
					value={title}
					onChange={(e) => setTitle(e.target.value)}
				/>
				<TextInput
					label="Path"
					value={path}
					onChange={(e) => setPath(e.target.value)}
				/>
				<Button type="submit">Insert</Button>
				<Button onClick={cancel} priority="tertiary">
					Cancel
				</Button>
			</form>
		</dialog>
	);
};
