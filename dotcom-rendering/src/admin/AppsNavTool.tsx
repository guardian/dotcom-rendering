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
	InlineError,
	SvgArrowDownStraight,
	SvgArrowOutdent,
	SvgArrowUpStraight,
	SvgBin,
	SvgChevronDownSingle,
	SvgPlus,
	SvgReload,
	SvgUpload,
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
	publish: (data: AppsNav) => Promise<void>;
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
				publish={() => props.publish({ pillars: state.sections })}
			/>
			<InsertDialog insertingAt={state.insertingAt} />
			<Sections
				sections={state.sections}
				guardianBaseUrl={props.guardianBaseUrl}
				location={[]}
			/>
			<ErrorMessage>{state.error}</ErrorMessage>
		</DispatchContext.Provider>
	);
};

const MenuActions = (props: {
	initialSections: Section[];
	history: HistoryEvent[];
	publish: () => Promise<void>;
}) => {
	const dispatch = useDispatch();

	return (
		<menu
			css={{
				paddingTop: space[2],
				paddingBottom: space[2],
				paddingLeft: space[5],
				paddingRight: space[5],
				display: 'flex',
			}}
		>
			<li css={{ paddingRight: space[2] }}>
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
			<li css={{ paddingRight: space[2] }}>
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
			<li css={{ paddingRight: space[2] }}>
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
					style={{
						cursor: hasSubsections ? 'pointer' : undefined,
					}}
				>
					<SectionActions location={props.location} />
					<span
						css={{
							width: 20,
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
					path: new URL(path).pathname.slice(1),
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
					label="Dotcom Link"
					type="url"
					pattern="https://www.theguardian\.com/.*"
					placeholder="https://www.theguardian.com/uk/sport"
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

const ErrorMessage = (props: { children: ReactNode }) =>
	props.children !== undefined ? (
		<output
			css={{
				display: 'block',
				position: 'sticky',
				bottom: 0,
				paddingLeft: space[4],
				paddingTop: space[2],
				paddingBottom: space[1],
				borderTopColor: palette.error[400],
				borderTopWidth: 2,
				borderTopStyle: 'solid',
				backgroundColor: palette.neutral[100],
			}}
		>
			<InlineError>{props.children}</InlineError>
		</output>
	) : null;
