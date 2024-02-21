import { css, keyframes } from '@emotion/react';
import { ArticleDesign } from '@guardian/libs';
import { palette, until } from '@guardian/source-foundations';
import type { Size } from '@guardian/source-react-components';
import {
	Button,
	LinkButton,
	SvgCheckmark,
	SvgEnvelope,
	SvgShare,
} from '@guardian/source-react-components';
import { useEffect, useMemo, useState } from 'react';
import { transparentColour } from '../lib/transparentColour';
import { palette as themePalette } from '../palette';
import LinkIcon from '../static/icons/link-icon.svg';

type Props = {
	size?: Size;
	pageId: string;
	blockId?: string;
	webTitle: string;
	format: ArticleFormat;
	context: Context;
};

type ButtonKind = 'native' | 'copy' | 'email';

type Context = 'ArticleMeta' | 'LiveBlock' | 'SubMeta';

const sharedButtonStyles = (sizeXSmall: boolean, isCopied: boolean) => css`
	border-color: ${themePalette('--share-button-border')};
	width: ${sizeXSmall ? '101px' : '132px'};
	height: ${sizeXSmall ? '24px' : '36px'};
	padding: ${sizeXSmall && !isCopied && '0 10px'};
`;

const copiedButtonStyles = (sizeXSmall: boolean) => css`
	color: ${themePalette('--share-button-copied')};
	padding: ${sizeXSmall ? '0 4px' : '0 10px'};

	svg {
		fill: ${palette.success[400]};
	}
`;

const buttonStyles = css`
	color: ${themePalette('--share-button')};
	svg {
		fill: ${themePalette('--share-button')};
		transition: inherit;
	}
	:hover {
		background-color: ${themePalette('--share-button')};
		border-color: ${themePalette('--share-button')};
		color: ${themePalette('--share-button-hover')};
		svg {
			fill: ${themePalette('--share-button-hover')};
		}
	}

	animation: ${keyframes`
			0% { opacity: 0; }
			100% { opacity: 1; }
		`} 240ms ease-out backwards;
	/** It is unlikely a user will want to share quicker than this… */
	animation-delay: 1.2s;
`;

const nativeShare = (sizeXSmall: boolean) => css`
	width: ${sizeXSmall ? '79px' : '105px'};
	border-color: ${themePalette('--share-button-border')};
`;

const hoverStyles = css`
	:hover {
		color: ${themePalette('--share-button-liveblog-mobile')};
		background-color: ${palette.neutral[100]};
		svg {
			fill: ${themePalette('--share-button-liveblog-mobile')};
		}
	}
`;

const liveBlogMobile = (isCopied: boolean) => css`
	${until.desktop} {
		color: ${palette.neutral[100]};
		border-color: ${transparentColour(palette.neutral[100], 0.4)};
		svg {
			fill: ${isCopied ? palette.success[500] : palette.neutral[100]};
		}
		${!isCopied && hoverStyles}
	}
`;

const getUrl = ({
	pageId,
	CMP,
	blockId,
}: {
	pageId: string;
	CMP?: string;
	blockId?: string;
}) => {
	const searchParams = new URLSearchParams({});
	if (CMP) searchParams.append('CMP', CMP); // Do we want to track this?
	if (blockId) searchParams.append('page', `with:block-${blockId}`);

	const blockHash = blockId ? `#block-${blockId}` : '';
	const paramsString = searchParams.toString();
	return new URL(
		`${pageId}${paramsString ? '?' + paramsString : ''}${blockHash}`,
		'https://www.theguardian.com/',
	).href;
};

export const NativeShareButton = ({
	onShare,
	size,
	isLiveBlogArticleMeta,
}: {
	onShare: () => void;
	size?: Size;
	isLiveBlogArticleMeta: boolean;
}) => {
	const sizeXSmall = size === 'xsmall';

	return (
		<Button
			onClick={onShare}
			size={size}
			type="button"
			priority="tertiary"
			iconSide="left"
			icon={<SvgShare />}
			css={[
				buttonStyles,
				nativeShare(sizeXSmall),
				isLiveBlogArticleMeta && liveBlogMobile(false),
			]}
		>
			Share
		</Button>
	);
};

export const CopyLinkButton = ({
	onShare,
	size,
	isLiveBlogArticleMeta,
	isCopied,
}: {
	onShare: () => void;
	size?: Size;
	isLiveBlogArticleMeta: boolean;
	isCopied: boolean;
}) => {
	const sizeXSmall = size === 'xsmall';
	return (
		<Button
			onClick={onShare}
			size={size}
			type="button"
			priority="tertiary"
			iconSide="left"
			icon={isCopied ? <SvgCheckmark /> : <LinkIcon />}
			css={[
				...(isCopied
					? [copiedButtonStyles(sizeXSmall)]
					: [buttonStyles]),
				sharedButtonStyles(sizeXSmall, isCopied),
				isLiveBlogArticleMeta && liveBlogMobile(isCopied),
			]}
		>
			{isCopied ? 'Link copied' : 'Copy link'}
		</Button>
	);
};

export const EmailLink = ({
	href,
	size,
	isLiveBlogArticleMeta,
}: {
	href: string;
	size?: Size;
	isLiveBlogArticleMeta: boolean;
}) => {
	const sizeXSmall = size === 'xsmall';
	return (
		<LinkButton
			href={href}
			size={size}
			type="button"
			priority="tertiary"
			iconSide="left"
			icon={<SvgEnvelope />}
			css={[
				buttonStyles,
				sharedButtonStyles(sizeXSmall, false),
				isLiveBlogArticleMeta && liveBlogMobile(false),
			]}
		>
			Email link
		</LinkButton>
	);
};

export const ShareButton = ({
	size = 'small',
	pageId,
	blockId,
	webTitle,
	format,
	context,
}: Props) => {
	const [isCopied, setIsCopied] = useState(false);
	const [buttonKind, setButtonKind] = useState<ButtonKind>('email');

	const isLiveBlogArticleMeta =
		format.design === ArticleDesign.LiveBlog && context === 'ArticleMeta';

	const shareData = useMemo(
		() => ({
			title: webTitle,
			text: webTitle,
			url: getUrl({
				pageId,
				blockId,
			}),
		}),
		[webTitle, pageId, blockId],
	);

	useEffect(() => {
		if ('share' in navigator && navigator.canShare(shareData)) {
			setButtonKind('native');
		} else if ('clipboard' in navigator) {
			setButtonKind('copy');
		} else {
			setButtonKind('email');
		}
	}, [shareData]);

	useEffect(() => {
		if (!isCopied) return;
		const timer = setTimeout(() => {
			setIsCopied(false);
		}, 3000);
		return () => clearTimeout(timer);
	}, [isCopied]);

	switch (buttonKind) {
		case 'native':
			return (
				<NativeShareButton
					onShare={() => {
						navigator.share(shareData).catch(console.error);
					}}
					size={size}
					isLiveBlogArticleMeta={isLiveBlogArticleMeta}
				/>
			);
		case 'copy':
			return (
				<CopyLinkButton
					onShare={() => {
						navigator.clipboard
							.writeText(
								getUrl({
									pageId,
									blockId,
								}),
							)
							.then(() => {
								setIsCopied(true);
							})
							.catch(console.error);
					}}
					size={size}
					isCopied={isCopied}
					isLiveBlogArticleMeta={isLiveBlogArticleMeta}
				/>
			);
		case 'email':
			return (
				<EmailLink
					href={`mailto:?subject=${webTitle}&body=${getUrl({
						pageId,
						blockId,
					})}`}
					size={size}
					isLiveBlogArticleMeta={isLiveBlogArticleMeta}
				/>
			);
	}
};
