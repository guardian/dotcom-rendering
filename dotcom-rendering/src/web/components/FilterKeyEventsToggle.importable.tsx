import { css } from '@emotion/react';
import { from, neutral, remSpace } from '@guardian/source-foundations';
import { ToggleSwitch } from '@guardian/source-react-components-development-kitchen';
import { useEffect, useState } from 'react';

const cssOverrides = css`
	width: 100%;
	padding-bottom: ${remSpace[1]};

	${from.phablet} {
		padding-bottom: ${remSpace[1]};
	}

	${from.desktop} {
		padding: ${remSpace[1]} 0;
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
		window.location.hash = 'maincontent';
	};

	useEffect(() => {
		setChecked(window.location.search.includes('filterKeyEvents=true'));
	}, [setChecked]);

	return (
		<ToggleSwitch
			label="Show key events only"
			checked={checked}
			onClick={() => handleClick()}
			cssOverrides={cssOverrides}
		/>
	);
};
