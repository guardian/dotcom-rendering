import { css } from '@emotion/react';
import { storage } from '@guardian/libs';
import { Button } from '@guardian/source/react-components';
import { useEffect, useState } from 'react';

export const CrosswordComponent = () => {
	const [storedValue, setStoredValue] = useState(() => {
		return Number(storage.local.get('storedValue')) || 0;
	});

	// Update localStorage whenever storedValue changes
	useEffect(() => {
		storage.local.set('storedValue', String(storedValue));
	}, [storedValue]);

	return (
		<>
			<Button onClick={() => setStoredValue((prev) => prev + 1)}>
				Toggle Stored Value
			</Button>
			<div
				css={css`
					${storedValue > 0 ? 'color: hotpink' : 'color: blue'}
				`}
			>
				{storedValue}
				{storedValue > 0 ? 'color: hotpink' : 'color: blue'}
			</div>
		</>
	);
};
