import { useEffect, useState } from 'react';

export function useDocumentVisibilityState(): VisibilityState {
	const [visibilityState, setVisibilityState] = useState(
		document.visibilityState,
	);
	const onVisibilityChange = () =>
		setVisibilityState(document.visibilityState);

	useEffect(() => {
		document.addEventListener(
			'visibilitychange',
			onVisibilityChange,
			false,
		);

		return () => {
			document.removeEventListener(
				'visibilitychange',
				onVisibilityChange,
			);
		};
	}, []);

	return visibilityState;
}
