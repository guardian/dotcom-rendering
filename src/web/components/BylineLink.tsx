import {
	getBylineComponentsFromTokens,
	getContributorTags,
} from '@root/src/lib/byline';

type Props = {
	byline: string;
	tags: TagType[];
};

const applyCleverOrderingForMatching = (titles: string[]): string[] => {
	/*
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
	*/

	return titles
		.sort((a, b) => {
			return a.length - b.length;
		})
		.reverse();
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

export const BylineLink = ({ byline, tags }: Props) => {
	const tokens = bylineAsTokens(byline, tags);

	const bylineComponents = getBylineComponentsFromTokens(tokens, tags);

	const renderedTokens = bylineComponents.map((bylineComponent) => {
		if (typeof bylineComponent === 'string') {
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
};
