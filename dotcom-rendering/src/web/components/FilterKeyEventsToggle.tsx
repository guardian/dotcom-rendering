import {ToggleSwitch} from "@guardian/source-react-components-development-kitchen";

const shouldFilterByKeyEvents = typeof window !== 'undefined' && window.location.search.includes('filterKeyEvents=true')

export const FilterKeyEventsToggle = () => {
	return(
		<ToggleSwitch
			label='Show key events only'
			defaultChecked={shouldFilterByKeyEvents}
			onClick={() => console.log('shouldFilterByKeyEvents >>', shouldFilterByKeyEvents)}
		/>
	)
}
