import { useCallback } from 'react';
import { SectionForm } from './SectionForm';
import { type State, useDispatch } from './state';

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

	if (props.insertingAt === undefined) {
		return null;
	}

	return (
		<SectionForm
			heading="Add Section"
			open={true}
			initialTitle=""
			initialPath=""
			initialMobileOverride={undefined}
			submit={submit}
			cancel={cancel}
		/>
	);
};
