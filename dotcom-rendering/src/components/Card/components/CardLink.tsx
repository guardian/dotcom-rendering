import { css } from '@emotion/react';
import { focusHalo } from '@guardian/source/foundations';
import { getZIndex } from '../../../lib/getZIndex';
import { trackPersonalisationClick } from '../../../lib/personalisationHistory';

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

type Props = {
	linkTo: string;
	headlineText: string;
	dataLinkName?: string;
	isExternalLink: boolean;
	isInPersonalisationVariant?: boolean;
};

const InternalLink = ({
	linkTo,
	headlineText,
	dataLinkName,
	trackPersonalisationCardClick,
}: {
	linkTo: string;
	headlineText: string;
	dataLinkName?: string;
	trackPersonalisationCardClick?: () => void;
}) => {
	return (
		// eslint-disable-next-line jsx-a11y/anchor-has-content -- we have an aria-label attribute describing the content
		<a
			href={linkTo}
			css={fauxLinkStyles}
			data-link-name={dataLinkName}
			aria-label={headlineText}
			onClick={trackPersonalisationCardClick}
		/>
	);
};

const ExternalLink = ({
	linkTo,
	headlineText,
	dataLinkName,
	trackPersonalisationCardClick,
}: {
	linkTo: string;
	headlineText: string;
	dataLinkName?: string;
	trackPersonalisationCardClick?: () => void;
}) => {
	return (
		// eslint-disable-next-line jsx-a11y/anchor-has-content -- we have an aria-label attribute describing the content
		<a
			href={linkTo}
			css={fauxLinkStyles}
			data-link-name={dataLinkName}
			aria-label={headlineText + ' (opens in new tab)'}
			target="_blank"
			rel="noreferrer"
			onClick={trackPersonalisationCardClick}
		/>
	);
};

export const CardLink = ({
	linkTo,
	headlineText,
	dataLinkName = 'article', //this makes sense if the link is to an article, but should this say something like "external" if it's an external link? are there any other uses/alternatives?
	isExternalLink,
	isInPersonalisationVariant,
}: Props) => {
	return (
		<>
			{isExternalLink && (
				<ExternalLink
					linkTo={linkTo}
					headlineText={headlineText}
					dataLinkName={dataLinkName}
					trackPersonalisationCardClick={() =>
						isInPersonalisationVariant &&
						trackPersonalisationClick(linkTo)
					}
				/>
			)}
			{!isExternalLink && (
				<InternalLink
					linkTo={linkTo}
					headlineText={headlineText}
					dataLinkName={dataLinkName}
					trackPersonalisationCardClick={() =>
						isInPersonalisationVariant &&
						trackPersonalisationClick(linkTo)
					}
				/>
			)}
		</>
	);
};
