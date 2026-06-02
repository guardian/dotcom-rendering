import { css } from '@emotion/react';
import { focusHalo } from '@guardian/source/foundations';
import { getZIndex } from '../../../lib/getZIndex';

const fauxLinkStyles = css`
	position: absolute;
	z-index: ${getZIndex('card-link')};
	top: 0;
	right: 0;
	bottom: 0;
	left: 0;
	background-color: transparent;

	:focus {
		${focusHalo};
	}
`;

const videoCardLinkStyles = css`
	z-index: ${getZIndex('video-card-link')};
`;

type Props = {
	linkTo: string;
	headlineText: string;
	dataLinkName?: string;
	isExternalLink: boolean;
	isLoopClickThroughTest: boolean;
};

const InternalLink = ({
	linkTo,
	headlineText,
	dataLinkName,
	isLoopClickThroughTest,
}: {
	linkTo: string;
	headlineText: string;
	dataLinkName?: string;
	isLoopClickThroughTest?: boolean;
}) => {
	return (
		<a
			href={linkTo}
			css={[
				fauxLinkStyles,
				isLoopClickThroughTest && videoCardLinkStyles,
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
	isLoopClickThroughTest,
}: {
	linkTo: string;
	headlineText: string;
	dataLinkName?: string;
	isLoopClickThroughTest: boolean;
}) => {
	return (
		<a
			href={linkTo}
			css={[
				fauxLinkStyles,
				isLoopClickThroughTest && videoCardLinkStyles,
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
	isLoopClickThroughTest,
}: Props) => {
	/* if we are in the loop click through test, we add a unique string to the data link name tracking so clicks to article can be diffrentiated from other clicks on the card */
	const clickThroughLinkName = isLoopClickThroughTest
		? `${dataLinkName} | card-link-clickthrough`
		: dataLinkName;

	return (
		<>
			{isExternalLink && (
				<ExternalLink
					linkTo={linkTo}
					headlineText={headlineText}
					dataLinkName={clickThroughLinkName}
					isLoopClickThroughTest={isLoopClickThroughTest}
				/>
			)}
			{!isExternalLink && (
				<InternalLink
					linkTo={linkTo}
					headlineText={headlineText}
					dataLinkName={clickThroughLinkName}
					isLoopClickThroughTest={isLoopClickThroughTest}
				/>
			)}
		</>
	);
};
