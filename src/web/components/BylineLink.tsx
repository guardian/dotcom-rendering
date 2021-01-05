import React from 'react';

type Props = {
	byline: string;
	tags: TagType[];
};

// This crazy function aims to split bylines such as
// 'Harry Potter in Hogwarts' to ['Harry Potter', 'in Hogwarts']
// Or
// 'Jane Doe and John Smith` to ['Jane Doe', ' and ', 'John Smith']
// It does this so we can have separate links to both contributors
const bylineAsTokens = (byline: string, tags: TagType[]): string[] => {
	const contributorTags = tags
		.filter((t) => t.type === 'Contributor')
		.map((c) => c.title);
	// The contributor tag title should exist inside the byline for this regex to work
	const regex = new RegExp(`(${contributorTags.join('|')})`);

	return byline.split(regex);
};

export const BylineLink = ({ byline, tags }: Props) => {
	const renderedTokens = bylineAsTokens(byline, tags).map((token, i) => {
		const associatedTags = tags.filter((t) => t.title === token);
		if (associatedTags.length > 0) {
			return (
				<ContributorLink
					contributor={token}
					contributorTagId={associatedTags[0].id}
					key={i}
				/>
			);
		}
		return token;
	});

	return <>{renderedTokens}</>;
};

const ContributorLink: React.FC<{
	contributor: string;
	contributorTagId: string;
}> = ({ contributor, contributorTagId }) => (
	<a
		rel="author"
		data-link-name="auto tag link"
		href={`//www.theguardian.com/${contributorTagId}`}
	>
		{contributor}
	</a>
);
