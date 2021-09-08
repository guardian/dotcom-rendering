// ----- Imports ----- //

import { palette } from "@guardian/src-foundations";
import { css } from "@emotion/react";
import type { FC } from "react";
import { MetaData } from "./MetaData";

// ----- Stories ----- //

const Container = ({ children }: { children: React.ReactNode }) => (
	<div
		css={css`
			width: 240px;
			padding-top: 20px;
			padding-left: 20px;
		`}
	>
		{children}
	</div>
);

const author = {
	id: "/profile/andrewsparrow",
	name: "Andrew Sparrow",
	contributor: true,
};
const Default: FC = () => (
	<Container>
		<MetaData
			palette={palette}
			byline="Andrew Sparrow"
			authors={[author]}
			primaryDateline="Tue 7 Sep 2021 14.32 BST"
			secondaryDateline="First published on Tue 7 Sep 2021 09.48 BST"
		/>
	</Container>
);

// ----- Exports ----- //

export default {
	title: "Liveblogs/MetaData",
	component: MetaData,
};

export { Default };
