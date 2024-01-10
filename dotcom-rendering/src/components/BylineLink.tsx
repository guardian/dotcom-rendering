import { ArticleDesign, isString } from '@guardian/libs';
import { Hide } from '@guardian/source-react-components';
import { DottedLines } from '@guardian/source-react-components-development-kitchen';
import {
	getBylineComponentsFromTokens,
	getSoleContributor,
	isContributor,
} from '../lib/byline';
import { palette as themePalette } from '../palette';
import type { TagType } from '../types/tag';
import { useConfig } from './ConfigContext';
import { FollowWrapper } from './FollowWrapper.importable';
import { Island } from './Island';

type Props = {
	byline: string;
	tags: TagType[];
	format: ArticleFormat;
	isHeadline: boolean;
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

/**
 * Bylines can contain special characters reserved by RegEx.
 * Since we're concatenating titles together to form a RegEx
 * its important to escape any characters that RegEx might consider
 * special.
 */
export const SPECIAL_REGEX_CHARACTERS = new RegExp(/[.+*?^$(){}|[\]]/g);

/**
 * This crazy function aims to split bylines such as
 * 'Harry Potter in Hogwarts' to ['Harry Potter', 'in Hogwarts']
 * Or
 * 'Jane Doe and John Smith` to ['Jane Doe', ' and ', 'John Smith']
 * It does this so we can have separate links to both contributors
 */
export const bylineAsTokens = (byline: string, tags: TagType[]): string[] => {
	// Replace special regex characters with their escaped version.
	// https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String/replace#specifying_a_string_as_the_replacement
	const titles = tags
		.filter(isContributor)
		.map((c) => c.title.replaceAll(SPECIAL_REGEX_CHARACTERS, `\\$&`));
	// The contributor tag title should exist inside the byline for the regex
	// below to work. If it doesn't, we return the whole byline to prevent the
	// regex splitting the string into an array of single charaters
	if (titles.length === 0) return [byline];

	const regex = new RegExp(
		`(${applyCleverOrderingForMatching(titles).join('|')})`,
	);

	return byline.split(regex);
};

const ContributorLink = ({
	contributor,
	contributorTagId,
}: {
	contributor: string;
	contributorTagId: string;
}) => (
	<a
		rel="author"
		data-link-name="auto tag link"
		href={`https://www.theguardian.com/${contributorTagId}`}
	>
		{contributor}
	</a>
);

function removeComma(bylinePart: string) {
	return bylinePart.startsWith(',')
		? bylinePart.slice(1).trimStart()
		: bylinePart;
}

export const BylineLink = ({
	byline,
	tags,
	format,
	isHeadline = false,
}: Props) => {
	const tokens = bylineAsTokens(byline, tags);
	const soleContributor = getSoleContributor(tags, byline);
	const hasSoleContributor = !!soleContributor;
	const bylineComponents = getBylineComponentsFromTokens(tokens, tags);
	const isLiveBlog = format.design === ArticleDesign.LiveBlog;

	const renderedTokens = bylineComponents.map((bylineComponent) => {
		if (isString(bylineComponent)) {
			const displayString =
				format.design === ArticleDesign.Analysis && hasSoleContributor
					? removeComma(bylineComponent)
					: bylineComponent;
			return displayString ? (
				<span key={bylineComponent}>{displayString}</span>
			) : null;
		}
		return (
			<ContributorLink
				contributor={bylineComponent.token}
				contributorTagId={bylineComponent.tag.id}
				key={bylineComponent.tag.id}
			/>
		);
	});

	/**
	 * Where is this coming from?
	 * Config value is set at high in the component tree within a React context in a `<ConfigProvider />`
	 */
	const { renderingTarget } = useConfig();

	return (
		<>
			{renderedTokens}
			{renderingTarget === 'Apps' && !isHeadline && hasSoleContributor ? (
				<Hide from="desktop">
					<DottedLines
						count={1}
						color={
							isLiveBlog
								? 'rgba(255, 255, 255, 0.4)'
								: themePalette('--article-meta-lines')
						}
					/>
					<Island priority="critical">
						<FollowWrapper
							displayName={soleContributor.title}
							id={soleContributor.id}
						/>
					</Island>
				</Hide>
			) : null}
		</>
	);
};
