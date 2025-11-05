import { useCallback } from 'react';
import { useDispatch, type State } from './appsNavContext';
import { SectionForm } from './SectionForm';

type Props = {
	editing: State['editing'] | undefined;
};

export const EditDialog = (props: Props) => {
	const dispatch = useDispatch();

	const submit = (title: string, url: URL) => {
		if (props.editing !== undefined) {
			dispatch({
				kind: 'update',
				title,
				path: url.pathname.slice(1),
				location: props.editing.location,
			});
		}
	};

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
