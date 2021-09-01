// ----- Imports ----- //

import type { FC } from "react";
import type { Event } from "./keyEvent";
import KeyEvent from "./keyEvent";

// ----- Stories ----- //

const events: Event[] = [
	{
		time: "2021/09/01",
		text: "Gold for Uganda",
		url:
			"https://www.theguardian.com/environment/2021/sep/01/opec-member-urges-oil-producers-to-focus-more-on-renewable-energy",
	},
	{
		time: "2021/09/01",
		text: "Gold for Uganda",
		url:
			"https://www.theguardian.com/environment/2021/sep/01/opec-member-urges-oil-producers-to-focus-more-on-renewable-energy",
	},
	{
		time: "2021/09/01",
		text: "Gold for Uganda",
		url:
			"https://www.theguardian.com/environment/2021/sep/01/opec-member-urges-oil-producers-to-focus-more-on-renewable-energy",
	},
	{
		time: "2021/09/01",
		text: "Gold for Uganda",
		url:
			"https://www.theguardian.com/environment/2021/sep/01/opec-member-urges-oil-producers-to-focus-more-on-renewable-energy",
	},
	{
		time: "2021/09/01",
		text: "Gold for Uganda",
		url:
			"https://www.theguardian.com/environment/2021/sep/01/opec-member-urges-oil-producers-to-focus-more-on-renewable-energy",
	},
	{
		time: "2021/09/01",
		text: "Gold for Uganda",
		url:
			"https://www.theguardian.com/environment/2021/sep/01/opec-member-urges-oil-producers-to-focus-more-on-renewable-energy",
	},
	{
		time: "2021/09/01",
		text: "Gold for Uganda",
		url:
			"https://www.theguardian.com/environment/2021/sep/01/opec-member-urges-oil-producers-to-focus-more-on-renewable-energy",
	},
	{
		time: "2021/09/01",
		text: "Gold for Uganda",
		url:
			"https://www.theguardian.com/environment/2021/sep/01/opec-member-urges-oil-producers-to-focus-more-on-renewable-energy",
	},
];

const Default: FC = () => <KeyEvent events={events} />;

// ----- Exports ----- //

export default {
	component: KeyEvent,
	title: "Common/Components/KeyEvent",
};

export { Default };
