import { css } from '@emotion/react';
import { from, neutral, remSpace } from '@guardian/source-foundations';
import { ToggleSwitch } from '@guardian/source-react-components-development-kitchen';
import { useEffect, useState } from 'react';

const cssOverrides = css`
	padding-bottom: ${remSpace[3]};

	// the "display: flex" and button styles can be
	// removed after this PR is merged and released:
	// https://github.com/guardian/source/pull/1255

	display: flex;

	button {
		margin-top: 0;
		margin-bottom: 0;
	}

	${from.desktop} {
		padding: ${remSpace[3]} 0;
		border-top: 1px solid ${neutral[86]};
	}
`;

export const FilterKeyEventsToggle = () => {
	const [checked, setChecked] = useState(false);

	const handleClick = () => {
		setChecked(!checked);

		const urlParams = new URLSearchParams(window.location.search);
		urlParams.set('filterKeyEvents', checked ? 'false' : 'true');

		window.location.search = urlParams.toString();
		window.location.hash = 'filter-toggle';
	};

	useEffect(() => {
		setChecked(window.location.search.includes('filterKeyEvents=true'));
	}, [setChecked]);

	return (
		<>
			<span id="filter-toggle" />
			<ToggleSwitch
				label="Show key events only"
				checked={checked}
				onClick={() => handleClick()}
				cssOverrides={cssOverrides}
			/>
		</>
	);
};
