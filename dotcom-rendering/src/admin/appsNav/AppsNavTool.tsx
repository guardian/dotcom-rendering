import {
	headlineMedium34Object,
	palette,
	space,
} from '@guardian/source/foundations';
import { useReducer } from 'react';
import { type AppsNav } from './appsNav';
import { InlineError, InlineSuccess } from '@guardian/source/react-components';
import { DispatchContext, reducer } from './state';
import type { Result } from '../../lib/result';
import { MenuActions } from './MenuActions';
import { Sections } from './Sections';
import { getEditionFromId, type EditionId } from '../../lib/edition';
import { EditDialog } from './EditDialog';
import { InsertDialog } from './InsertDialog';

type Props = {
	nav: AppsNav;
	editionId: EditionId;
	guardianBaseUrl: string;
	publish: (data: AppsNav) => Promise<boolean>;
};

export const AppsNavTool = (props: Props) => {
	const [state, dispatch] = useReducer(reducer, {
		sections: props.nav.pillars,
		history: [],
	});

	return (
		<DispatchContext.Provider value={dispatch}>
			<Heading editionId={props.editionId} />
			<MenuActions
				initialSections={props.nav.pillars}
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

const Heading = (props: { editionId: EditionId }) => (
	<h1
		css={{
			...headlineMedium34Object,
			paddingLeft: space[5],
			paddingTop: space[1],
			paddingBottom: space[5],
		}}
	>
		{`${getEditionFromId(props.editionId).title} apps nav`}
	</h1>
);

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
