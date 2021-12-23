import { ToggleSwitch } from '@guardian/source-react-components-development-kitchen';

const handleClick = (shouldFilterByKeyEvents: boolean) => {
	const urlParams = new URLSearchParams(window.location.search);

	urlParams.set(
		'filterKeyEvents',
		shouldFilterByKeyEvents ? 'false' : 'true',
	);

	window.location.search = urlParams.toString();
	window.location.hash = 'maincontent';
};

export const FilterKeyEventsToggle = () => {
	const shouldFilterByKeyEvents =
		typeof window !== 'undefined' &&
		window.location.search.includes('filterKeyEvents=true');

	return (
		<ToggleSwitch
			label="Show key events only"
			checked={shouldFilterByKeyEvents}
			onClick={() => handleClick(shouldFilterByKeyEvents)}
		/>
	);
};
