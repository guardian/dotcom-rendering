// ----- Imports ----- //

import type { FC } from "react";

import { FirstPublished } from "./FirstPublished";

// ----- Stories ----- //

const Default: FC = () => (
	<FirstPublished
		firstPublished={1613763003000}
		blockLink={"#block-60300f5f8f08ad21ea60071e"}
	/>
);

// ----- Exports ----- //

export default {
	component: FirstPublished,
	title: "Common/Components/FirstPublished",
};

export { Default };
