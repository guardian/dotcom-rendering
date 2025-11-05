import { headlineMedium34Object, space } from '@guardian/source/foundations';
import { useReducer } from 'react';
import { type AppsNav } from './appsNav';
import { DispatchContext, reducer } from './state';
import { MenuActions } from './MenuActions';
import { Sections } from './Sections';
import { getEditionFromId, type EditionId } from '../../lib/edition';
import { EditDialog } from './EditDialog';
import { InsertDialog } from './InsertDialog';
import { StatusMessage } from './StatusMessage';

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
			<StatusMessage message={state.message} />
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
