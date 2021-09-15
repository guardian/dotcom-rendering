import { css } from "@emotion/react";
import { headline, textSans } from "@guardian/src-foundations/typography";
import { palette } from "@guardian/src-foundations";
import { from, until } from "@guardian/src-foundations/mq";
import { Pillar, Theme } from "@guardian/types";
import {
	culture,
	lifestyle,
	neutral,
	news,
	sport,
	opinion,
	text,
	brandAlt,
} from "@guardian/src-foundations/palette";
import { space } from "@guardian/src-foundations";

export interface Authors {
	id: string;
	name: string;
	contributor: boolean;
}

// type BylineComponent = { token: string; tag: TagType } | string;

type TagType = {
	id: string;
	type: string;
	title: string;
	twitterHandle?: string;
	paidContentType?: string;
	bylineImageUrl?: string;
};

type Props = {
	theme: Theme;
	palette: typeof palette;
	byline: string;
	tags: TagType[];
	authors: Authors[];
	primaryDateline: string;
	secondaryDateline: string;
};

type ContributorLinkProps = {
	contributor: string;
	contributorTagId: string;
};

/*
	These are here temporarily for now until we decide on the best approach for multiple authors or whether we use
	existing components
*/

/*

const applyCleverOrderingForMatching = (titles: string[]): string[] => {

		Q: Why does this function exist ?

		A: We had a case where the byline was "Sam Levin in Los Angeles and Sam Levine in New York",
		which would lead to the regex: Sam Levin|Sam Levine. Unfortunately the first expression would take priority and we would end up
		with a bylineAsTokens equal to [
			'',
			'Sam Levin',
			' in Los Angeles and ',
			'Sam Levin',
			'e in New York'
		]

		The solution here is simply to order the titles in decreasing length. This ensures that in a case where one name is a substring or another
		name, then the longest name is tried first, preventing the problem we had. We now have a bylineAsTokens equals to [
			'',
			'Sam Levin',
			' in Los Angeles and ',
			'Sam Levine',
			' in New York'
		]

		This function doesn't change any thing for the "standard" case, but solves the "Sam Levin|Sam Levine" case and similar cases.

		ps: If one day another problem comes up whose solution would be incompatible with this correction, then a better solution for the matching
		will have to be invented from the ground up, but for the moment, this will do :)


	return titles
		.sort((a, b) => {
			return a.length - b.length;
		})
		.reverse();
}; */

/*export const bylineAsTokens = (byline: string, tags: TagType[]): string[] => {
	const titles = getContributorTags(tags).map((c) => c.title);
	// The contributor tag title should exist inside the byline for this regex to work

	const regex = new RegExp(
		`(${applyCleverOrderingForMatching(titles).join("|")})`
	);

	return byline.split(regex);
}; */

/*export const getContributorTagsForToken = (
	tags: TagType[],
	token: string
): TagType[] => {
	return getContributorTags(tags).filter((t) => t.title === token);
};*/

/* export const getBylineComponentsFromTokens = (
	tokens: string[],
	tags: TagType[]
): BylineComponent[] => {
	const [bylineComponents] = tokens.reduce(
		([bylines, remainingTags], token) => {
			const [firstContributorTag] = getContributorTagsForToken(
				remainingTags,
				token
			);
			if (!firstContributorTag) {
				return [bylines.concat(token), remainingTags];
			}

			// We've used this tag, so remove it from the list of possible tags.
			// This ensures we don't use the same contributor tag when two identical
			// names with different contributor tags are used.
			const newRemainingTags = remainingTags.filter(
				(tag) => !(tag.id === firstContributorTag.id)
			);

			return [
				bylines.concat({ tag: firstContributorTag, token }),
				newRemainingTags,
			];
		},
		[[], tags] as [BylineComponent[], TagType[]]
	);

	return bylineComponents;
}; */

/* const BylineLink = ({ byline, tags }: Props) => {
	const tokens = bylineAsTokens(byline, tags);

	const bylineComponents = getBylineComponentsFromTokens(tokens, tags);

	const renderedTokens = bylineComponents.map((bylineComponent) => {
		if (typeof bylineComponent === "string") {
			return bylineComponent;
		}
		return (
			<ContributorLink
				contributor={bylineComponent.token}
				contributorTagId={bylineComponent.tag.id}
				key={bylineComponent.tag.id}
			/>
		);
	});

	return <>{renderedTokens}</>;
}; */

/*
	Foreach author in authors
	if string contains name replace with authorlink then return <p> byline with links
*/

/* export const getContributorTags = (tags: TagType[]): TagType[] => {
	return tags.filter((t) => t.type === "Contributor");
}; */

/* const getAuthorName = (tags: TagType[]) => {
	const contributorTag = tags.find((tag) => tag.type === "Contributor");
	return contributorTag && contributorTag.title;
}; *

type AuthorLinkDetails = {
	id: string;
	name: string;
};

const getAuthorNames = (tags: TagType[]) => {
	const names: AuthorLinkDetails[] = [];
	tags.find((tag) => {
		if (tag.type === "Contributor") {
			names.push({ name: tag.title, id: tag.id });
		}
	});
};

/*function Byline(byline: string, authors: Authors[]) {
	if (byline.includes("now")) {
		byline.replace("now", "(now)");
	}
	if (byline.includes("earlier")) {
		byline.replace("earlier", "(earlier)");
	}
}*/

const ContributorLink = ({
	contributor,
	contributorTagId,
}: ContributorLinkProps) => (
	<a
		rel="author"
		data-link-name="auto tag link"
		href={`//www.theguardian.com/${contributorTagId}`}
	>
		{contributor}
	</a>
);

// Shamelessly borrowed from Lucy! (This should be lifted out as it's very useful!)
function getThemeColours(theme: Theme) {
	switch (theme) {
		case Pillar.Sport:
			return {
				background: sport[100],
				color: sport[100],
			};
		case Pillar.Culture:
			return {
				background: culture[200],
				color: culture[200],
			};
		case Pillar.Lifestyle:
			return {
				background: lifestyle[200],
				color: lifestyle[200],
			};
		case Pillar.Opinion:
			return {
				background: opinion[200],
				color: opinion[200],
			};
		default:
			return {
				background: news[200],
				color: news[200],
			};
	}
}

const bylineStyle = (colour) => css`
	color: ${text.ctaPrimary};
	font-style: italic;
	${headline.xxsmall()}
	line-height: 115%;

	a {
		font-weight: 700;
		${from.desktop} {
			color: ${colour};
		}
		${until.desktop} {
			color: ${text.ctaPrimary};
		}
		text-decoration: none;
		font-style: normal;
		:hover {
			text-decoration: underline;
			background: ${brandAlt[400]};
			color: ${neutral[7]};
		}
	}
`;

const dateStyle = (colour) => css`
	color: ${colour};
	${textSans.xsmall()}
	:hover {
		cursor: pointer;
	}

	${from.desktop} {
		color: ${palette.neutral[20]};
	}
`;

// I would normally use the Lines component - but as we are unsure how component sharing is going to work
// going forward this version will be used instead.
const lines = css`
	background-image: repeating-linear-gradient(
		to bottom,
		#dcdcdc,
		#dcdcdc 0.0625rem,
		transparent 0.0625rem,
		transparent 0.25rem
	);
	background-repeat: repeat-x;
	background-position: top;
	background-size: 0.0625rem 0.8125rem;
	padding-top: 0.9375rem;
	margin-bottom: 0.375rem;
`;

const textContainer = css`
	margin-bottom: ${space[3]}px;
	${from.desktop} {
		margin-bottom: ${space[6]}px;
	}
`;

const detailStyle = css`
	details > summary {
		list-style: none;
	}
	details > summary::-webkit-details-marker {
		display: none;
	}
`;

const containerStyle = (background) => css`
	${background};
	width: 100%;
	padding: ${space[3]}px ${space[5]}px ${space[5]}px ${space[3]}px;
	${until.phablet} {
		padding-left: ${space[3]}px;
		padding-right: ${space[3]}px;
	}

	${from.desktop} {
		background-color: ${palette.neutral[100]};
		width: 13.75rem;
	}
`;

export const MetaData = ({
	theme,
	palette,
	byline,
	tags,
	authors,
	primaryDateline,
	secondaryDateline,
}: Props) => {
	// This is how to get the array of authors - it's not being used yet until the component issue mentioned above is sorted
	// const authorNames = getAuthorNames(tags);
	const themeColours = getThemeColours(theme);
	console.log(themeColours);
	return (
		<div css={containerStyle(themeColours)}>
			<div css={lines}>
				<div css={textContainer}>
					{byline && authors.length == 1 ? ( // Single author
						<div css={bylineStyle(themeColours)}>
							<ContributorLink
								contributor={authors[0].name}
								contributorTagId={authors[0].id}
							/>
						</div>
					) : (
						<p></p> // Multiple Authors
					)}
				</div>
				<div css={detailStyle}>
					<details>
						<summary css={dateStyle(text.ctaPrimary)}>
							{primaryDateline}
						</summary>
						<p css={dateStyle(text.ctaPrimary)}>
							{secondaryDateline}
						</p>
					</details>
				</div>
			</div>
		</div>
	);
};
