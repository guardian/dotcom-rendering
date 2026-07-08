import { css } from '@emotion/react';
import { focusHalo } from '@guardian/source/foundations';
import { getZIndex } from '../../../lib/getZIndex';

const fauxLinkStyles = css`
	position: absolute;
	top: 0;
	right: 0;
	bottom: 0;
	left: 0;
	background-color: transparent;

	:focus {
		${focusHalo};
	}
`;

const zIndexStyles = css`
	z-index: ${getZIndex('card-link')};
`;

const abTestZIndexStyles = css`
	z-index: ${getZIndex('video-card-link')};
`;

type Props = {
	linkTo: string;
	headlineText: string;
	dataLinkName?: string;
	isExternalLink: boolean;
	isLoopAndInLoopClickTest: boolean;
	/**
	 * Refers to the AB test with name: fronts-and-curation-loop-click-through
	 */
	shouldRaiseZIndexForAbTest: boolean;
};

const InternalLink = ({
	linkTo,
	headlineText,
	dataLinkName,
	shouldRaiseZIndexForAbTest,
}: {
	linkTo: string;
	headlineText: string;
	dataLinkName?: string;
	shouldRaiseZIndexForAbTest: boolean;
}) => {
	return (
		<a
			href={linkTo}
			css={[
				fauxLinkStyles,
				shouldRaiseZIndexForAbTest ? abTestZIndexStyles : zIndexStyles,
			]}
			data-link-name={dataLinkName}
			aria-label={headlineText}
		/>
	);
};

const ExternalLink = ({
	linkTo,
	headlineText,
	dataLinkName,
	shouldRaiseZIndexForAbTest,
}: {
	linkTo: string;
	headlineText: string;
	dataLinkName?: string;
	shouldRaiseZIndexForAbTest: boolean;
}) => {
	return (
		<a
			href={linkTo}
			css={[
				fauxLinkStyles,
				shouldRaiseZIndexForAbTest ? abTestZIndexStyles : zIndexStyles,
			]}
			data-link-name={dataLinkName}
			aria-label={headlineText + ' (opens in new tab)'}
			target="_blank"
			rel="noreferrer"
		/>
	);
};

export const CardLink = ({
	linkTo,
	headlineText,
	dataLinkName = 'article', //this makes sense if the link is to an article, but should this say something like "external" if it's an external link? are there any other uses/alternatives?
	isExternalLink,
	isLoopAndInLoopClickTest,
	shouldRaiseZIndexForAbTest,
}: Props) => {
	/**
	 * If we are in the loop click through test, we add a unique string to the data link name
	 * tracking so clicks to article can be diffrentiated from other clicks on the card
	 */
	const clickThroughLinkName = isLoopAndInLoopClickTest
		? `${dataLinkName} | card-link-clickthrough`
		: dataLinkName;

	return (
		<>
			{isExternalLink && (
				<ExternalLink
					linkTo={linkTo}
					headlineText={headlineText}
					dataLinkName={clickThroughLinkName}
					shouldRaiseZIndexForAbTest={shouldRaiseZIndexForAbTest}
				/>
			)}
			{!isExternalLink && (
				<InternalLink
					linkTo={linkTo}
					headlineText={headlineText}
					dataLinkName={clickThroughLinkName}
					shouldRaiseZIndexForAbTest={shouldRaiseZIndexForAbTest}
				/>
			)}
		</>
	);
};
