import { bylineTokens } from '@root/src/amp/lib/byline-tokens';

type Props = {
	byline?: string;
	tags: TagType[];
	guardianBaseURL: string;
};

export const Byline = ({ byline, tags, guardianBaseURL }: Props) => {
	if (!byline) {
		return null;
	}

	const contributorTags = tags.filter((tag) => tag.type === 'Contributor');
	const tokens = bylineTokens(byline, contributorTags);

	const linkedByline = tokens.map((token) => {
		const matchedTag = contributorTags.find((tag) => tag.title === token);

		if (matchedTag) {
			return (
				<a
					key={matchedTag.id}
					href={`${guardianBaseURL}/${matchedTag.id}`}
				>
					{matchedTag.title}
				</a>
			);
		}

		return token;
	});

	return <>{linkedByline}</>;
};
