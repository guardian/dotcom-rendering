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

	const [linkedByline] = tokens.reduce(
		([bylines, remainingTags], token) => {
			const matchedTagIndex = remainingTags.findIndex(
				(tag) => tag.title === token,
			);

			if (matchedTagIndex === -1) {
				return [bylines.concat(token), remainingTags];
			}

			const matchedTag = remainingTags[matchedTagIndex];
			const bylineElement = (
				<a
					key={matchedTag.id}
					href={`${guardianBaseURL}/${matchedTag.id}`}
				>
					{matchedTag.title}
				</a>
			);

			// We've used this tag, so remove it from the list of possible tags.
			remainingTags.splice(matchedTagIndex, 1);

			return [bylines.concat(bylineElement), remainingTags];
		},
		[[] as (JSX.Element | string)[], tags],
	);

	return <>{linkedByline}</>;
};
