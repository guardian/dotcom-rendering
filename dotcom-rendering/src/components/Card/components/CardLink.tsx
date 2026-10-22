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

type Props = {
	linkTo: string;
	headlineText: string;
	dataLinkName?: string;
	isExternalLink: boolean;
	headlineTestUuid?: string;
};

const InternalLink = ({
	linkTo,
	headlineText,
	dataLinkName,
	headlineTestUuid,
}: {
	linkTo: string;
	headlineText: string;
	dataLinkName?: string;
	headlineTestUuid?: string;
}) => {
	return (
		<a
			href={linkTo}
			css={[fauxLinkStyles, zIndexStyles]}
			data-link-name={dataLinkName}
			data-fronts-test-uuid={headlineTestUuid}
			aria-label={headlineText}
		/>
	);
};

const ExternalLink = ({
	linkTo,
	headlineText,
	dataLinkName,
	headlineTestUuid,
}: {
	linkTo: string;
	headlineText: string;
	dataLinkName?: string;
	headlineTestUuid?: string;
}) => {
	return (
		<a
			href={linkTo}
			css={[fauxLinkStyles, zIndexStyles]}
			data-link-name={dataLinkName}
			data-fronts-test-uuid={headlineTestUuid}
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
	headlineTestUuid,
}: Props) => {
	return (
		<>
			{isExternalLink && (
				<ExternalLink
					linkTo={linkTo}
					headlineText={headlineText}
					dataLinkName={dataLinkName}
					headlineTestUuid={headlineTestUuid}
				/>
			)}
			{!isExternalLink && (
				<InternalLink
					linkTo={linkTo}
					headlineText={headlineText}
					dataLinkName={dataLinkName}
					headlineTestUuid={headlineTestUuid}
				/>
			)}
		</>
	);
};
