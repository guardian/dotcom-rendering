// ----- Imports ----- //

import type { FC } from "react";

import { LastUpdated } from "./LastUpdated";

// ----- Stories ----- //

const Default: FC = () => (
	<LastUpdated lastUpdated={1613763519000} lastUpdatedDisplay={"19.38 GMT"} />
);

// ----- Exports ----- //

export default {
	component: LastUpdated,
	title: "Common/Components/LastUpdated",
};

export { Default };
