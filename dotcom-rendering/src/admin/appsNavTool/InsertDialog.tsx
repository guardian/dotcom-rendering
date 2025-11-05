import { useCallback } from 'react';
import { useDispatch, type State } from './state';
import { SectionForm } from './SectionForm';

type Props = {
	insertingAt: State['insertingAt'] | undefined;
};

export const InsertDialog = (props: Props) => {
	const dispatch = useDispatch();

	const submit = (title: string, url: URL) => {
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
	};

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
