import { ToggleSwitch } from '@guardian/source-react-components-development-kitchen';

const handleClick = (shouldFilterByKeyEvents: boolean) => {
	const param = `?filterKeyEvents=${
		shouldFilterByKeyEvents ? 'false' : 'true'
	}#maincontent`;

	window.location.assign(`${window.location.pathname}${param}`);
};

export const FilterKeyEventsToggle = () => {
	const shouldFilterByKeyEvents =
		typeof window !== 'undefined' &&
		window.location.search.includes('filterKeyEvents=true');

	return (
		<ToggleSwitch
			label="Show key events only"
			defaultChecked={shouldFilterByKeyEvents}
			onClick={() => handleClick(shouldFilterByKeyEvents)}
		/>
	);
};
