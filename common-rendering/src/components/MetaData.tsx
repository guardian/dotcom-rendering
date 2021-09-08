import { css } from "@emotion/react";
import { headline, textSans } from "@guardian/src-foundations/typography";
import { palette } from "@guardian/src-foundations";

export interface Authors {
	id: string;
	name: string;
	contributor: boolean;
}

type Props = {
	palette: typeof palette;
	byline: string;
	authors: Authors[];
	primaryDateline: string;
	secondaryDateline: string;
};

const bylineStyle = css`
	color: ${palette.news[300]};
	font-style: italic;
	${headline.xxsmall()}
	line-height: 115%;

	a {
		font-weight: 700;
		color: ${palette.news[300]};
		text-decoration: none;
		font-style: normal;
		:hover {
			text-decoration: underline;
			background: #ffe500;
			color: #121212;
		}
	}
`;

const dateStyle = css`
	color: ${palette.neutral[20]};
	${textSans.xsmall()}
	:hover {
		cursor: pointer;
	}
`;

// I would normally use the Lines component
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

	max-width: 220px;
`;

const textContainer = css`
	margin-bottom: 24px;
`;

const detailStyle = css`
	details > summary {
		list-style: none;
	}
	details > summary::-webkit-details-marker {
		display: none;
	}
`;

const AuthorLink: React.FC<{
	authorName: string;
	authorTagId: string;
}> = ({ authorName, authorTagId }) => (
	<a
		rel="author"
		data-link-name="auto tag link"
		href={`//www.theguardian.com/${authorTagId}`}
	>
		{authorName}
	</a>
);

/*
	Foreach author in authors
	if string contains name replace with authorlink then return <p> byline with links
*/


export const getContributorTags = (tags: TagType[]): TagType[] => {
	return tags.filter((t) => t.type === 'Contributor');
};

// This crazy function aims to split bylines such as
// 'Harry Potter in Hogwarts' to ['Harry Potter', 'in Hogwarts']
// Or
// 'Jane Doe and John Smith` to ['Jane Doe', ' and ', 'John Smith']
// It does this so we can have separate links to both contributors
export const bylineAsTokens = (byline: string, tags: TagType[]): string[] => {
	const titles = getContributorTags(tags).map((c) => c.title);
	// The contributor tag title should exist inside the byline for this regex to work

	const regex = new RegExp(
		`(${applyCleverOrderingForMatching(titles).join('|')})`,
	);

	return byline.split(regex);
};

const Byline: React.FC<{
	byline: string;
	authors: Authors[];
}> = ({ byline, authors }) => {
	if(byline.includes('now'))
	{
		byline.replace('now', '(now)');
	}
	if(byline.includes('earlier'))
	{
		byline.replace('earlier', '(earlier)');
	}
	return(


	)};

export const MetaData = ({
	palette,
	byline,
	authors,
	primaryDateline,
	secondaryDateline,
}: Props) => {
	return (
		<div css={lines}>
			<div css={textContainer}>
				{byline && authors.length == 1 ? ( // Single author
					<div css={bylineStyle}>
						<AuthorLink
							authorName={authors[0].name}
							authorTagId={authors[0].id}
						/>
					</div>
				) : (
					<p></p> // Multiple Authors
				)}
			</div>
			<div css={detailStyle}>
				<details>
					<summary css={dateStyle}>{primaryDateline}</summary>
					<p css={dateStyle}>{secondaryDateline}</p>
				</details>
			</div>
		</div>
	);
};
