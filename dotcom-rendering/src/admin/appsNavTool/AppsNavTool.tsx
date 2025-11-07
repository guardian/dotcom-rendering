import { headlineMedium34Object, space } from '@guardian/source/foundations';
import { useReducer } from 'react';
import { type AppsNav } from './appsNav';
import { DispatchContext, reducer } from './state';
import { MenuButtons } from './MenuButtons';
import { Sections } from './Sections';
import { getEditionFromId, type EditionId } from '../../lib/edition';
import { EditDialog } from './EditDialog';
import { InsertDialog } from './InsertDialog';
import { StatusMessage } from './StatusMessage';
import type { Result } from '../../lib/result';
import type { PublishError } from './error';

type Props = {
	nav: AppsNav;
	editionId: EditionId;
	guardianBaseUrl: string;
	publish: (data: AppsNav) => Promise<PublishResult>;
};

export type PublishResult = Result<PublishError, true>;

export const AppsNavTool = (props: Props) => {
	const [state, dispatch] = useReducer(reducer, {
		sections: props.nav.pillars,
		history: [],
	});

	const publish = async () => {
		const result = await props.publish({ pillars: state.sections });

		if (result.kind === 'ok') {
			dispatch({ kind: 'publishSuccess' });
		} else {
			dispatch({ kind: 'publishError', error: result.error });
		}
	};

	return (
		<DispatchContext.Provider value={dispatch}>
			<Heading editionId={props.editionId} />
			<MenuButtons
				initialSections={props.nav.pillars}
				history={state.history}
				publish={publish}
			/>
			<Sections
				sections={state.sections}
				guardianBaseUrl={props.guardianBaseUrl}
				location={[]}
			/>
			<StatusMessage message={state.statusMessage} />
			<InsertDialog insertingAt={state.insertingAt} />
			<EditDialog editing={state.editing} />
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
