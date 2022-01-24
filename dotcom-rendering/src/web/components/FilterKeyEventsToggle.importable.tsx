import { css } from '@emotion/react';
import { from, neutral, remSpace } from '@guardian/source-foundations';
import { ToggleSwitch } from '@guardian/source-react-components-development-kitchen';
import { useEffect, useState } from 'react';

const cssOverrides = css`
	padding: ${remSpace[2]};

	${from.phablet} {
		padding-left: ${remSpace[5]};
	}

	${from.desktop} {
		border-top: 1px solid ${neutral[86]};
		padding-left: 0;
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
