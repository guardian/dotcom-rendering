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
import { Button, TextInput } from '@guardian/source/react-components';
import { css } from '@emotion/react';
import { DispatchContext, reducer, useDispatch } from './appsNavContext';

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
			<Button
				onClick={() => dispatch({ kind: 'undo' })}
				disabled={state.history.length === 0}
			>
				Undo
			</Button>
			<Button
				onClick={() =>
					dispatch({ kind: 'reset', initial: props.ukNav.pillars })
				}
				disabled={state.history.length === 0}
				type="reset"
			>
				Reset
			</Button>
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
}) => (
	<li css={{ borderTop: '1px solid lightgrey' }}>
		<div
			css={{
				display: 'flex',
				paddingTop: space[1],
				paddingBottom: space[1],
				alignItems: 'center',
			}}
		>
			<Title location={props.location}>{props.section.title}</Title>{' '}
			<Path
				path={props.section.path}
				guardianBaseUrl={props.guardianBaseUrl}
			/>
			<SectionActions location={props.location} />
		</div>
		{props.section.sections !== undefined ? (
			<Sections
				sections={props.section.sections}
				guardianBaseUrl={props.guardianBaseUrl}
				location={props.location}
			/>
		) : null}
	</li>
);

const Title = (props: { children: ReactNode; location: number[] }) => (
	<span css={headlineBold17Object}>{props.children}</span>
);

const Path = (props: { path: string; guardianBaseUrl: string }) => (
	<span
		css={{
			fontSize: 17,
			fontFamily: 'monospace',
		}}
	>
		(
		<a
			href={new URL(props.path, props.guardianBaseUrl).href}
			css={{ color: palette.brand[500] }}
		>
			{props.path}
		</a>
		)
	</span>
);

const SectionActions = (props: { location: number[] }) => {
	const dispatch = useDispatch();

	return (
		<>
			<Button
				size="xsmall"
				priority="secondary"
				onClick={() =>
					dispatch({ kind: 'delete', location: props.location })
				}
				cssOverrides={css({
					marginLeft: space[4],
				})}
			>
				Delete
			</Button>
			<Button
				size="xsmall"
				priority="secondary"
				onClick={() =>
					dispatch({ kind: 'insertInto', location: props.location })
				}
				cssOverrides={css({
					marginLeft: space[1],
				})}
			>
				Insert Into
			</Button>
			<Button
				size="xsmall"
				priority="secondary"
				onClick={() =>
					dispatch({ kind: 'insertAfter', location: props.location })
				}
				cssOverrides={css({
					marginLeft: space[1],
				})}
			>
				Insert After
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
