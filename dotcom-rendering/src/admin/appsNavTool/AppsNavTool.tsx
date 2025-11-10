import { headlineMedium34Object, space } from '@guardian/source/foundations';
import { useCallback, useReducer } from 'react';
import { type EditionId, getEditionFromId } from '../../lib/edition';
import type { Result } from '../../lib/result';
import { type AppsNav } from './appsNav';
import { EditDialog } from './EditDialog';
import type { PublishError } from './error';
import { InsertDialog } from './InsertDialog';
import { MenuButtons } from './MenuButtons';
import { PublishDialog } from './PublishDialog';
import { Sections } from './Sections';
import { DispatchContext, reducer } from './state';
import { StatusMessage } from './StatusMessage';

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
		prepublish: false,
	});

	const publish = async () => {
		const result = await props.publish({ pillars: state.sections });

		if (result.kind === 'ok') {
			dispatch({ kind: 'publishSuccess' });
		} else {
			dispatch({ kind: 'publishError', error: result.error });
		}
	};

	const prePublish = useCallback(() => {
		dispatch({ kind: 'prePublish' });
	}, [dispatch]);

	return (
		<DispatchContext.Provider value={dispatch}>
			<Heading editionId={props.editionId} />
			<MenuButtons
				initialSections={props.nav.pillars}
				history={state.history}
				publish={prePublish}
			/>
			<Sections
				sections={state.sections}
				guardianBaseUrl={props.guardianBaseUrl}
				location={[]}
			/>
			<StatusMessage message={state.statusMessage} />
			<InsertDialog insertingAt={state.insertingAt} />
			<EditDialog editing={state.editing} />
			<PublishDialog
				history={state.history}
				open={state.prepublish}
				publish={publish}
			/>
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
