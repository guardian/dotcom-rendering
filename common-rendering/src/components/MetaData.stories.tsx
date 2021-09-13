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

const author = [
	{
		id: "/profile/andrewsparrow",
		name: "Natalie Grover",
		contributor: true,
	},
	{
		id: "/profile/andrewsparrow",
		name: "Tom McCarthy",
		contributor: true,
	},
];
const tags = [
	{
		id: "science/mars",
		type: "Keyword",
		title: "Mars",
	},
	{
		id: "science/nasa",
		type: "Keyword",
		title: "Nasa",
	},
	{
		id: "us-news/us-news",
		type: "Keyword",
		title: "US news",
	},
	{
		id: "science/space",
		type: "Keyword",
		title: "Space",
	},
	{
		id: "science/astronomy",
		type: "Keyword",
		title: "Astronomy",
	},
	{
		id: "world/world",
		type: "Keyword",
		title: "World news",
	},
	{
		id: "science/science",
		type: "Keyword",
		title: "Science",
	},
	{
		id: "type/article",
		type: "Type",
		title: "Article",
	},
	{
		id: "tone/minutebyminute",
		type: "Tone",
		title: "Minute by minute",
	},
	{
		id: "tone/news",
		type: "Tone",
		title: "News",
	},
	{
		id: "profile/tommccarthy",
		type: "Contributor",
		title: "Tom McCarthy",
		twitterHandle: "TeeMcSee",
		bylineImageUrl:
			"https://i.guim.co.uk/img/uploads/2017/10/09/Tom-McCarthy,-R.png?width=300&quality=85&auto=format&fit=max&s=daaffddc5c54f2f0f4d50ff4e26f1d34",
	},
	{
		id: "profile/natalie-grover",
		type: "Contributor",
		title: "Natalie Grover",
		twitterHandle: "NatalieGrover",
	},
	{
		id: "tracking/commissioningdesk/us-news",
		type: "Tracking",
		title: "US News",
	},
];

const Default: FC = () => (
	<Container>
		<MetaData
			palette={palette}
			byline="Natalie Grover and Tom McCarthy"
			authors={author}
			tags={tags}
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
