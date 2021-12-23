import { ToggleSwitch } from '@guardian/source-react-components-development-kitchen';
import { useEffect, useState } from 'react';

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
		/>
	);
};
