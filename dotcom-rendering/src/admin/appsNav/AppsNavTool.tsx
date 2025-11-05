import {
	headlineBold17Object,
	palette,
	space,
} from '@guardian/source/foundations';
import { useCallback, useReducer, type ReactNode } from 'react';
import { type AppsNav, type MobileOverride, type Section } from './appsNav';
import {
	Button,
	InlineError,
	InlineSuccess,
	SvgArrowDownStraight,
	SvgArrowUpStraight,
	SvgBin,
	SvgChevronDownSingle,
	SvgEdit,
	SvgPlus,
} from '@guardian/source/react-components';
import { css } from '@emotion/react';
import { DispatchContext, reducer, useDispatch } from './appsNavContext';
import type { Result } from '../../lib/result';
import { SectionForm } from './SectionForm';
import { MenuActions } from './MenuActions';

type Props = {
	ukNav: AppsNav;
	guardianBaseUrl: string;
	publish: (data: AppsNav) => Promise<boolean>;
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
				publish={async () =>
					(await props.publish({ pillars: state.sections }))
						? dispatch({ kind: 'publishSuccess' })
						: dispatch({ kind: 'publishError' })
				}
			/>
			<InsertDialog insertingAt={state.insertingAt} />
			<EditDialog editing={state.editing} />
			<Sections
				sections={state.sections}
				guardianBaseUrl={props.guardianBaseUrl}
				location={[]}
			/>
			<Message message={state.message} />
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
					<SectionActions
						location={props.location}
						title={props.section.title}
						path={props.section.path}
						mobileOverride={props.section.mobileOverride}
					/>
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

const SectionActions = (props: {
	location: number[];
	title: string;
	path: string;
	mobileOverride: MobileOverride | undefined;
}) => {
	const dispatch = useDispatch();

	return (
		<>
			<Button
				size="xsmall"
				priority="primary"
				icon={<SvgEdit />}
				hideLabel
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
			<Button
				size="xsmall"
				priority="primary"
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
				priority="secondary"
				icon={<SvgArrowUpStraight />}
				hideLabel
				onClick={() =>
					dispatch({ kind: 'moveUp', location: props.location })
				}
				cssOverrides={css({
					marginLeft: space[1],
				})}
			>
				Move Up
			</Button>
			<Button
				size="xsmall"
				priority="secondary"
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
	const dispatch = useDispatch();

	const submit = useCallback(
		(title: string, url: URL) => {
			if (props.insertingAt !== undefined) {
				dispatch({
					kind: 'insert',
					section: {
						title,
						path: url.pathname.slice(1),
					},
					location: props.insertingAt,
				});
			}
		},
		[props.insertingAt, dispatch],
	);

	const cancel = useCallback(() => {
		dispatch({ kind: 'cancelInsert' });
	}, [dispatch]);

	return (
		<SectionForm
			heading="Add Section"
			open={props.insertingAt !== undefined}
			initialTitle=""
			initialPath=""
			initialMobileOverride={undefined}
			submit={submit}
			cancel={cancel}
		/>
	);
};

const EditDialog = (props: {
	editing:
		| {
				title: string;
				path: string;
				mobileOverride: MobileOverride | undefined;
				location: number[];
		  }
		| undefined;
}) => {
	const dispatch = useDispatch();

	const submit = useCallback(
		(title: string, url: URL) => {
			if (props.editing !== undefined) {
				dispatch({
					kind: 'update',
					title,
					path: url.pathname.slice(1),
					location: props.editing.location,
				});
			}
		},
		[props.editing, dispatch],
	);

	const cancel = useCallback(() => {
		dispatch({ kind: 'cancelEdit' });
	}, [dispatch]);

	return (
		<SectionForm
			heading="Edit Section"
			open={props.editing !== undefined}
			initialTitle={props.editing?.title ?? ''}
			initialPath={new URL(
				props.editing?.path ?? '',
				'https://www.theguardian.com',
			).toString()}
			initialMobileOverride={props.editing?.mobileOverride}
			submit={submit}
			cancel={cancel}
		/>
	);
};

const Message = (props: { message: Result<string, string> | undefined }) => {
	if (props.message === undefined) {
		return null;
	}

	return (
		<output
			css={{
				display: 'block',
				position: 'sticky',
				bottom: 0,
				paddingLeft: space[4],
				paddingTop: space[2],
				paddingBottom: space[1],
				borderTopWidth: 2,
				borderTopStyle: 'solid',
				backgroundColor: palette.neutral[100],
			}}
			style={{
				borderTopColor:
					props.message.kind === 'ok'
						? palette.success[400]
						: palette.error[400],
			}}
		>
			<MessageOutput message={props.message} />
		</output>
	);
};

const MessageOutput = (props: { message: Result<string, string> }) => {
	switch (props.message.kind) {
		case 'ok':
			return <InlineSuccess>{props.message.value}</InlineSuccess>;
		case 'error':
			return <InlineError>{props.message.error}</InlineError>;
	}
};
